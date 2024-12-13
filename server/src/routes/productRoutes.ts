// src/routes/productRoutes.ts
import express from 'express';
import { productController } from '../controllers/productController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Rutas protegidas con autenticación
router.post('/', auth, productController.createProduct);
router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

// Rutas públicas
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

export default router;