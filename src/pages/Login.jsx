import React, { useState } from 'react';
import { login } from '../services/auth.js';
import { useNavigate } from 'react-router-dom';

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
    <div className="flex justify-center items-center min-h-[calc(100vh-140px)] bg-gray-100 p-5">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-5 text-left">
            <label htmlFor="username" className="block mb-2 text-gray-700 font-medium text-sm">
              Usuário:
            </label>
            <input
              type="text"
              id="username"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div className="mb-5 text-left">
            <label htmlFor="password" className="block mb-2 text-gray-700 font-medium text-sm">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <button
            type="submit"
            disabled={!username || !password || loading}
            className={`w-full py-3 rounded-md font-semibold text-white transition ${
              loading || !username || !password
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 transform'
            }`}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-5 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
