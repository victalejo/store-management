// src/services/customerService.ts
import { Customer } from '../types/customer';
import { api } from './api';

export const customerService = {
    getAll: () => api.get<Customer[]>('/customers'),
    getById: (id: string) => api.get<Customer>(`/customers/${id}`),
    create: (customer: Omit<Customer, '_id' | 'createdAt' | 'updatedAt'>) =>
        api.post<Customer>('/customers', customer),
    update: (id: string, customer: Partial<Customer>) =>
        api.put<Customer>(`/customers/${id}`, customer),
    delete: (id: string) => api.delete(`/customers/${id}`),
};