// src/app/admin/products/list.js

"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Star,
  X,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";

const ProductsList = () => {
  const [products, setProducts] = useState([]); 
  const [isDeleting, setIsDeleting] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const router = useRouter();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  
  // New filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500000000]);
  const [sortOption, setSortOption] = useState("relevance");
  
  // Refs for detecting outside clicks
  const filterRef = useRef(null);
  const sortRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // How many products you want per page
  const limit = 9;

  // Fetch products from API with filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Build query parameters
        const queryParams = new URLSearchParams();
        
        // Pagination
        queryParams.append('page', currentPage);
        queryParams.append('limit', limit);
        
        // Search
        if (searchQuery.trim()) {
          queryParams.append('search', searchQuery);
        }
        
        // Category filter
        if (selectedCategory !== 'all') {
          queryParams.append('category', selectedCategory);
        }
        
        // Price range filter
        if (priceRange[0] > 0) {
          queryParams.append('minPrice', priceRange[0]);
        }
        if (priceRange[1] < 5000) {
          queryParams.append('maxPrice', priceRange[1]);
        }
        
        // Sorting
        if (sortOption === 'price_asc') {
          queryParams.append('sortBy', 'price');
          queryParams.append('order', 'asc');
        } else if (sortOption === 'price_desc') {
          queryParams.append('sortBy', 'price');
          queryParams.append('order', 'desc');
        } else if (sortOption === 'name_asc') {
          queryParams.append('sortBy', 'name');
          queryParams.append('order', 'asc');
        } else if (sortOption === 'name_desc') {
          queryParams.append('sortBy', 'name');
          queryParams.append('order', 'desc');
        }
        
        // Pass all filters as query params
        const res = await fetch(`/api/products?${queryParams.toString()}`);
        
        if (!res.ok) {
          throw new Error("Error fetching products");
        }
        const data = await res.json();

        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    // Debounce search to avoid too many requests while typing
    const timeoutId = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [currentPage, limit, searchQuery, selectedCategory, priceRange, sortOption]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Apply filters and close the filter dropdown
  const applyFilters = () => {
    setCurrentPage(1); // Reset to first page when filters change
    setIsFilterOpen(false);
  };

  // Reset filters to defaults
  const resetFilters = () => {
    setSelectedCategory("all");
    setPriceRange([0, 5000]);
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  // Pagination helper to move to a different page
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

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
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Buscar productos..."
                className="text-gray-700 w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {/* Filter Dropdown */}
              <div ref={filterRef} className="relative">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)} 
                  className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Filtrar
                </button>
                
                {isFilterOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg p-4 z-10 border border-gray-100">
                    {/* Category Filter */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoría
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {["all", "smartphone", "laptop"].map((category) => (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3 py-1.5 rounded-lg text-left text-sm transition-colors ${
                              selectedCategory === category
                                ? "bg-purple-100 text-purple-700 font-medium"
                                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {category === "all" ? "Todos" : category.charAt(0).toUpperCase() + category.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Price Range Filter */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rango de Precio
                      </label>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 relative">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                          <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                            className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-gray-200 text-sm"
                            placeholder="Min"
                          />
                        </div>
                        <span className="text-gray-400">-</span>
                        <div className="flex-1 relative">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                          <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 500000000])}
                            className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-gray-200 text-sm"
                            placeholder="Max"
                          />
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="500000000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      />
                    </div>
                    
                    {/* Filter Actions */}
                    <div className="flex justify-between pt-2 border-t border-gray-100">
                      <button
                        onClick={resetFilters}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                        Reset
                      </button>
                      <button
                        onClick={applyFilters}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
                      >
                        Aplicar Filtros
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Sort Dropdown */}
              <div ref={sortRef} className="relative">
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)} 
                  className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ArrowUpDown className="h-5 w-5 mr-2" />
                  Ordenar
                </button>
                
                {isSortOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg p-2 z-10 border border-gray-100">
                    <button 
                      onClick={() => {
                        setSortOption("relevance");
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg ${
                        sortOption === "relevance" ? "bg-purple-100 text-purple-700" : "hover:bg-gray-50"
                      }`}
                    >
                      Más Relevantes
                    </button>
                    <button 
                      onClick={() => {
                        setSortOption("price_asc");
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg ${
                        sortOption === "price_asc" ? "bg-purple-100 text-purple-700" : "hover:bg-gray-50"
                      }`}
                    >
                      Precio: Menor a Mayor
                    </button>
                    <button 
                      onClick={() => {
                        setSortOption("price_desc");
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg ${
                        sortOption === "price_desc" ? "bg-purple-100 text-purple-700" : "hover:bg-gray-50"
                      }`}
                    >
                      Precio: Mayor a Menor
                    </button>
                    <button 
                      onClick={() => {
                        setSortOption("name_asc");
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg ${
                        sortOption === "name_asc" ? "bg-purple-100 text-purple-700" : "hover:bg-gray-50"
                      }`}
                    >
                      Nombre: A-Z
                    </button>
                    <button 
                      onClick={() => {
                        setSortOption("name_desc");
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg ${
                        sortOption === "name_desc" ? "bg-purple-100 text-purple-700" : "hover:bg-gray-50"
                      }`}
                    >
                      Nombre: Z-A
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Products Count */}
        <div className="text-sm text-gray-500 mb-4">
          Mostrando {products.length} productos {searchQuery || selectedCategory !== 'all' || priceRange[0] > 0 || priceRange[1] < 5000 ? '(filtrados)' : ''}
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
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
                        $
                        {typeof product.price === "number"
                          ? product.price.toFixed(2)
                          : product.price}
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
                      onClick={() =>
                        router.push(`/admin/products/edit-product/${product.id}`)
                      }
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
        ) : (
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <Package className="h-16 w-16 text-gray-300" />
              <h3 className="text-xl font-medium text-gray-800">No se encontraron productos</h3>
              <p className="text-gray-500">
                {searchQuery || selectedCategory !== 'all' || priceRange[0] > 0 || priceRange[1] < 500000000 
                  ? 'Intenta ajustar tus filtros de búsqueda'
                  : 'Agrega tu primer producto para comenzar'}
              </p>
              {(searchQuery || selectedCategory !== 'all' || priceRange[0] > 0 || priceRange[1] < 500000000) && (
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 mt-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
                >
                  Limpiar Filtros
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <div className="flex gap-2">
            {/* Previous Page */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-purple-50"
              }`}
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {/* Dynamically render page buttons (simple version) */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  pageNumber === currentPage
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-700 hover:bg-purple-50"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            {/* Next Page */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-purple-50"
              }`}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full transform transition-all scale-95 hover:scale-100">
            <div className="flex items-center gap-3 mb-5">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-bold text-gray-800">
                Confirmar Borrar
              </h2>
            </div>
            <p className="mb-6 text-gray-600">
              ¿Estás seguro de que quieres borrar{" "}
              <span className="font-medium text-gray-900">
                {productToDelete.name || "Este Producto"}
              </span>
              ? Esta acción no puede deshacerse.
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