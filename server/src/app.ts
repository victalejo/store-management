// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import productRoutes from './routes/productRoutes';
import customerRoutes from './routes/customerRoutes';
import authRoutes from './routes/authRoutes';


// Configuración de variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDatabase();

// Rutas API
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/auth', authRoutes);

// Ruta básica
app.get('/', (_req, res) => {
  res.send('API lista para recibir solicitudes');
});

// Middleware para manejo de errores
app.use((_req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Puerto
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});

export default app;