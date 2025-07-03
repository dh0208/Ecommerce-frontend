import axios, { AxiosResponse } from 'axios';
import { LoginRequest, LoginResponse, Product, Cart, OrderRequest } from '../types/api';
import { store } from '../store'; // adjust the import path as needed

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {

      /// window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials: LoginRequest): Promise<AxiosResponse<LoginResponse>> =>
    api.post('/api/auth/login', credentials),
};

// Products API
export const productsAPI = {
  getAll: (): Promise<AxiosResponse<Product[]>> =>
    api.get('/api/products/get-product-list/'),
  getById: (id: number): Promise<AxiosResponse<Product>> =>
    api.get(`/api/products/${id}`),
  create: (product: Omit<Product, 'id'>): Promise<AxiosResponse<Product>> =>
    api.post('/api/products/create-product', product),
  update: (id: number, product: Partial<Product>): Promise<AxiosResponse<Product>> =>
    api.put(`/api/products/${id}`, product),
  delete: (id: number): Promise<AxiosResponse<void>> =>
    api.delete(`/api/products/${id}`),
};

// Cart API
export const cartAPI = {
  get: (): Promise<AxiosResponse<any>> => {
    const userId = store.getState().auth.user?.id;
    return api.get('/api/cart/', { params: { userId } });
  },
  updateItem: (productId: number, quantity: number): Promise<AxiosResponse<Cart>> => {
    const userId = store.getState().auth.user?.id;
    return api.put(`/api/cart/${productId}`, { quantity, userId });
  },
  removeItem: (productId: number): Promise<AxiosResponse<Cart>> => {
    const userId = store.getState().auth.user?.id;
    return api.delete(`/api/cart/${productId}`, { data: { userId } });
  },
  addItem: (productId: number, quantity: number = 1): Promise<AxiosResponse<Cart>> => {
    const userId = store.getState().auth.user?.id;
    return api.post('/api/cart/add-to-cart', { productId, quantity, userId });
  },
};

// Orders API
export const ordersAPI = {
  placeOrder: (orderData: OrderRequest): Promise<AxiosResponse<{ orderId: string }>> =>
    api.post('/api/orders/place-order', orderData),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/api/categories'),
};

export default api;
