import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="menu">
      <div className="menuItem" onClick={() => handleMenuClick('customer')}>
        Cliente
        {openSubMenu === 'customer' && (
          <div className="subMenu">
            <div className="subMenuItem" onClick={() => handleNavigation('/main/customer-register')}>Cadastro</div>
            <div className="subMenuItem" onClick={() => handleNavigation('/main/customer-search')}>Pesquisa</div>
          </div>
        )}
      </div>
      <div className="menuItem" onClick={() => handleMenuClick('service')}>
        Serviço
      </div>
      <div className="menuItem" onClick={() => handleMenuClick('access')}>
        Acesso
      </div>
    </div>
  );
};

export default Menu;
