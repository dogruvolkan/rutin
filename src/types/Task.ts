export interface Task {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO format date string
  progress: {
    [date: string]: 'yapıldı' | 'yapılmadı';
  };
}