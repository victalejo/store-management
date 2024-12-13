// src/components/customers/CustomerDetails.tsx
import React from 'react';
import { Customer } from '../../types/customer';
import { Button } from '../common/Button';

interface CustomerCardProps {
    customer: Customer;
    onEdit: (customer: Customer) => void;
    onDelete: (id: string) => void;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">{customer.name}</h3>
                    <p className="text-gray-500 mt-1">{customer.email}</p>
                </div>
            </div>

            {customer.phone && (
                <p className="text-gray-600 mt-2">
                    <span className="font-medium">Teléfono:</span> {customer.phone}
                </p>
            )}

            {customer.address && (
                <p className="text-gray-600 mt-2">
                    <span className="font-medium">Dirección:</span> {customer.address}
                </p>
            )}

            <div className="mt-4 flex justify-end space-x-2">
                <Button
                    variant="secondary"
                    onClick={() => onEdit(customer)}
                >
                    Editar
                </Button>
                <Button
                    variant="danger"
                    onClick={() => onDelete(customer._id)}
                >
                    Eliminar
                </Button>
            </div>
        </div>
    );
};