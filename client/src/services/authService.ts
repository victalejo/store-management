// src/services/authService.ts
import { api } from './api';

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterData extends LoginCredentials {
    name: string;
}

interface AuthResponse {
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
    };
    token: string;
}

export const authService = {
    login: (credentials: LoginCredentials) =>
        api.post<AuthResponse>('/auth/login', credentials),

    register: (userData: RegisterData) =>
        api.post<AuthResponse>('/auth/register', userData),

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    setAuthData: (data: AuthResponse) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
    },

    getUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};