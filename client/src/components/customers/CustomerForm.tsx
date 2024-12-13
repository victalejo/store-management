
// src/components/customers/CustomerForm.tsx
import React, { useState, useEffect } from 'react';
import { Customer } from '../../types/customer';
import { Button } from '../common/Button';

interface CustomerFormProps {
    customer?: Customer;
    onSubmit: (customerData: Omit<Customer, '_id' | 'createdAt' | 'updatedAt'>) => void;
    onCancel: () => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (customer) {
            setFormData({
                name: customer.name,
                email: customer.email,
                phone: customer.phone || '',
                address: customer.address || ''
            });
        }
    }, [customer]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Nombre
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Email
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Teléfono
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Dirección
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </label>
            </div>

            <div className="flex justify-end space-x-2">
                <Button variant="secondary" onClick={onCancel} type="button">
                    Cancelar
                </Button>
                <Button variant="primary" type="submit">
                    {customer ? 'Actualizar' : 'Crear'}
                </Button>
            </div>
        </form>
    );
};
