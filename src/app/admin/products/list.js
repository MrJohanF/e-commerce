"use client";

import React, { useState, useEffect } from "react";
import {
  Edit,
  Trash2,
  Search,
  Filter,
  ArrowUpDown,
  Loader2,
  Package,
  Tag,
  AlertTriangle,
  Heart,
  Star
} from "lucide-react";
import { useRouter } from "next/navigation";

const ProductsList = () => {
  const [products, setProducts] = useState([]); // Stores array
  const [isDeleting, setIsDeleting] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null); // Stores entire product object
  const router = useRouter();

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) {
        throw new Error("Error fetching products");
      }
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // When Delete button is clicked, open confirmation modal
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
  };

  // Confirm deletion: call DELETE endpoint
  const confirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/products/${productToDelete.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error deleting product");
      }
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setProductToDelete(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setProductToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
            Productos
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Gestión de Inventario</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="text-gray-700 w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Filter className="h-5 w-5 mr-2" />
                Filtrar
              </button>
              <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <ArrowUpDown className="h-5 w-5 mr-2" />
                Ordenar
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              {/* Card Layout */}
              <div className="flex flex-col h-full">
                {/* Product Image */}
                <div className="w-full bg-gray-50 border-b border-gray-100 p-3 flex justify-center">
                  <div className="relative h-40 w-32 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
                {/* Product Information */}
                <div className="p-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-500">{product.category}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-purple-700 font-bold text-lg">
                      ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <Package className="h-4 w-4 text-gray-500" />
                      <p
                        className={`text-sm font-medium ${
                          product.stock > 20
                            ? "text-green-600"
                            : product.stock > 5
                            ? "text-amber-600"
                            : "text-red-600"
                        }`}
                      >
                        {product.stock} in stock
                      </p>
                    </div>
                  </div>
                </div>
                {/* Action Footer */}
                <div className="mt-auto border-t border-gray-100 flex">
                  <button
                    onClick={() => router.push(`/admin/products/edit-product/${product.id}`)}
                    className="flex items-center justify-center gap-1.5 py-2.5 flex-1 text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <Edit className="h-5 w-5" />
                    <span className="text-sm font-medium">Editar</span>
                  </button>
                  <div className="w-px bg-gray-100"></div>
                  <button
                    onClick={() => handleDeleteClick(product)}
                    className="flex items-center justify-center gap-1.5 py-2.5 flex-1 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                    <span className="text-sm font-medium">Eliminar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full transform transition-all scale-95 hover:scale-100">
            <div className="flex items-center gap-3 mb-5">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-bold text-gray-800">Confirmar Borrar</h2>
            </div>
            <p className="mb-6 text-gray-600">
              ¿Estás seguro de que quieres borrar{" "}
              <span className="font-medium text-gray-900">
                {productToDelete.name || "Este Producto"}
              </span>? Esta acción no puede deshacerse.
            </p>
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={cancelDelete}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Eliminando...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    <span>Eliminar Producto</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
