// src/models/Product.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Nombre del producto es requerido'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Descripción del producto es requerida'],
  },
  price: {
    type: Number,
    required: [true, 'Precio del producto es requerido'],
    min: [0, 'Precio no puede ser negativo'],
  },
  category: {
    type: String,
    required: [true, 'Categoría del producto es requerida'],
    trim: true,
  },
  stock: {
    type: Number,
    required: [true, 'Stock del producto es requerido'],
    min: [0, 'Stock no puede ser negativo'],
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IProduct>('Product', productSchema);