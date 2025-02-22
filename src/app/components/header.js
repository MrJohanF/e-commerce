"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [isIconAnimating, setIsIconAnimating] = useState(false);

  // Refs para controlar la lógica de animación
  const prevCartCountRef = useRef(0);
  const latestCartRef = useRef([]);

  useEffect(() => {
    // Cargar usuario admin si existe
    const adminUser = localStorage.getItem("adminUser");
    if (adminUser) {
      setUser(JSON.parse(adminUser));
    }

    // Función para cargar el conteo inicial de carrito
    const loadCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      latestCartRef.current = cart;
      const totalQuantity = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
      setCartCount(totalQuantity);
      prevCartCountRef.current = totalQuantity;
    };
    loadCartCount();

    // Listener para el evento "cart-updated"
    const handleCartUpdated = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      latestCartRef.current = cart;
      const totalQuantity = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

      // Si el conteo aumentó, disparamos animaciones
      if (totalQuantity > prevCartCountRef.current) {
        setIsCartAnimating(true);
        setIsIconAnimating(true);
        
        // Apagar la animación del contador
        setTimeout(() => setIsCartAnimating(false), 800);
        // Apagar la animación del ícono un poco después
        setTimeout(() => setIsIconAnimating(false), 1000);
      }

      // Actualizar estado y referencia
      setCartCount(totalQuantity);
      prevCartCountRef.current = totalQuantity;
    };

    window.addEventListener("cart-updated", handleCartUpdated);
    return () => {
      window.removeEventListener("cart-updated", handleCartUpdated);
    };
  }, []);

  // Cerrar sesión
  async function handleLogout() {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        localStorage.removeItem("adminUser");
        router.push("/admin/login");
      } else {
        console.error("Error en logout");
      }
    } catch (error) {
      console.error("Error en logout:", error);
    }
  }

  const navigationLinks = ["Inicio", "Productos", "Nosotros", "Contactanos"];

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo o nombre de la tienda */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            Tienda Ucompensar
          </Link>

          {/* Navegación (versión de escritorio) */}
          <nav className="hidden md:flex space-x-8">
            {navigationLinks.map((item) => (
              <Link
                key={item}
                href={item === "Inicio" ? "/" : `/${item.toLowerCase()}`}
                className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Iconos lado derecho */}
          <div className="flex items-center space-x-4">
            {/* Ícono del carrito con animaciones */}
            <Link 
              href="/cart" 
              prefetch={false}
              className={`relative p-2 rounded-full transition-all duration-300 ${
                isIconAnimating ? "bg-purple-100" : "hover:bg-gray-100"
              }`}
            >
              <ShoppingCart 
                className={`w-6 h-6 transition-all duration-300 transform ${
                  isIconAnimating 
                    ? "text-purple-600 scale-110 rotate-12" 
                    : "text-gray-600"
                }`}
              />
              {cartCount > 0 && (
                <span 
                  className={`
                    absolute -top-1.5 -right-1.5 
                    bg-red-600 text-white text-xs 
                    w-5 h-5 rounded-full 
                    flex items-center justify-center 
                    transition-all duration-800 
                    ${
                      isCartAnimating
                        ? [
                            "animate-[bounce_0.5s_cubic-bezier(0.36,0,0.66,-0.56)_2]",
                            "bg-purple-600 scale-150",
                            "ring-4 ring-purple-200"
                          ].join(" ")
                        : "scale-100"
                    }
                  `}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Menú de usuario (login / logout / dashboard) */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden md:block">
                    {user.name || user.email}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                    {user.role === "ADMIN" && (
                      <Link
                        href="/admin/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/admin/login"
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Iniciar sesión</span>
              </Link>
            )}

            {/* Botón de menú para móvil */}
            <button
              onClick={() => setIsMenuOpen(prev => !prev)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navegación móvil */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100">
          <nav className="container mx-auto px-4 py-4">
            {navigationLinks.map((item) => (
              <Link
                key={item}
                href={item === "Inicio" ? "/" : `/${item.toLowerCase()}`}
                className="block py-3 text-gray-600 hover:text-purple-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            {!user && (
              <Link
                href="/admin/login"
                className="flex items-center space-x-2 mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-4 h-4" />
                <span>Iniciar sesión</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
