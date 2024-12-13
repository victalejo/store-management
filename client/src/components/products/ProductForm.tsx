// src/components/products/ProductForm.tsx
import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { Button } from '../common/Button';

interface ProductFormProps {
    product?: Product;
    onSubmit: (productData: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>) => void;
    onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        stock: 0
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                stock: product.stock
            });
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value
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
                    Descripción
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        rows={3}
                        required
                    />
                </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm font-medium text-gray-700">
                    Precio
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </label>

                <label className="block text-sm font-medium text-gray-700">
                    Stock
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        min="0"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Categoría
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </label>
            </div>

            <div className="flex justify-end space-x-2">
                <Button variant="secondary" onClick={onCancel} type="button">
                    Cancelar
                </Button>
                <Button variant="primary" type="submit">
                    {product ? 'Actualizar' : 'Crear'}
                </Button>
            </div>
        </form>
    );
};