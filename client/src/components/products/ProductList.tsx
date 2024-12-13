// src/components/products/ProductList.tsx
import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { productService } from '../../services/productService';
import { ProductCard } from './ProductCard';
import { ProductForm } from './ProductForm';
import { Button } from '../common/Button';
import { Loading } from '../common/Loading';

export const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productService.getAll();
            setProducts(response.data);
            setError(null);
        } catch (err) {
            setError('Error al cargar los productos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleCreateProduct = async (productData: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>) => {
        try {
            await productService.create(productData);
            await fetchProducts();
            setShowForm(false);
        } catch (err) {
            setError('Error al crear el producto');
        }
    };

    const handleUpdateProduct = async (productData: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>) => {
        if (!editingProduct) return;
        try {
            await productService.update(editingProduct._id, productData);
            await fetchProducts();
            setEditingProduct(null);
        } catch (err) {
            setError('Error al actualizar el producto');
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
            try {
                await productService.delete(id);
                await fetchProducts();
            } catch (err) {
                setError('Error al eliminar el producto');
            }
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Productos</h2>
                <Button onClick={() => setShowForm(true)}>
                    Agregar Producto
                </Button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {(showForm || editingProduct) && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">
                        {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                    </h3>
                    <ProductForm
                        product={editingProduct || undefined}
                        onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingProduct(null);
                        }}
                    />
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {products.map(product => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        onEdit={setEditingProduct}
                        onDelete={handleDeleteProduct}
                    />
                ))}
            </div>
        </div>
    );
};