"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Star,
  ShoppingCart,
  Heart,
} from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";
import ProductFilters from "../components/productfilters";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Keep track of how many pages we have
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [searchQuery, setSearchQuery] = useState("");

  // How many products you want per page
  const limit = 9;

  // 1. Fetch products with pagination
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Create query params with all filters
        const queryParams = new URLSearchParams();
        
        // Add pagination params
        queryParams.append('page', currentPage);
        queryParams.append('limit', limit);
        
        // Add category filter if not 'all'
        if (selectedCategory !== 'all') {
          queryParams.append('category', selectedCategory);
        }
        
        // Add price range filters
        queryParams.append('minPrice', priceRange[0]);
        queryParams.append('maxPrice', priceRange[1]);
        
        // Add search query if present
        if (searchQuery.trim()) {
          queryParams.append('search', searchQuery);
        }
        
        // Fetch with all filters applied
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
  
    fetchProducts();
  }, [currentPage, limit, selectedCategory, priceRange, searchQuery]);

  // 2. Handle Add to Cart
  const handleAddToCart = (product) => {
    try {
      let currentCart = JSON.parse(localStorage.getItem("cart")) || [];

      // Attempt to find an existing item with the same id
      const existingIndex = currentCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex >= 0) {
        // If the item is already in the cart, just increment its quantity
        currentCart[existingIndex].quantity =
          (currentCart[existingIndex].quantity || 1) + 1;
      } else {
        // Otherwise, push a new entry with quantity = 1
        currentCart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(currentCart));
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      console.error("Error adding item to cart:", err);
    }
  };

  // 3. Pagination helper to move to a different page
  const handlePageChange = (newPage) => {
    // Ensure newPage is within valid range
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Add a function to handle applying filters
const handleApplyFilters = () => {
  // When filters change, reset to first page
  setCurrentPage(1);
  // The useEffect will handle fetching with new filters
};

// Then pass this function to ProductFilters:
<ProductFilters
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
  priceRange={priceRange}
  setPriceRange={setPriceRange}
  onApplyFilters={handleApplyFilters}
/>

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
                  {" "}
                  Colección
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


                {/* Filters}*/}
                
                <ProductFilters
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                />
            

              {/* Products Grid */}
              <div className="flex-1">
                {/* Sort Options */}
                <div className="flex justify-between items-center mb-8">
                  <p className="text-gray-700">
                    Mostrando {products.length} productos (página {currentPage}{" "}
                    de {totalPages})
                  </p>
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
                   <Link href={`/productos/${product.id}`} className="block">
                     {/* Product Image */}
                     <div className="relative h-52 mb-4 flex items-center justify-center bg-gray-50 rounded-xl p-3">
                       <div className="relative h-full max-w-[70%] flex items-center justify-center">
                         <img
                           src={product.imageUrl}
                           alt={product.name}
                           className="h-full object-contain"
                         />
                       </div>
                       <button
                         className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
                       >
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
                           {Array(5)
                             .fill(null)
                             .map((_, i) => (
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
                             <p className="text-xs text-green-600">{product.stock} in stock</p>
                           ) : (
                             <p className="text-xs text-red-600">Out of stock</p>
                           )}
                         </div>
                       </div>
                     </div>
                   </Link>
                 
                   {/* Keep the "Add to Cart" button outside the Link to prevent navigation */}
                   <button
                     onClick={() => handleAddToCart(product)}
                     className="p-2.5 rounded-xl bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                   >
                     <ShoppingCart className="w-5 h-5" />
                   </button>
                 </div>
                 
                  ))}
                </div>

                {/* 4. Pagination Controls */}
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
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNumber) => (
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
                      )
                    )}

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
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
