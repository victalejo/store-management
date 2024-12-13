// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const Home: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Sistema de Gestión de Tienda
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Gestione sus productos y clientes de manera eficiente
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="/products">
                        <Button variant="primary">Gestionar Productos</Button>
                    </Link>
                    <Link to="/customers">
                        <Button variant="secondary">Gestionar Clientes</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};