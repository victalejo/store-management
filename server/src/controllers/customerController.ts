// src/controllers/customerController.ts
import { Request, Response } from 'express';
import Customer from '../models/Customer';

export const customerController = {
  // Crear un nuevo cliente
  createCustomer: async (req: Request, res: Response): Promise<void> => {
    try {
      const customer = new Customer(req.body);
      const savedCustomer = await customer.save();
      res.status(201).json(savedCustomer);
    } catch (error) {
      res.status(400).json({ message: 'Error creating customer', error });
    }
  },

  // Obtener todos los clientes
  getAllCustomers: async (_req: Request, res: Response): Promise<void> => {
    try {
      const customers = await Customer.find();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching customers', error });
    }
  },

  // Obtener un cliente por ID
  getCustomerById: async (req: Request, res: Response): Promise<void> => {
    try {
      const customer = await Customer.findById(req.params.id);
      if (!customer) {
        res.status(404).json({ message: 'Customer not found' });
        return;
      }
      res.json(customer);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching customer', error });
    }
  },

  // Actualizar un cliente
  updateCustomer: async (req: Request, res: Response): Promise<void> => {
    try {
      const customer = await Customer.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
      );
      if (!customer) {
        res.status(404).json({ message: 'Customer not found' });
        return;
      }
      res.json(customer);
    } catch (error) {
      res.status(400).json({ message: 'Error updating customer', error });
    }
  },

  // Eliminar un cliente
  deleteCustomer: async (req: Request, res: Response): Promise<void> => {
    try {
      const customer = await Customer.findByIdAndDelete(req.params.id);
      if (!customer) {
        res.status(404).json({ message: 'Customer not found' });
        return;
      }
      res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting customer', error });
    }
  }
};