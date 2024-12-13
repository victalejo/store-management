// src/types/customer.ts
export interface Customer {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    createdAt: Date;
    updatedAt: Date;
}