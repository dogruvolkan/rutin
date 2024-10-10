import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Task } from '../../types/Task';
import { getTasks, saveTasks } from '../../utils/localStorage';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './TaskDetail.module.css';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface RouteParams extends Record<string, string | undefined> {
  id: string;
}

const TaskDetail: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [task, setTask] = useState<Task | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [stats, setStats] = useState<{ done: number; notDone: number }>({ done: 0, notDone: 0 });

  useEffect(() => {
    if (id) {
      const tasks = getTasks();
      const foundTask = tasks.find(t => t.id === id) || null;
      setTask(foundTask);
      calculateStats(foundTask);
    }
  }, [id]);

  const calculateStats = (task: Task | null) => {
    if (!task) {
      setStats({ done: 0, notDone: 0 });
      return;
    }
    const done = Object.values(task.progress).filter(status => status === 'yapıldı').length;
    const notDone = Object.values(task.progress).filter(status => status === 'yapılmadı').length;
    setStats({ done, notDone });
  };

  if (!id) {
    return <div className={styles.notFound}>Geçersiz görev ID'si.</div>;
  }

  if (!task) {
    return <div className={styles.notFound}>Görev bulunamadı.</div>;
  }

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setShowOptions(true);
  };

  const handleStatus = (status: 'yapıldı' | 'yapılmadı') => {
    if (selectedDate && task) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const updatedTask: Task = {
        ...task,
        progress: {
          ...task.progress,
          [dateStr]: status,
        },
      };
      // Güncellenmiş görevleri kaydet
      const tasks = getTasks().map(t => t.id === task.id ? updatedTask : t);
      saveTasks(tasks);
      setTask(updatedTask);
      calculateStats(updatedTask);
      setShowOptions(false);
      setSelectedDate(null);
    }
  };

  // İkonları günlere eklemek için tileContent kullanıyoruz
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      const status = task.progress[dateStr];
      if (status === 'yapıldı') {
        return <FaCheck className={styles.iconDone} />;
      } else if (status === 'yapılmadı') {
        return <FaTimes className={styles.iconNotDone} />;
      }
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>← Geri</Link>
      <h2 className={styles.title}>{task.title}</h2>
      <p className={styles.description}>{task.description}</p>
      <p className={styles.startDate}>Başlangıç Tarihi: {task.startDate}</p>

      {/* İstatistikler */}
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <FaCheck className={styles.iconDone} /> Yapıldı: {stats.done} gün
        </div>
        <div className={styles.statItem}>
          <FaTimes className={styles.iconNotDone} /> Yapılmadı: {stats.notDone} gün
        </div>
      </div>

      <Calendar
        onClickDay={handleDayClick}
        tileContent={tileContent}
        // Başlangıç tarihinden itibaren göster
        minDate={new Date(task.startDate)}
        className={styles.calendar}
      />
      {showOptions && selectedDate && (
        <div className={styles.overlay}>
          <div className={styles.options}>
            <p>{selectedDate.toDateString()}</p>
            <div className={styles.optionButtons}>
              <button 
                onClick={() => handleStatus('yapıldı')} 
                className={`${styles.optionButton} ${styles.doneButton}`}
              >
                Yapıldı
              </button>
              <button 
                onClick={() => handleStatus('yapılmadı')} 
                className={`${styles.optionButton} ${styles.notDoneButton}`}
              >
                Yapılmadı
              </button>
              <button onClick={() => setShowOptions(false)} className={styles.cancelButton}>İptal</button>
            </div>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
