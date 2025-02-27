"use client";

import React, { useState, useRef, useEffect } from "react";
import { AuthProvider } from "../authContext";
import { useRouter } from "next/navigation";
import {
  Menu,
  Package,
  User,
  LogOut,
  Plus,
  Settings,
  ChevronDown,
  ShoppingCart,
  House,
} from "lucide-react";

const Navbar = ({ onViewChange, activeView }) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, loading } = AuthProvider();

  async function handleLogout() {
    try {
      const res = await fetch("https://api.ucommerce.live/api/auth/logout", {
        method: "POST",          // Change to POST here as well
        credentials: "include",
      });
      if (res.ok) {
        console.log("Logout successful");
        user.logout();
        router.push("/admin/dashboard");
      } else {
        console.error("Error in logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (view) => {
    onViewChange(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and primary nav */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <ShoppingCart className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Tienda Ucompensar
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <button
                onClick={() => handleNavClick("products")}
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors
                  ${
                    activeView === "products"
                      ? "text-purple-600 border-b-2 border-purple-500"
                      : "text-gray-900 hover:text-purple-600"
                  }`}
              >
                <Package className="h-4 w-4 mr-2" />
                Productos
              </button>
              <button
                onClick={() => handleNavClick("add-product")}
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors
                  ${
                    activeView === "add-product"
                      ? "text-purple-600 border-b-2 border-purple-500"
                      : "text-gray-900 hover:text-purple-600"
                  }`}
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Producto
              </button>
            </div>
          </div>

          {/* User dropdown and mobile menu button */}
          <div className="flex items-center">
            {/* Custom Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-purple-600 transition-colors"
              >
                <User className="h-4 w-4 mr-2" />
                <span>Mi Cuenta</span>
                <ChevronDown
                  className={`h-4 w-4 ml-2 transform transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-2 text-sm text-gray-900 border-b border-gray-100">
                    Mi Cuenta
                  </div>
                  <button
                    onClick={() => router.push("/")} 
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <House className="h-4 w-4 mr-2" />
                    <span>Inicio</span>
                  </button>

                  <button
                    onClick={() => handleNavClick("settings")}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    <span>Configuración</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden ml-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden pb-3 pt-2">
            <div className="space-y-1">
              <button
                onClick={() => handleNavClick("products")}
                className={`flex items-center w-full px-3 py-2 text-base font-medium 
                  ${
                    activeView === "products"
                      ? "text-purple-600 bg-purple-50"
                      : "text-gray-900 hover:text-purple-600 hover:bg-purple-50"
                  } rounded-md transition-colors`}
              >
                <Package className="h-5 w-5 mr-3" />
                Productos
              </button>
              <button
                onClick={() => handleNavClick("add-product")}
                className={`flex items-center w-full px-3 py-2 text-base font-medium
                  ${
                    activeView === "add-product"
                      ? "text-purple-600 bg-purple-50"
                      : "text-gray-900 hover:text-purple-600 hover:bg-purple-50"
                  } rounded-md transition-colors`}
              >
                <Plus className="h-5 w-5 mr-3" />
                Agregar Producto
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
