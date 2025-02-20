"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ChevronDown, 
  Star, 
  ShoppingCart, 
  Heart 
} from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Fetch the products
  useEffect(() => {
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
    fetchProducts();
  }, []);

  // 2. Handle Add to Cart
  const handleAddToCart = (product) => {
    try {
      let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
      currentCart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(currentCart));
  
      // Dispatch an event to let the Header know the cart changed
      window.dispatchEvent(new Event("cart-updated"));
  
      alert(`¡${product.name} ha sido agregado al carrito!`);
    } catch (err) {
      console.error("Error adding item to cart:", err);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-16 bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Descubre Nuestra
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {" "}Colección
                </span>
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Explora nuestra amplia gama de productos tecnológicos
              </p>
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-purple-600 focus:border-transparent pl-14"
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filters - Desktop */}
              <div className="hidden md:block w-64 flex-shrink-0">
                <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-4">
                  <h2 className="text-xl font-bold mb-6 text-gray-800">Filtros</h2>
                  {/* Categories */}
                  <div className="mb-8">
                    <h3 className="font-medium mb-4 text-gray-800">Categorías</h3>
                    <div className="space-y-3">
                      {["all", "smartphones", "laptops"].map((category) => (
                        <label key={category} className="flex items-center">
                          <input
                            type="radio"
                            name="category"
                            className="w-4 h-4 text-purple-600"
                            checked={selectedCategory === category}
                            onChange={() => setSelectedCategory(category)}
                          />
                          <span className="ml-3 text-gray-700">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-8">
                    <h3 className="font-medium mb-4 text-gray-800">Precio</h3>
                    <div className="space-y-4">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], parseInt(e.target.value)])
                        }
                        className="w-full"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">${priceRange[0]}</span>
                        <span className="text-sm text-gray-700">${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Ratings */}
                  <div className="mb-8">
                    <h3 className="font-medium mb-4 text-gray-800">Valoración</h3>
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-purple-600 rounded"
                          />
                          <span className="ml-3 flex items-center text-gray-700">
                            {Array(rating)
                              .fill(null)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 fill-current text-yellow-400"
                                />
                              ))}
                            <span className="ml-2">y más</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Aplicar Filtros
                  </button>
                </div>
              </div>

              {/* Mobile Filters Button */}
              <button
                className="md:hidden fixed bottom-4 right-4 z-50 bg-purple-600 text-white p-4 rounded-full shadow-lg"
                onClick={() => setIsFilterOpen(true)}
              >
                <SlidersHorizontal className="w-6 h-6" />
              </button>

              {/* Mobile Filters Modal */}
              {isFilterOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
                  <div className="absolute inset-y-0 right-0 w-80 bg-white">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Filtros</h2>
                        <button onClick={() => setIsFilterOpen(false)}>
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      {/* Mobile filters content can go here */}
                    </div>
                  </div>
                </div>
              )}

              {/* Products Grid */}
              <div className="flex-1">
                {/* Sort Options */}
                <div className="flex justify-between items-center mb-8">
                  <p className="text-gray-700">Mostrando {products.length} productos</p>
                  <div className="relative">
                    <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-gray-700">
                      <option>Más Relevantes</option>
                      <option>Precio: Menor a Mayor</option>
                      <option>Precio: Mayor a Menor</option>
                      <option>Más Valorados</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-4"
                    >
                      {/* Product Image */}
                      <div className="relative h-52 mb-4 flex items-center justify-center bg-gray-50 rounded-xl p-3">
                        <div className="relative h-full max-w-[70%] flex items-center justify-center">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-full object-contain"
                          />
                        </div>
                        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
                          <Heart className="w-4 h-4 text-gray-700" />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div>
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                            {product.name}
                          </h3>
                          <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                            {product.category}
                          </span>
                        </div>
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {Array(5).fill(null).map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 text-yellow-400"
                                fill={i < Math.floor(4.5) ? "currentColor" : "none"}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">(4.5)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xl font-bold text-purple-600">
                              $
                              {typeof product.price === "number"
                                ? product.price.toFixed(2)
                                : product.price}
                            </p>
                            {product.stock > 0 ? (
                              <p className="text-xs text-green-600">
                                {product.stock} in stock
                              </p>
                            ) : (
                              <p className="text-xs text-red-600">Out of stock</p>
                            )}
                          </div>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="p-2.5 rounded-xl bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                          >
                            <ShoppingCart className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-12 flex justify-center">
                  <div className="flex gap-2">
                    {[1, 2, 3, "...", 10].map((page, index) => (
                      <button
                        key={index}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          page === 1
                            ? "bg-purple-600 text-white"
                            : "bg-white text-gray-700 hover:bg-purple-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
