import axios from 'axios';

// Use 10.0.2.2 for Android Emulator, localhost for iOS Simulator/Web
const API_BASE_URL = 'http://localhost:5001/api'; 
// const API_BASE_URL = 'http://10.0.2.2:5001/api'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const productApi = {
  getAll: (params?: any) => api.get('/products', { params }),
  getOne: (id: string) => api.get(`/products/${id}`),
};

export const cartApi = {
  get: () => api.get('/cart'),
  add: (data: { productId: string; quantity: number }) => api.post('/cart', data),
  remove: (id: string) => api.delete(`/cart/${id}`),
};

export const authApi = {
  login: (data: any) => api.post('/auth/login', data),
  register: (data: any) => api.post('/auth/register', data),
};

export default api;
