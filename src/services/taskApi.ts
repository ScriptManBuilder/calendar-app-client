import type { Task } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const taskApi = {
  getTasks: async (year: number, month: number): Promise<Task[]> => {
    const res = await fetch(
      `${API_URL}/tasks?year=${encodeURIComponent(year)}&month=${encodeURIComponent(month)}`,
    );
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return res.json();
  },

  createTask: async (task: Omit<Task, '_id'>): Promise<Task> => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error('Failed to create task');
    return res.json();
  },

  updateTask: async (id: string, data: Partial<Task>): Promise<Task> => {
    const res = await fetch(`${API_URL}/tasks/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update task');
    return res.json();
  },

  deleteTask: async (id: string): Promise<void> => {
    const res = await fetch(`${API_URL}/tasks/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete task');
  },

  reorderTasks: async (
    tasks: { _id: string; date: string; order: number }[],
  ): Promise<void> => {
    const res = await fetch(`${API_URL}/tasks/reorder`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tasks }),
    });
    if (!res.ok) throw new Error('Failed to reorder tasks');
  },
};
