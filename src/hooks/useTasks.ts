import { useState, useEffect, useCallback } from 'react';
import type { Task } from '../types';
import { taskApi } from '../services/taskApi';

export function useTasks(year: number, month: number) {
  const [tasks, setTasks] = useState<Task[]>([]);

  /* Fetch from backend when month changes (best-effort) */
  useEffect(() => {
    taskApi
      .getTasks(year, month + 1)
      .then(setTasks)
      .catch(() => {
        /* backend not available – keep local state */
      });
  }, [year, month]);

  /* ── Create ───────────────────────────────────────────── */
  const addTask = useCallback(
    async (title: string, date: string, labels: string[] = []) => {
      const tempId = crypto.randomUUID();
      let order = 0;

      setTasks((prev) => {
        order = prev.filter((t) => t.date === date).length;
        return [...prev, { _id: tempId, title, date, order, labels }];
      });

      try {
        const saved = await taskApi.createTask({ title, date, order, labels });
        setTasks((prev) => prev.map((t) => (t._id === tempId ? saved : t)));
      } catch {
        /* keep optimistic local task */
      }
    },
    [],
  );

  /* ── Update ───────────────────────────────────────────── */
  const updateTask = useCallback(
    async (taskId: string, updates: Partial<Task>) => {
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, ...updates } : t)),
      );
      try {
        await taskApi.updateTask(taskId, updates);
      } catch {
        /* keep optimistic update */
      }
    },
    [],
  );

  /* ── Delete ───────────────────────────────────────────── */
  const deleteTask = useCallback(async (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
    try {
      await taskApi.deleteTask(taskId);
    } catch {
      /* keep optimistic delete */
    }
  }, []);

  /* ── Move between cells ───────────────────────────────── */
  const moveTask = useCallback(
    (taskId: string, targetDate: string, targetIndex: number) => {
      setTasks((prev) => {
        const task = prev.find((t) => t._id === taskId);
        if (!task) return prev;

        const withoutTask = prev.filter((t) => t._id !== taskId);

        // Build new order in target date
        const targetTasks = withoutTask
          .filter((t) => t.date === targetDate)
          .sort((a, b) => a.order - b.order);

        targetTasks.splice(targetIndex, 0, { ...task, date: targetDate });
        const updatedTarget = targetTasks.map((t, i) => ({ ...t, order: i }));

        // Reindex source date (if different)
        let updatedSource: Task[] = [];
        if (task.date !== targetDate) {
          updatedSource = withoutTask
            .filter((t) => t.date === task.date)
            .sort((a, b) => a.order - b.order)
            .map((t, i) => ({ ...t, order: i }));
        }

        const affectedDates = new Set([targetDate, task.date]);
        const otherTasks = withoutTask.filter(
          (t) => !affectedDates.has(t.date),
        );

        return [...otherTasks, ...updatedTarget, ...updatedSource];
      });

      taskApi
        .updateTask(taskId, { date: targetDate, order: targetIndex })
        .catch(() => {});
    },
    [],
  );

  /* ── Reorder within same cell ─────────────────────────── */
  const reorderTask = useCallback(
    (taskId: string, date: string, newIndex: number) => {
      setTasks((prev) => {
        const dateTasks = prev
          .filter((t) => t.date === date)
          .sort((a, b) => a.order - b.order);

        const oldIndex = dateTasks.findIndex((t) => t._id === taskId);
        if (oldIndex === -1 || oldIndex === newIndex) return prev;

        const adjustedIndex = newIndex > oldIndex ? newIndex - 1 : newIndex;
        const [task] = dateTasks.splice(oldIndex, 1);
        dateTasks.splice(adjustedIndex, 0, task);

        const updatedDateTasks = dateTasks.map((t, i) => ({
          ...t,
          order: i,
        }));
        const otherTasks = prev.filter((t) => t.date !== date);

        return [...otherTasks, ...updatedDateTasks];
      });

      taskApi.updateTask(taskId, { order: newIndex }).catch(() => {});
    },
    [],
  );

  return { tasks, addTask, updateTask, deleteTask, moveTask, reorderTask };
}
