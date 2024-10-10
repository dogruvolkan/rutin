import { Task } from '../types/Task';

const STORAGE_KEY = 'tasks';

export const getTasks = (): Task[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};
