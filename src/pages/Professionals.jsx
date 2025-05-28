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
        const response = await api.get('/professionals');
        setProfessionals(response.data);
      } catch (err) {
        console.error('Erro ao buscar profissionais:', err);
        setError('Falha ao carregar profissionais. Tente novamente mais tarde.');
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
  }, [navigate]);

  if (loading) {
    return <div className="text-center p-5">Carregando profissionais...</div>;
  }

  if (error) {
    return <div className="text-center p-5 text-red-500">Erro: {error}</div>;
  }

  if (professionals.length === 0) {
    return <div className="text-center p-5">Nenhum profissional encontrado.</div>;
  }

  return (
    <div className="p-5">
      <h2 className="text-center text-2xl font-semibold mb-6">Nossos Profissionais</h2>
      <div className="grid gap-6 grid-cols- sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 max-w-screen-x1 mx-auto">
        {professionals.map((professional) => (
          <div key={professional.id} className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center shadow-md hover:shadow-lg transition">
            <img
              src={professional.profileImageUrl || 'https://via.placeholder.com/100'}
              alt={professional.name}
              className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-blue-500 mb-3"
            />
            <h3 className="font-semibold text-lg mb-1">{professional.name}</h3>
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

export default Professionals;
