// src/pages/Customers.tsx
import React from 'react';
import { CustomerList } from '../components/customers/CustomerList';

export const Customers: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CustomerList />
        </div>
    );
};