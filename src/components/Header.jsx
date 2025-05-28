// src/components/Header.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.js';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-gray-900 p-4 text-white flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">
        <Link to="/home" className="text-white no-underline hover:text-gray-300">AgendaKi</Link>
      </div>
      <nav className="flex items-center">
        {/* Usando 'space-x-6' para espaçamento padrão entre os itens de navegação */}
        <ul className="flex items-center space-x-6 list-none m-0 p-0">
          <li>
            <Link to="/home" className="text-white no-underline px-4 py-2 hover:bg-gray-700 rounded-md transition-colors duration-300">Início</Link>
          </li>
          <li>
            <Link to="/professionals" className="text-white no-underline px-4 py-2 hover:bg-gray-700 rounded-md transition-colors duration-300">Ver Profissionais</Link>
          </li>
          <li className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-transparent text-white border border-transparent px-4 py-2 rounded-md cursor-pointer text-base transition-colors duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Minha Conta <span className="ml-1 text-sm">▼</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-gray-700 min-w-[160px] shadow-lg z-10 right-0 rounded-md overflow-hidden top-full mt-2">
                <Link to="/profile" className="text-white px-4 py-3 no-underline block text-left hover:bg-gray-600 transition-colors duration-300" onClick={() => setIsDropdownOpen(false)}>Meu Perfil</Link>
              </div>
            )}
          </li>
          <li>
            {/* Usando 'ml-6' para separar o botão de Logout */}
            <button onClick={handleLogout} className="bg-red-600 text-white border-none px-5 py-2 rounded-md cursor-pointer text-base ml-6 hover:bg-red-700 transition-colors duration-300 font-semibold shadow-sm">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
