import { Task } from '../types/Task';
import { Rule } from '../types/Rule';

const TASKS_STORAGE_KEY = 'tasks';
const RULES_STORAGE_KEY = 'rules';

export const getTasks = (): Task[] => {
  const data = localStorage.getItem(TASKS_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};

// Yeni Eklenen Fonksiyonlar: Kurallar için
export const getRules = (): Rule[] => {
  const data = localStorage.getItem(RULES_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const addRule = (rule: Rule) => {
  const rules = getRules();
  rules.push(rule);
  localStorage.setItem(RULES_STORAGE_KEY, JSON.stringify(rules));
};

export const deleteRule = (id: string) => {
  const rules = getRules();
  const updatedRules = rules.filter(rule => rule.id !== id);
  localStorage.setItem(RULES_STORAGE_KEY, JSON.stringify(updatedRules));
};
