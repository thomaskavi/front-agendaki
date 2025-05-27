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
        // Ajuste a rota para o endpoint que retorna o perfil do usuário logado
        const response = await api.get('/users/me');
        setUser(response.data);
      } catch (err) {
        console.error('Erro ao buscar perfil do usuário:', err);
        setError('Falha ao carregar perfil. Tente novamente mais tarde.');

        // Se o erro for de autenticação, redireciona para o login
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
    return <div style={{ textAlign: 'center', padding: '20px' }}>Carregando perfil...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Erro: {error}</div>;
  }

  if (!user) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Nenhum dado de perfil encontrado.</div>;
  }

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h2>Meu Perfil</h2>
      <div style={profileCardStyle}>
        {user.profileImageUrl && (
          <img src={user.profileImageUrl} alt={user.name} style={profileImageStyle} />
        )}
        <p><strong>Nome:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Telefone:</strong> {user.phone}</p>
        {user.profession && <p><strong>Profissão:</strong> {user.profession}</p>}
        {user.slug && <p><strong>Slug:</strong> {user.slug}</p>}
        {/* Adicione outras informações do perfil aqui */}
      </div>
    </div>
  );
};

// Estilos para a página de Perfil (você pode transferir para um CSS file)
const profileCardStyle = {
  backgroundColor: '#f9f9f9',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  maxWidth: '500px',
  margin: '20px auto',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
};

const profileImageStyle = {
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: '15px',
  border: '3px solid #3498db',
};

export default UserProfile;