import axios from "axios";
import ProductData from "../types/product/ProductData";
import ProductRelation from "../types/product/ProductRelation";
import { Credentials } from "../types/Credentials";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // URL API
  withCredentials: true,
});

export const useApi = () => ({
  validateToken: async () => {
    const response = await api.get('/admin/validar');
    return response.data
  },

  login: async (credentials: Credentials) => {
    const response = await api.post('/admin/login', { credentials });
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/admin/logout');
    return response.data;
  },

  getProduct: async (id: string) => {
    const response = await api.get(`/admin/produto/${id}`);
    return response.data;
  },

  getProducts: async () => {
    const response = await api.get('/admin/produtos');
    if (response) {
      return response.data;
    } else {
      return false;
    }
  },

  getProductProperties: async () => {
    const response = await api.get('/admin/produtos/propriedades');
    if (response) {
      return response.data;
    } else {
      return false;
    }
  },

  getTrash: async () => {
    const response = await api.get('/admin/produtos/lixeira');
    return response.data;
  },

  addProduct: async (productData: ProductData) => {
    const response = await api.post('/admin/produtos/cadastrar-produto', productData);
    return response.data;
  },

  addProductRelation: async (type: string, id: number, relation: ProductRelation) => {
    const response = await api.post(`/admin/produtos/adicionar-relacao/${type}/${id}`, relation);
    return response.data;
  },

  addProductProperty: async (type: string, name: string, description: string) => {
    const response = await api.post(`/admin/produtos/adicionar-propriedade/${type}`, { type, name, description });
    return response.data;
  },

  editProduct: async (id: string, productData: ProductData) => {
    const response = await api.post(`/admin/produtos/editar-produto/${id}`, productData);
    return response.data;
  },

  editProperty: async (type: string, id: number, name: string, description: string) => {
    const response = await api.post(`/admin/produtos/editar-propriedade/${type}/${id}`, { name, description });
    return response.data;
  },

  deleteProduct: async (id: number) => {
    const response = await api.delete(`/admin/deletar-produto/${id}`);
    return response.data;
  },

  permaDeleteProduct: async (id: number) => {
    const response = await api.delete(`/admin/produtos/deletar-permanente/${id}`);
    return response.data;
  },

  restoreProduct: async (id: number) => {
    const response = await api.post(`/admin/produtos/restaurar/${id}`);
    return response.data;
  },

  delete: async (type: string, id: number) => {
    const response = await api.delete(`/admin/deletar/${type}/${id}`);
    return response.data;
  },

  uploadImage: async (file: any, filename: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'mdlln_default');
    formData.append('public_id', filename);

    const response = await api.post('https://api.cloudinary.com/v1_1/medellincompany/image/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: false
    });

    if (response) return true;
  }

});