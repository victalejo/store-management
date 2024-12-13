// src/components/customers/CustomerList.tsx
import React, { useState, useEffect } from 'react';
import { Customer } from '../../types/customer';
import { customerService } from '../../services/customerService';
import { CustomerCard } from './CustomerDetails';
import { CustomerForm } from './CustomerForm';
import { Button } from '../common/Button';
import { Loading } from '../common/Loading';

export const CustomerList: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await customerService.getAll();
            setCustomers(response.data);
            setError(null);
        } catch (err) {
            setError('Error al cargar los clientes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleCreateCustomer = async (customerData: Omit<Customer, '_id' | 'createdAt' | 'updatedAt'>) => {
        try {
            await customerService.create(customerData);
            await fetchCustomers();
            setShowForm(false);
        } catch (err) {
            setError('Error al crear el cliente');
        }
    };

    const handleUpdateCustomer = async (customerData: Omit<Customer, '_id' | 'createdAt' | 'updatedAt'>) => {
        if (!editingCustomer) return;
        try {
            await customerService.update(editingCustomer._id, customerData);
            await fetchCustomers();
            setEditingCustomer(null);
        } catch (err) {
            setError('Error al actualizar el cliente');
        }
    };

    const handleDeleteCustomer = async (id: string) => {
        if (window.confirm('¿Está seguro de que desea eliminar este cliente?')) {
            try {
                await customerService.delete(id);
                await fetchCustomers();
            } catch (err) {
                setError('Error al eliminar el cliente');
            }
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Clientes</h2>
                <Button onClick={() => setShowForm(true)}>
                    Agregar Cliente
                </Button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {(showForm || editingCustomer) && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">
                        {editingCustomer ? 'Editar Cliente' : 'Nuevo Cliente'}
                    </h3>
                    <CustomerForm
                        customer={editingCustomer || undefined}
                        onSubmit={editingCustomer ? handleUpdateCustomer : handleCreateCustomer}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingCustomer(null);
                        }}
                    />
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {customers.map(customer => (
                    <CustomerCard
                        key={customer._id}
                        customer={customer}
                        onEdit={setEditingCustomer}
                        onDelete={handleDeleteCustomer}
                    />
                ))}
            </div>
        </div>
    );
};