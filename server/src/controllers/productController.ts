// src/controllers/productController.ts
import { Request, Response } from 'express';
import Product from '../models/Product';

export const productController = {
  // Crear un nuevo producto
  createProduct: async (req: Request, res: Response): Promise<void> => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: 'Error creating product', error });
    }
  },

  // Obtener todos los productos
  getAllProducts: async (_req: Request, res: Response): Promise<void> => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error });
    }
  },

  // Obtener un producto por ID
  getProductById: async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product', error });
    }
  },

  // Actualizar un producto
  updateProduct: async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
      );
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: 'Error updating product', error });
    }
  },

  // Eliminar un producto
  deleteProduct: async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error });
    }
  }
};