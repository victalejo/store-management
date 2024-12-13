// src/services/productService.ts
import { Product } from '../types/product';
import { api } from './api';

export const productService = {
    getAll: () => api.get<Product[]>('/products'),
    getById: (id: string) => api.get<Product>(`/products/${id}`),
    create: (product: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>) =>
        api.post<Product>('/products', product),
    update: (id: string, product: Partial<Product>) =>
        api.put<Product>(`/products/${id}`, product),
    delete: (id: string) => api.delete(`/products/${id}`),
};