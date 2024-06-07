import React, { useState } from 'react';

const Menu = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  return (
    <div style={styles.menu}>
      <div style={styles.menuItem} onClick={() => handleMenuClick('cliente')}>
        Cliente
        {openSubMenu === 'cliente' && (
          <div style={styles.subMenu}>
            <div style={styles.subMenuItem}>Cadastro</div>
            <div style={styles.subMenuItem}>Pesquisa</div>
          </div>
        )}
      </div>
      <div style={styles.menuItem} onClick={() => handleMenuClick('servico')}>
        Serviço
      </div>
      <div style={styles.menuItem} onClick={() => handleMenuClick('acesso')}>
        Acesso
      </div>
    </div>
  );
};

const styles = {
  menu: {
    width: '200px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    height: '100%',
  },
  menuItem: {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #ddd',
  },
  subMenu: {
    paddingLeft: '20px',
  },
  subMenuItem: {
    padding: '5px 0',
  },
};

export default Menu;
