"use client";

import React, { useState, useEffect } from "react";
import { 
  ShoppingCart, 
  ArrowLeft, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard,
  Tag,
  TruckIcon,
  Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";

export default function CartPage() {
  // State for cart items and loading
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // On mount, read the cart from localStorage
  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(cart);
    } catch (error) {
      console.error("Error reading cart:", error);
    }
    setLoading(false);
    setInitialized(true); // We've now done our initial load
  }, []);

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 0 ? 4.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Handle quantity changes
  const updateQuantity = (id, change) => {
    setCartItems((prev) => 
      prev.map(item => {
        if (item.id === id) {
          // item.stock might not exist if it wasn't stored in localStorage, so safely handle that
          const maxStock = item.stock ?? 99; 
          const oldQty = item.quantity ?? 1;
          const newQty = Math.max(1, Math.min(maxStock, oldQty + change));
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    if (initialized) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, initialized]);

  // Render fallback image component
  const ImageWithFallback = ({ src, alt, className }) => {
    const [hasError, setHasError] = useState(false);
    if (hasError) {
      return (
        <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
          <ImageIcon className="h-10 w-10 text-gray-400" />
        </div>
      );
    }
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => setHasError(true)}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        {/* Hero Section */}
        <section className="pt-16 bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Tu
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {" "}Carrito
                </span>
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Revisa los productos que has seleccionado
              </p>
            </div>
          </div>
        </section>

        {/* Cart Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-pulse flex space-x-4">
                  <div className="h-12 w-12 bg-purple-200 rounded-full"></div>
                  <div className="space-y-4 flex-1 max-w-lg">
                    <div className="h-4 bg-purple-200 rounded"></div>
                    <div className="h-4 bg-purple-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="max-w-4xl mx-auto text-center py-16">
                <div className="bg-white rounded-2xl shadow-sm p-10 max-w-xl mx-auto">
                  <ShoppingCart className="mx-auto h-16 w-16 text-purple-300 mb-6" />
                  <h2 className="text-2xl font-bold mb-3 text-gray-800">Tu carrito está vacío</h2>
                  <p className="text-gray-600 mb-8">Parece que aún no has añadido productos a tu carrito.</p>
                  <Link href="/productos" className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors inline-flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Explorar Productos
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items Section */}
                <div className="lg:col-span-2">
                  <div className="mb-6 flex items-center">
                    <h2 className="text-xl font-bold text-gray-800">
                      Artículos en tu carrito ({cartItems.reduce((count, item) => count + (item.quantity || 1), 0)})
                    </h2>
                  </div>

                  {/* Cart Items */}
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="bg-white rounded-2xl shadow-sm p-4 md:p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                          {/* Product Image */}
                          <div className="h-24 w-24 md:h-28 md:w-28 flex-shrink-0 bg-gray-50 rounded-xl p-2 flex items-center justify-center">
                            <ImageWithFallback
                              src={item.imageUrl}
                              alt={item.name}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          
                          {/* Product Info */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                                    {item.category || "Sin categoría"}
                                  </span>
                                  {(item.stock ?? 1) > 0 ? (
                                    <p className="text-xs text-green-600">{item.stock ?? 1} en stock</p>
                                  ) : (
                                    <p className="text-xs text-red-600">Agotado</p>
                                  )}
                                </div>
                              </div>
                              <p className="text-xl font-bold text-purple-600">
                                ${(item.price ?? 0).toFixed(2)}
                              </p>
                            </div>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border border-gray-200 rounded-lg">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-l-lg disabled:opacity-50"
                                  disabled={(item.quantity ?? 1) <= 1}
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 py-1 text-gray-800">{item.quantity ?? 1}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-r-lg disabled:opacity-50"
                                  disabled={(item.quantity ?? 1) >= (item.stock ?? 99)}
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700 flex items-center text-sm font-medium"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Continue Shopping Link */}
                  <div className="mt-8">
                    <Link href="/productos" className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Continuar Comprando
                    </Link>
                  </div>
                </div>
                
                {/* Order Summary Section */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-4">
                    <h2 className="text-xl font-bold mb-6 text-gray-800">Resumen de Compra</h2>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between py-2">
                        <p className="text-gray-600">Subtotal</p>
                        <p className="text-gray-600 font-medium">${subtotal.toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between py-2">
                        <p className="text-gray-600">Envío</p>
                        <p className="text-gray-600 font-medium">${shipping.toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between py-2">
                        <p className="text-gray-600">Impuestos</p>
                        <p className="text-gray-600 font-medium">${tax.toFixed(2)}</p>
                      </div>
                      <div className="border-t border-gray-200 my-4"></div>
                      <div className="flex justify-between py-2">
                        <p className="text-xl font-bold text-gray-800">Total</p>
                        <p className="text-xl font-bold text-purple-600">${total.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    {/* Promotional Features */}
                    <div className="mt-6 bg-blue-50 p-4 rounded-xl">
                      <div className="flex items-start">
                        <TruckIcon className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">Envío Gratis</p>
                          <p className="text-xs text-blue-600">En compras mayores a $100</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-purple-50 p-4 rounded-xl">
                      <div className="flex items-start">
                        <Tag className="h-5 w-5 text-purple-600 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-purple-800">¿Tienes un cupón?</p>
                          <div className="flex mt-2">
                            <input 
                              type="text" 
                              placeholder="Código de descuento"
                              className="flex-1 px-3 py-2 text-sm rounded-l-lg border border-gray-200 focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
                            />
                            <button className="bg-purple-600 text-white px-3 py-2 text-sm rounded-r-lg hover:bg-purple-700">
                              Aplicar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Checkout Button */}
                    <button
                      type="button"
                      className="mt-8 w-full flex items-center justify-center bg-purple-600 py-3 px-4 rounded-xl text-white font-medium hover:bg-purple-700 transition-colors"
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      Proceder al Pago
                    </button>
                    
                    {/* Payment Methods */}
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600 mb-2">Métodos de pago aceptados</p>
                      <div className="flex justify-center space-x-2">
                        <span className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-xs">Visa</span>
                        <span className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-xs">Mastercard</span>
                        <span className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-xs">PayPal</span>
                        <span className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-xs">Apple Pay</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
