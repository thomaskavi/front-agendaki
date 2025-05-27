import api from './api.js';

/**
 * Função para realizar o login do usuário.
 * @param {string} username - O nome de usuário para o login.
 * @param {string} password - A senha do usuário para o login.
 * @returns {Promise<Object>} - Uma promessa que resolve com os dados da resposta da API (incluindo access_token).
 * @throws {Object} - Lança um objeto de erro em caso de falha no login.
 */
export const login = async (username, password) => {
  const payload = { username, password };

  try {
    const response = await api.post('/public/login', payload);
    const token = response.data.access_token;
    localStorage.setItem('access_token', token);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data || { error: 'Erro desconhecido na resposta da API' };
    } else if (error.request) {
      throw { error: 'Nenhuma resposta recebida do servidor. Verifique a conexão ou a URL da API.' };
    } else {
      throw { error: error.message || 'Erro inesperado na requisição de login.' };
    }
  }
};

/**
 * Verifica se o usuário está logado verificando a presença do token no localStorage.
 * @returns {boolean} - True se o token estiver presente, false caso contrário.
 */
export const isAuthenticated = () => {
  return localStorage.getItem('access_token') !== null;
};

/**
 * Realiza o logout do usuário, removendo o token do localStorage.
 */
export const logout = () => {
  localStorage.removeItem('access_token');
};