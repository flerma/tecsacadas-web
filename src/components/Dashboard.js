import React from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from './Menu';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Tec Sacadas</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>Sair</button>
      </header>
      <Menu />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#fff',
    color: '#007bff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default Dashboard;