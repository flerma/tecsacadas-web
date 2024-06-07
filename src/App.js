import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      navigate('/dashboard');
    } else {
      return false;
    }
    return true;
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
