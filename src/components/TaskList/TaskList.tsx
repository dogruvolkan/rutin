import React, { useState, useEffect } from 'react';
import { Task } from '../../types/Task';
import { Rule } from '../../types/Rule';
import { getTasks, saveTasks, getRules, addRule, deleteRule } from '../../utils/localStorage';
import AddTaskModal from '../AddTaskModal/AddTaskModal';
import AddRuleModal from '../AddRuleModal/AddRuleModal';
import { Link } from 'react-router-dom';
import styles from './TaskList.module.css';
import { FaTrash } from 'react-icons/fa';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [rules, setRules] = useState<Rule[]>([]);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isAddRuleModalOpen, setIsAddRuleModalOpen] = useState(false);

  useEffect(() => {
    setTasks(getTasks());
    setRules(getRules());
  }, []);

  const handleAddTask = (task: Task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleAddRule = (rule: Rule) => {
    const updatedRules = [...rules, rule];
    setRules(updatedRules);
    addRule(rule);
  };

  const handleDeleteRule = (id: string) => {
    if (window.confirm('Kuralları silmek istediğinizden emin misiniz?')) {
      const updatedRules = rules.filter(rule => rule.id !== id);
      setRules(updatedRules);
      deleteRule(id);
    }
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Görevi silmek istediğinizden emin misiniz?')) {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Görev Listesi</h1>
      <div className={styles.buttonGroup}>
        <button className={styles.addButton} onClick={() => setIsAddTaskModalOpen(true)}>Görev Ekle</button>
        <button className={styles.addRuleButton} onClick={() => setIsAddRuleModalOpen(true)}>Kural Ekle</button>
      </div>
      <ul className={styles.taskList}>
        {tasks.map(task => (
          <li key={task.id} className={styles.taskItem}>
            <Link to={`/task/${task.id}`} className={styles.taskLink}>{task.title}</Link>
            <button className={styles.deleteButton} onClick={() => handleDeleteTask(task.id)}>Sil</button>
          </li>
        ))}
      </ul>

      {/* Kurallar Bölümü */}
      <div className={styles.rulesSection}>
        <h2 className={styles.rulesTitle}>Kurallar</h2>
        <ul className={styles.rulesList}>
          {rules.map((rule, index) => (
            <li key={rule.id} className={styles.ruleItem}>
              <span className={styles.ruleText}>{index + 1}. {rule.text}</span>
              <button className={styles.deleteRuleButton} onClick={() => handleDeleteRule(rule.id)}>
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modallar */}
      <AddTaskModal 
        isOpen={isAddTaskModalOpen} 
        onRequestClose={() => setIsAddTaskModalOpen(false)} 
        onAddTask={handleAddTask} 
      />
      <AddRuleModal
        isOpen={isAddRuleModalOpen}
        onRequestClose={() => setIsAddRuleModalOpen(false)}
        onAddRule={handleAddRule}
      />
    </div>
  );
};

export default TaskList;
