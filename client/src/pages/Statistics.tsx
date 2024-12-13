// src/pages/Statistics.tsx
import React, { useEffect, useState } from 'react';
import { productService } from '../services/productService';
import { customerService } from '../services/customerService';
import { Loading } from '../components/common/Loading';

interface Stats {
    totalProducts: number;
    totalCustomers: number;
}

export const Statistics: React.FC = () => {
    const [stats, setStats] = useState<Stats>({ totalProducts: 0, totalCustomers: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const [productsRes, customersRes] = await Promise.all([
                    productService.getAll(),
                    customerService.getAll()
                ]);

                setStats({
                    totalProducts: productsRes.data.length,
                    totalCustomers: customersRes.data.length
                });
            } catch (err) {
                setError('Error al cargar las estadísticas');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Estadísticas</h1>

            {error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            Total de Productos
                        </h2>
                        <p className="text-3xl font-bold text-blue-600">
                            {stats.totalProducts}
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            Total de Clientes
                        </h2>
                        <p className="text-3xl font-bold text-blue-600">
                            {stats.totalCustomers}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};