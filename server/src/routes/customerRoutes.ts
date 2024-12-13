// src/routes/customerRoutes.ts
import express from 'express';
import { customerController } from '../controllers/customerController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Rutas protegidas con autenticación
router.post('/', auth, customerController.createCustomer);
router.put('/:id', auth, customerController.updateCustomer);
router.delete('/:id', auth, customerController.deleteCustomer);

// Rutas públicas
router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);

export default router;