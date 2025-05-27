// src/pages/Login.jsx

import React, { useState } from 'react';
import { login } from '../services/auth.js';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; // <--- IMPORTANTE: Importa o CSS Module

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      console.log('Login bem-sucedido! Redirecionando...');
      navigate('/home');
    } catch (err) {
      const errorMessage = err.error_description || err.error || 'Erro no login';
      setError(errorMessage);
      console.error("Erro no login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Usuário:</label>
            <input
              type="text"
              id="username" // Comentário movido ou removido da mesma linha do atributo
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password" // Comentário movido ou removido da mesma linha do atributo
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={!username || !password || loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;