import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Menu from './Menu';
import './Layout.css';

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="layout-container">
      <header className="layout-header">
        <h1>Tec Sacadas</h1>
        <button onClick={handleLogout} className="layout-logoutButton">Sair</button>
      </header>
      <div className="layout-content">
        <Menu />
        <main className="layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
