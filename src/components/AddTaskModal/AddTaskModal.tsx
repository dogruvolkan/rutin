import React, { useState } from 'react';
import Modal from 'react-modal';
import { Task } from '../../types/Task';
import { v4 as uuidv4 } from 'uuid';
import styles from './AddTaskModal.module.css';

interface AddTaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onAddTask: (task: Task) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onRequestClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      startDate,
      progress: {},
    };
    onAddTask(newTask);
    setTitle('');
    setDescription('');
    setStartDate('');
    onRequestClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      contentLabel="Görev Ekle" 
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2 className={styles.modalTitle}>Görev Ekle</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Başlık:</label>
          <input 
            type="text" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required 
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Açıklama:</label>
          <textarea 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            required 
            className={styles.textarea}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Başlangıç Tarihi:</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={e => setStartDate(e.target.value)} 
            required 
            className={styles.input}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>Ekle</button>
          <button type="button" onClick={onRequestClose} className={styles.cancelButton}>İptal</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
