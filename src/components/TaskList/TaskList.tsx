import React, { useState, useEffect } from 'react';
import { Task } from '../../types/Task';
import { getTasks, saveTasks } from '../../utils/localStorage';
import AddTaskModal from '../AddTaskModal/AddTaskModal';
import { Link } from 'react-router-dom';
import styles from './TaskList.module.css';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const addTask = (task: Task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    if (window.confirm('Görevi silmek istediğinizden emin misiniz?')) {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Görev Listesi</h1>
      <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>Görev Ekle</button>
      <ul className={styles.taskList}>
        {tasks.map(task => (
          <li key={task.id} className={styles.taskItem}>
            <Link to={`/task/${task.id}`} className={styles.taskLink}>{task.title}</Link>
            <button className={styles.deleteButton} onClick={() => deleteTask(task.id)}>Sil</button>
          </li>
        ))}
      </ul>
      <AddTaskModal 
        isOpen={isModalOpen} 
        onRequestClose={() => setIsModalOpen(false)} 
        onAddTask={addTask} 
      />
    </div>
  );
};

export default TaskList;
