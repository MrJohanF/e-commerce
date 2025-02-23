"use client";

import React from "react";
import Header from "@/app/components/header";
import Link from "next/link";
import { ChevronRight, Heart, ShoppingCart, Star, Truck, Shield } from "lucide-react";
import Footer from "@/app/components/footer";


export default function ProductClient({ product }) {

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


  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        {/* Breadcrumb */}
        <nav className="container mx-auto px-4 py-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-600 hover:text-purple-600">
                Inicio
              </Link>
            </li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li>
              <Link
                href="/productos"
                className="text-gray-600 hover:text-purple-600"
              >
                Productos
              </Link>
            </li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li className="text-gray-400 truncate max-w-[200px]">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Product Details */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Image Gallery */}
            <div className="lg:w-1/2 space-y-6">
              <div className="relative h-full rounded-2xl overflow-hidden bg-gray-50 shadow-lg flex items-center justify-center p-4">
                <div className="relative h-full max-w-[80%] flex items-center justify-center">
                  <img
                    src={product?.imageUrl || "/placeholder.png"}
                    alt={product?.name || "Product Image"}
                    className="h-full object-contain"
                  />
                </div>

            
              </div>
              {product.images?.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-square relative rounded-xl border border-gray-200 overflow-hidden"
                    >
                      <Image
                        src={img}
                        alt={`${product.name}-${idx}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 25vw, 12vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h1 className="text-4xl font-bold text-gray-800">
                    {product.name}
                  </h1>
                  <div className="flex gap-3">
                    <form action="/api/wishlist" method="POST">
                      <input
                        type="hidden"
                        name="productId"
                        value={product.id}
                      />
                      <button
                        type="submit"
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <Heart className="w-6 h-6 text-gray-600" />
                      </button>
                    </form>
                  </div>
                </div>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center mb-6 bg-gray-50 p-4 rounded-xl">
                    <div className="flex text-yellow-400 mr-3">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? "fill-current"
                              : "fill-none stroke-current"
                          }`}
                        />
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {product.rating} de 5
                      </p>
                      <p className="text-xs text-gray-500">
                        Basado en {product.reviewsCount} reseñas
                      </p>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="prose prose-purple max-w-none mb-8">
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price and Actions */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-4xl font-bold text-purple-600">
                      ${product.price}
                    </span>
                    {product.oldPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        ${product.oldPrice}
                      </span>
                    )}
                  </div>

                  {/* Purchase Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="hidden"
                        name="productId"
                        value={product.id}
                      />
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors inline-flex items-center justify-center shadow-lg shadow-purple-100"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Agregar al Carrito
                      </button>
                    </div>
                    <Link
                      href="/cart"
                      className="flex-1 px-8 py-4 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 rounded-xl font-medium transition-colors inline-flex items-center justify-center"
                    >
                      Comprar Ahora
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Link>
                  </div>
                </div>

                {/* Shipping and Warranty */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
                    <Truck className="w-8 h-8 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-700">Envío Gratis</p>
                      <p className="text-sm text-gray-500">2-3 días hábiles</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
                    <Shield className="w-8 h-8 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-700">Garantía</p>
                      <p className="text-sm text-gray-500">12 meses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specs */}
        {product.specs && (
          <section className="container mx-auto px-4 py-12 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Especificaciones Técnicas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Object.entries(product.specs).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">
                    {key}
                  </h3>
                  <p className="text-gray-800 font-medium">{value}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
