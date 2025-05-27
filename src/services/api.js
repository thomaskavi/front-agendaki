import axios from 'axios';

const api = axios.create({
  baseURL: 'http://agendaki-backend-env.eba-ypgwrpyr.sa-east-1.elasticbeanstalk.com',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;