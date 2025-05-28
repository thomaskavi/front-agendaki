// src/pages/UserProfile.jsx

import React, { useState, useEffect } from 'react';
import api from '../services/api.js';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.js';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/users/me');
        setUser(response.data);
      } catch (err) {
        console.error('Erro ao buscar perfil do usuário:', err);
        setError('Falha ao carregar perfil. Tente novamente mais tarde.');

        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          alert('Sessão expirada ou não autorizado. Por favor, faça login novamente.');
          logout();
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="text-center py-5">
        Carregando perfil...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-red-600">
        Erro: {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-5">
        Nenhum dado de perfil encontrado.
      </div>
    );
  }

  return (
    <div className="p-5 text-center">
      <h2 className="text-2xl font-bold mb-5">Meu Perfil</h2>
      <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-lg mx-auto shadow-md">
        {user.profileImageUrl && (
          <img
            src={user.profileImageUrl}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-500 mx-auto"
          />
        )}
        <p><strong>Nome:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Telefone:</strong> {user.phone}</p>
        {user.profession && <p><strong>Profissão:</strong> {user.profession}</p>}
        {user.slug && <p><strong>Slug:</strong> {user.slug}</p>}
      </div>
    </div>
  );
};

export default UserProfile;
