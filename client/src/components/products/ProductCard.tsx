// src/components/products/ProductCard.tsx
import React from 'react';
import { Product } from '../../types/product';
import { Button } from '../common/Button';

interface ProductCardProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-gray-500 mt-1">{product.category}</p>
                </div>
                <div className="text-xl font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                </div>
            </div>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <div className="mt-4">
                <p className="text-sm text-gray-500">
                    Stock disponible: <span className="font-medium">{product.stock}</span>
                </p>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
                <Button
                    variant="secondary"
                    onClick={() => onEdit(product)}
                >
                    Editar
                </Button>
                <Button
                    variant="danger"
                    onClick={() => onDelete(product._id)}
                >
                    Eliminar
                </Button>
            </div>
        </div>
    );
};