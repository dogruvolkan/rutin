import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList/TaskList';
import TaskDetail from './components/TaskDetail/TaskDetail';
import Modal from 'react-modal';


Modal.setAppElement('#root');

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/task/:id" element={<TaskDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
