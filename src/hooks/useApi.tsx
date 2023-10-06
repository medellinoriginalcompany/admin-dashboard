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

  getProducts: async () => {
    const response = await api.get('/admin/products');
    if (response) {
      return response.data;
    } else {
      return false;
    }
  },

  getProductProperties: async () => {
    const response = await api.get('/admin/products/properties');
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

  addProductProperty: async (type: string, name: string, description: string) => {
    const response = await api.post(`/admin/products/add-property/${type}`, { type, name, description });
    return response.data;
  },

  deleteProduct: async (id: number) => {
    const response = await api.delete(`/admin/delete-product/${id}`);
    return response.data;
  },

  delete: async (type: string, id: number) => {
    const response = await api.delete(`/admin/delete/${type}/${id}`);
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