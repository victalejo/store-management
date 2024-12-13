// src/components/common/Header.tsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { authService } from '../../services/authService';
import { Menu, X, User, LogOut } from 'lucide-react';

export const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = authService.isAuthenticated();
    const currentUser = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
        setIsMobileMenuOpen(false);
    };

    const isActivePath = (path: string) => {
        return location.pathname === path;
    };

    const navigationLinks = [
        { path: '/products', label: 'Products' },
        { path: '/customers', label: 'Customers' },
        { path: '/statistics', label: 'Statistics' },
    ];

    const linkClasses = (path: string) =>
        `${
            isActivePath(path)
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`;

    return (
        <header className="bg-white shadow-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                                Store Management
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {isAuthenticated && navigationLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={linkClasses(link.path)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* User Menu - Desktop */}
                    {isAuthenticated ? (
                        <div className="hidden sm:flex sm:items-center sm:space-x-4">
                            <div className="flex items-center space-x-2">
                                <User className="w-5 h-5 text-gray-500" />
                                <span className="text-sm text-gray-700">{currentUser?.email}</span>
                            </div>
                            <Button
                                variant="secondary"
                                className="flex items-center space-x-2"
                                onClick={handleLogout}
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </Button>
                        </div>
                    ) : (
                        <div className="hidden sm:flex sm:items-center">
                            <Button
                                variant="primary"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </Button>
                        </div>
                    )}

                    {/* Mobile menu button */}
                    <div className="sm:hidden flex items-center">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="sm:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            {isAuthenticated && navigationLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`${
                                        isActivePath(link.path)
                                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                                            : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                                    } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {isAuthenticated ? (
                                <div className="border-t border-gray-200 pt-4 pb-3">
                                    <div className="flex items-center px-4">
                                        <div className="flex-shrink-0">
                                            <User className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-gray-700">
                                                {currentUser?.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <button
                                            className="flex w-full items-center px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                            onClick={handleLogout}
                                        >
                                            <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="pt-4 pb-3">
                                    <Button
                                        variant="primary"
                                        className="w-full"
                                        onClick={() => {
                                            navigate('/login');
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        Login
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};