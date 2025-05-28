// src/App.jsx

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import { isAuthenticated } from './services/auth.js';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header visível apenas se não for a página de login e estiver autenticado */}
      {!isLoginPage && isAuthenticated() && <Header />}

      <main className="flex-grow p-5 flex justify-center items-start">
        <Outlet />
      </main>

      {/* Rodapé opcional, não exibido na página de login */}
      {!isLoginPage && (
        <footer className="bg-gray-800 text-white text-center py-3">
          <p>&copy; {new Date().getFullYear()} AgendaKi</p>
        </footer>
      )}
    </div>
  );
}

export default App;
