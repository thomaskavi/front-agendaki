// src/App.jsx

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Importe useLocation
import Header from './components/Header.jsx'; // Importa o novo Header
import { isAuthenticated } from './services/auth.js'; // Importa a função de autenticação

function App() {
  const location = useLocation();
  // Verifica se a rota atual é a de login para não mostrar o Header nela
  const isLoginPage = location.pathname === '/';

  return (
    <div className="App">
      {/* Renderiza o Header apenas se não estiver na página de login E se estiver autenticado */}
      {!isLoginPage && isAuthenticated() && <Header />}

      <main style={mainStyle}>
        {/* O Outlet renderizará o componente da rota aninhada (Login, Home, Dashboard, etc.) */}
        <Outlet />
      </main>

      {!isLoginPage && ( // Opcional: Adicionar rodapé apenas se não for a página de login
        <footer style={footerStyle}>
          <p>&copy; {new Date().getFullYear()} AgendaKi</p>
        </footer>
      )}
    </div>
  );
}

// Estilos básicos para o main e footer
const mainStyle = {
  padding: '20px',
  minHeight: 'calc(100vh - 120px)', // Ajuste para altura do header e footer
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start', // Começa o conteúdo do topo
};

const footerStyle = {
  backgroundColor: '#282c34',
  padding: '10px',
  color: 'white',
  textAlign: 'center',
  position: 'relative', // Pode ser 'fixed' se quiser fixo no bottom
  bottom: '0',
  width: '100%',
};

export default App;