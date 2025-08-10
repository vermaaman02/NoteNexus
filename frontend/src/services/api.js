import axios from 'axios';

const API_BASE_URL = 'https://notenexus-vi3m.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
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
export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
};

// Notes services
export const notesService = {
  getAllNotes: (params) => api.get('/notes', { params }),
  getNoteById: (id) => api.get(`/notes/${id}`),
  uploadNote: (formData) => api.post('/notes/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  downloadNote: (id) => api.post(`/notes/${id}/download`),
  likeNote: (id) => api.post(`/notes/${id}/like`),
  getUserNotes: () => api.get('/notes/my/uploads'),
  deleteNote: (id) => api.delete(`/notes/${id}`),
};

// User services
export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  saveNote: (noteId) => api.post(`/users/save-note/${noteId}`),
  getSavedNotes: () => api.get('/users/saved-notes'),
  getStats: () => api.get('/users/stats'),
};

export default api;
