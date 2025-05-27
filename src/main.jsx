// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  redirect, // Importe o redirect
} from 'react-router-dom';
import App from './App.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx'; // Importe a nova página Home
import Professionals from './pages/Professionals.jsx'; // Importe a nova página Professionals
import UserProfile from './pages/UserProfile.jsx'; // Importe a nova página UserProfile
import { isAuthenticated, logout } from './services/auth.js'; // Importe as funções de auth


// Loader para rotas privadas (que exigem autenticação)
const privateLoader = () => {
  if (!isAuthenticated()) {
    return redirect("/"); // Redireciona para a página de login se não estiver autenticado
  }
  return null; // Permite a navegação se estiver autenticado
};

// Loader para a rota de login (impede acesso se já estiver logado)
const loginLoader = () => {
  if (isAuthenticated()) {
    return redirect("/home"); // Redireciona para a home se já estiver autenticado
  }
  return null; // Permite a navegação se não estiver autenticado
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // Rota padrão para "/"
        element: <Login />,
        loader: loginLoader, // Usa o loader para impedir acesso se já logado
      },
      {
        path: "home", // Nova rota para a Home
        element: <Home />,
        loader: privateLoader, // Protege esta rota
      },
      {
        path: "professionals", // Nova rota para Ver Profissionais
        element: <Professionals />,
        loader: privateLoader, // Protege esta rota
      },
      {
        path: "users/me", // Nova rota para o perfil do usuário
        element: <UserProfile />,
        loader: privateLoader, // Protege esta rota
      },
      // Opcional: Rota para tratar caminhos não encontrados (404)
      {
        path: "*",
        element: <div style={{ textAlign: 'center', padding: '50px' }}>
                   <h2>404 - Página Não Encontrada</h2>
                   <p>A rota que você tentou acessar não existe.</p>
                   <button onClick={() => window.location.href = isAuthenticated() ? '/home' : '/'}>
                     {isAuthenticated() ? 'Ir para Home' : 'Ir para Login'}
                   </button>
                 </div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);