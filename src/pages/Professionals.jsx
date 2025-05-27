// src/pages/Professionals.jsx

import React, { useState, useEffect } from 'react';
import api from '../services/api.js';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.js';

const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        setLoading(true);
        setError(null);
        // Ajuste a rota para a correta da sua API de profissionais
        const response = await api.get('/professionals');
        setProfessionals(response.data);
      } catch (err) {
        console.error('Erro ao buscar profissionais:', err);
        setError('Falha ao carregar profissionais. Tente novamente mais tarde.');

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

    fetchProfessionals();
  }, [navigate]); // Adiciona navigate como dependência do useEffect

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Carregando profissionais...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Erro: {error}</div>;
  }

  if (professionals.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Nenhum profissional encontrado.</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Nossos Profissionais</h2>
      <div style={professionalsGridStyle}>
        {professionals.map((professional) => (
          <div key={professional.id} style={professionalCardStyle}>
            <img src={professional.profileImageUrl || 'https://via.placeholder.com/100'} alt={professional.name} style={professionalImageStyle} />
            <h3 style={{ margin: '10px 0' }}>{professional.name}</h3>
            <p><strong>Profissão:</strong> {professional.profession}</p>
            <p><strong>Email:</strong> {professional.email}</p>
            <p><strong>Contato:</strong> {professional.phone}</p>
            {professional.slug && <p><strong>Slug:</strong> {professional.slug}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

// Estilos para a página de Profissionais (você pode transferir para um CSS file)
const professionalsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '20px',
  maxWidth: '1200px',
  margin: '0 auto',
};

const professionalCardStyle = {
  backgroundColor: '#f9f9f9',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s ease-in-out',
};

const professionalImageStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: '10px',
  border: '2px solid #3498db',
};

export default Professionals;