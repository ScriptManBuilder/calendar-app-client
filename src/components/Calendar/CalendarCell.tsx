import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { CalendarDay, Task, Holiday } from '../../types';
import { isToday, parseDate } from '../../utils/calendar';
import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';
import { HolidayLabel } from './HolidayLabel';
import {
  CellWrapper,
  CellHeader,
  DayNumber,
  TaskCount,
  TaskList,
  AddTaskButton,
  DropIndicator,
} from '../../assets/styles/cell.styles';

interface CalendarCellProps {
  day: CalendarDay;
  tasks: Task[];
  holidays: Holiday[];
  onAddTask: (title: string, date: string, labels: string[]) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
  draggedTask: Task | null;
  onDragStart: (task: Task) => void;
  onDragEnd: () => void;
  onDrop: (targetDate: string, targetIndex: number) => void;
}

export const CalendarCell = ({
  day,
  tasks,
  holidays,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  draggedTask,
  onDragStart,
  onDragEnd,
  onDrop,
}: CalendarCellProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [dropIndex, setDropIndex] = useState<number | null>(null);

  const today = isToday(day.date);
  const date = parseDate(day.date);
  const dayNum = date.getDate();

  // Show "Mar 1" style for first day of a month
  const displayDay =
    dayNum === 1
      ? `${date.toLocaleString('en-US', { month: 'short' })} ${dayNum}`
      : String(dayNum);

  const dateLabel = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  /* ── Drag-and-drop handlers ───────────────────────────── */

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setIsDragOver(true);
      setDropIndex(tasks.length);
    },
    [tasks.length],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const { clientX, clientY } = e;
    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      setIsDragOver(false);
      setDropIndex(null);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const index = dropIndex ?? tasks.length;
      setDropIndex(null);
      onDrop(day.date, index);
    },
    [dropIndex, tasks.length, day.date, onDrop],
  );

  const handleDragOverItem = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      e.stopPropagation();
      const rect = e.currentTarget.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      setDropIndex(e.clientY < midY ? index : index + 1);
      setIsDragOver(true);
    },
    [],
  );

  /* ── Task form handlers ───────────────────────────────── */

  const handleAddSubmit = (title: string, labels: string[]) => {
    onAddTask(title, day.date, labels);
    setIsAdding(false);
  };

  const handleEditSubmit = (title: string, labels: string[]) => {
    if (editingTask) {
      onUpdateTask(editingTask._id, { title, labels });
      setEditingTask(null);
    }
  };

  return (
    <CellWrapper
      $isCurrentMonth={day.isCurrentMonth}
      $isToday={today}
      $isDragOver={isDragOver}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CellHeader>
        <DayNumber $isToday={today}>{displayDay}</DayNumber>
        {tasks.length > 0 && (
          <TaskCount>
            {tasks.length}<span className="count-label"> card{tasks.length !== 1 ? 's' : ''}</span>
          </TaskCount>
        )}
      </CellHeader>

      {/* Holidays are fixed – not part of the reorderable list */}
      {holidays.map((holiday, i) => (
        <HolidayLabel key={i} holiday={holiday} />
      ))}

      <TaskList>
        {tasks.map((task, index) => (
          <React.Fragment key={task._id}>
            {isDragOver && dropIndex === index && <DropIndicator />}
            {editingTask?._id === task._id ? (
              createPortal(
                <TaskForm
                  task={task}
                  onSubmit={handleEditSubmit}
                  onCancel={() => setEditingTask(null)}
                  dateLabel={dateLabel}
                />,
                document.body,
              )
            ) : (
              <TaskItem
                task={task}
                index={index}
                isDragging={draggedTask?._id === task._id}
                onDelete={onDeleteTask}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOverItem={handleDragOverItem}
                onEdit={setEditingTask}
              />
            )}
          </React.Fragment>
        ))}
        {isDragOver && dropIndex === tasks.length && <DropIndicator />}
      </TaskList>

      {isAdding &&
        createPortal(
          <TaskForm
            onSubmit={handleAddSubmit}
            onCancel={() => setIsAdding(false)}
            dateLabel={dateLabel}
          />,
          document.body,
        )}

      {!isAdding && !editingTask && (
        <AddTaskButton onClick={() => setIsAdding(true)}>
          <span className="full">+ Add card</span>
          <span className="short">+</span>
        </AddTaskButton>
      )}
    </CellWrapper>
  );
};
