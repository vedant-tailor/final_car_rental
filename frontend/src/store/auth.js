import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const useAuth = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,

  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    const { user, token } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },

  register: async (name, email, password) => {
    const response = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
    });
    const { user, token } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null });
  },
}));