// app/products/[id]/page.js

"use client";

import React from "react";
import { Star, ShoppingCart, ChevronRight } from "lucide-react";
import Link from "next/link";


// 1. Define simple header & footer inline:
function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      {" "}
      <div className="container mx-auto px-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            >
              Tienda Virtual
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {["Inicio", "Productos", "Nosotros", "Contactanos"].map(
                (item) => (
                  <Link
                    key={item}
                    href={item === "Inicio" ? "/" : `/${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
                  >
                    {item}
                  </Link>
                )
              )}
            </nav>

            <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-gray-600" />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 py-12">
        <div className="border-t border-gray-800 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Tienda Virtual. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

// 2. Fetch your product data:
async function getProductData(id) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetailPage({ params }) {
  const product = await getProductData(params.id);

  // If product not found, show a simple message:
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <p className="text-gray-600">No se encontró el producto.</p>
        </main>
        <Footer />
      </div>
    );
  }

  // Otherwise, render the product detail:
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4 text-sm text-gray-600">
          <Link href="/" className="hover:text-purple-600">
            Inicio
          </Link>
          {" / "}
          <Link href="/products" className="hover:text-purple-600">
            Productos
          </Link>
          {" / "}
          <span className="text-gray-400">{product.name}</span>
        </div>

        {/* Product Details */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Images */}
            <div className="md:w-1/2 flex flex-col gap-4">
              <div className="relative w-full overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
              {product.images && product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="w-20 h-20 rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:opacity-80"
                    >
                      <img
                        src={img}
                        alt={`${product.name}-${idx}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold text-gray-700 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400 mr-2">
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
                  <p className="text-sm text-gray-500">
                    {product.rating} de 5 ({product.reviewsCount} reseñas)
                  </p>
                </div>
              )}

              <p className="text-gray-600 text-lg mb-6">
                {product.description}
              </p>

              <div className="mb-6">
                <span className="text-3xl font-bold text-purple-600">
                  ${product.price}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors inline-flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Agregar al Carrito
                </button>
                <Link
                  href="/cart"
                  className="px-8 py-3 border border-purple-600 text-purple-600 hover:bg-purple-50 rounded-full font-medium transition-colors inline-flex items-center justify-center"
                >
                  Comprar Ahora
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Specs */}
        {product.specs && (
          <section className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">
              Especificaciones
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-white rounded-xl p-6 shadow border border-gray-100">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="text-center">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase mb-1">
                    {key}
                  </h3>
                  <p className="text-gray-600">{value}</p>
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
