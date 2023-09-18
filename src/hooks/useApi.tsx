import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // URL API
  withCredentials: true,
});

export const useApi = () => ({
  validateToken: async () => {
    const response = await api.post('/admin/validate');

    if (response.data.user) {
      return response.data;
    } else {
      console.log('Token inválido');
    }
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/admin/login', { email, password });
    return response.data;
  },

  logout: async () => { 
    const response = await api.post('/admin/logout');
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/admin/categories');
    return response.data;
  },

  getTypes: async () => {
    const response = await api.get('/admin/types');
    return response.data;
  },

  addProduct: async (name: string, description: string, price: string, size: string, category: string) => {
    const response = await api.post('/admin/cadastrar-produto', { name, description, price, size, category });
    return response.data;
  },

});