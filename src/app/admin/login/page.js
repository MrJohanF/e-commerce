"use client";

import React, { useState } from 'react';
import { Mail, Lock, AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AdminLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      // Verificar si el usuario es admin
      if (data.user.role !== 'ADMIN') {
        throw new Error('Acceso no autorizado. Solo administradores pueden acceder.');
      }

      // Guardar el token
      if (rememberMe) {
        localStorage.setItem('adminToken', data.token);
      } else {
        sessionStorage.setItem('adminToken', data.token);
      }

      // Guardar información básica del usuario
      const userData = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
      };
      
      localStorage.setItem('adminUser', JSON.stringify(userData));

      // Redireccionar al dashboard
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Credenciales no válidas. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Portal de administración</h1>
          <p className="text-gray-500">Inicie sesión para gestionar la tienda virtual</p>
        </div>

        {/* Custom Error Alert */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-center gap-3 animate-in fade-in duration-300">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-gray-700 block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg transition-all duration-200 
                    focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                    hover:border-gray-400"
                  placeholder="admin@tiendaucompensar.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-gray-700 block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg transition-all duration-200
                    focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                    hover:border-gray-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded transition-colors"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Recordar sesión
              </label>
            </div>

            <button type="button" className="text-sm font-medium text-purple-600 hover:text-purple-500 transition-colors">
              ¿Olvidó su contraseña?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg
              text-sm font-medium text-white bg-purple-600 transition-all duration-200
              hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              'Iniciar sesión'
            )}
          </button>
        </form>

        {/* Security Notice */}
        <p className="text-xs text-center text-gray-500 mt-8">
          Esta es un área segura. Por favor, verifique la URL antes de iniciar sesión.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;