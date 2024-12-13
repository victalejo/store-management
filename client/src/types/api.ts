// src/types/api.ts
export interface ApiResponse<T> {
    data?: T;
    message?: string;
    error?: any;
}