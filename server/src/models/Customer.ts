// src/models/Customer.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

const customerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Nombre es requerido'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email es requerido'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido'],
  },
  phone: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model<ICustomer>('Customer', customerSchema);