// src/pages/Products.tsx
import React from 'react';
import { ProductList } from '../components/products/ProductList';

export const Products: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ProductList />
        </div>
    );
};
