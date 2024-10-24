import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const login = async (username: string, password: string) => {
  const response = await api.post('/login/', { username, password });
  return response.data;
};

export const register = async (email: string, username: string, password: string) => {
  const response = await api.post('/register/', { email, username, password });
  return response.data;
};

// User services
export const getUserProfile = async () => {
  const response = await api.get('/user/profile/');
  return response.data;
};

// Admin services
export const getUsers = async () => {
  const response = await api.get('/admin/users/');
  return response.data;
};

export const updateUser = async (userId: number, data: any) => {
  const response = await api.put(`/admin/users/${userId}/`, data);
  return response.data;
};

export default api;
