import React, { useState } from 'react';
import Modal from 'react-modal';
import { Rule } from '../../types/Rule';
import { v4 as uuidv4 } from 'uuid';
import styles from './AddRuleModal.module.css';

interface AddRuleModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onAddRule: (rule: Rule) => void;
}

const AddRuleModal: React.FC<AddRuleModalProps> = ({ isOpen, onRequestClose, onAddRule }) => {
  const [ruleText, setRuleText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ruleText.trim() === '') return;
    const newRule: Rule = {
      id: uuidv4(),
      text: ruleText.trim(),
    };
    onAddRule(newRule);
    setRuleText('');
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Kural Ekle"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
     <button type="button" onClick={onRequestClose} className={styles.cancelButton}>x</button>
      <h2 className={styles.modalTitle}>Kural Ekle</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="text"
            value={ruleText}
            onChange={e => setRuleText(e.target.value)}
            placeholder="Yeni kuralınızı yazın..."
            required
            className={styles.input}
          />
          <button type="submit" className={styles.addButton}>Ekle</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddRuleModal;
