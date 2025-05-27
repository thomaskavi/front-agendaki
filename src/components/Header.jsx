import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.js'; // Importa a função de logout

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Chama a função de logout do serviço
    navigate('/'); // Redireciona para a tela de login
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <Link to="/home" style={linkStyle}>AgendaKi</Link>
      </div>
      <nav style={navStyle}>
        <ul style={ulStyle}>
          <li>
            <Link to="/home" style={navLinkStyle}>Início</Link>
          </li>
          <li>
            <Link to="/professionals" style={navLinkStyle}>Ver Profissionais</Link>
          </li>
          <li style={dropdownContainerStyle}>
            <button onClick={toggleDropdown} style={dropdownButtonStyle}>
              Minha Conta ▼
            </button>
            {isDropdownOpen && (
              <div style={dropdownContentStyle}>
                <Link to="/users/me" style={dropdownItemStyle} onClick={() => setIsDropdownOpen(false)}>Meu Perfil</Link>
              </div>
            )}
          </li>
          <li>
            <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

// Estilos básicos para o Header (você pode transferir para um CSS file)
const headerStyle = {
  backgroundColor: '#282c34',
  padding: '15px 20px',
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
};

const logoStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
};

const navStyle = {
  display: 'flex',
};

const ulStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  alignItems: 'center',
};

const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  padding: '10px 15px',
  display: 'block',
  transition: 'background-color 0.3s ease',
};

const dropdownContainerStyle = {
  position: 'relative',
};

const dropdownButtonStyle = {
  backgroundColor: 'transparent',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s ease',
};

const dropdownContentStyle = {
  position: 'absolute',
  backgroundColor: '#333',
  minWidth: '160px',
  boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
  zIndex: 1,
  right: 0, // Alinha o dropdown à direita do botão
  borderRadius: '5px',
  overflow: 'hidden',
};

const dropdownItemStyle = {
  color: 'white',
  padding: '12px 16px',
  textDecoration: 'none',
  display: 'block',
  textAlign: 'left',
  transition: 'background-color 0.3s ease',
};

const logoutButtonStyle = {
  backgroundColor: '#e74c3c', // Cor vermelha para logout
  color: 'white',
  border: 'none',
  padding: '8px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '15px',
  marginLeft: '15px',
  transition: 'background-color 0.3s ease',
};

export default Header;