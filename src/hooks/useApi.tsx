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

  getSizes: async () => {
    const response = await api.get('/admin/sizes');
    return response.data;
  },

  getColors: async () => {
    const response = await api.get('/admin/colors');
    return response.data;
  },

  getProducts: async () => {
    const response = await api.get('/admin/products');
    if (response) {
      return response.data;
    } else {
      return false;
    }
  },

  addProduct: async (
    banner: string,
    name: string,
    description: string,
    price: string,
    size: string,
    type: string,
    category: string,
    color: string,
    active: boolean,
    sku: string) => {
    const response = await api.post('/admin/cadastrar-produto', { banner, name, description, price, size, type, category, color, active, sku });

    return response.data;
  },

  deleteProduct: async (id: number) => {
    const response = await api.delete(`/admin/delete-product/${id}`);
    return response.data;
  },

  uploadImage: async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'mdlln_default');

    const response = await api.post('https://api.cloudinary.com/v1_1/medellincompany/image/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: false
    });

    if (response) return true;
  }

});