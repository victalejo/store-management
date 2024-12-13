// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Customers } from './pages/Customers';
import { Statistics } from './pages/Statistics';
import { Login } from './components/auth/Login';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

const App: React.FC = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Header />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/products"
                        element={
                            <ProtectedRoute>
                                <Products />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/customers"
                        element={
                            <ProtectedRoute>
                                <Customers />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/statistics"
                        element={
                            <ProtectedRoute>
                                <Statistics />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;