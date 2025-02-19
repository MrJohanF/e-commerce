// pages/index.js

"use client"; // 1. Import the client-side runtime

import React from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Menu,
  X,
  ChevronRight,
  Mail,
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  MonitorSmartphone,
  Cpu,
  Shield,
  Zap,
} from "lucide-react";
import Header from "./components/header.js";
import HeroSection from "./components/hero.js";
import FeaturesSection from "./components/features.js";
import Footer from "./components/footer.js";


const ProductCarousel = () => {
  const [activeSlide, setActiveSlide] = React.useState(0);

  const products = [
    {
      id: 1,
      name: "Smart Watch Pro",
      price: "$299",
      description: "Advanced fitness tracking and health monitoring",
      icon: <Watch className="w-8 h-8" />,
    },
    {
      id: 2,
      name: "Ultra Book X1",
      price: "$1299",
      description: "Powerful laptop for professionals",
      icon: <Laptop className="w-8 h-8" />,
    },
    {
      id: 3,
      name: "Premium Headphones",
      price: "$199",
      description: "Immersive audio experience",
      icon: <Headphones className="w-8 h-8" />,
    },
    {
      id: 4,
      name: "Smart Phone 13",
      price: "$899",
      description: "Next-generation mobile technology",
      icon: <Smartphone className="w-8 h-8" />,
    },
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">
          Featured Products
        </h2>
        <div className="relative max-w-6xl mx-auto">
          {/* Carousel Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Content */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="w-full md:w-1/2">
                        <div className="aspect-square bg-purple-100 rounded-xl flex items-center justify-center p-8">
                          {product.icon}
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 text-center md:text-left">
                        <div className="mb-4">
                          <h3 className="text-2xl font-bold mb-2">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {product.description}
                          </p>
                          <p className="text-3xl font-bold text-purple-600 mb-6">
                            {product.price}
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                          {/* Link to the dedicated product detail page */}
                          <Link
                            href={`/products/${product.id}`}
                            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors inline-flex items-center justify-center"
                          >
                            Ver detalles
                          </Link>
                          <button className="px-8 py-3 border border-purple-600 text-purple-600 hover:bg-purple-50 rounded-full font-medium transition-colors inline-flex items-center justify-center">
                            Añadir al carrito
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 gap-3">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeSlide === index ? "bg-purple-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const NewsletterSection = () => (
  <section className="py-20 bg-gradient-to-br from-purple-900 to-blue-900">
    <div className="container mx-auto px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-block p-3 bg-white/10 rounded-full mb-8">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Adelántese a la curva
        </h2>
        <p className="text-gray-300 mb-8">
          Suscríbase a nuestro boletín para recibir ofertas exclusivas, acceso
          anticipado a nuevos productos y opiniones de expertos en tecnología.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Introduzca su dirección de correo"
            className="flex-1 max-w-sm px-6 py-3 rounded-full border-2 border-transparent focus:border-purple-400 focus:outline-none bg-white/10 text-white placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-white text-purple-900 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            Suscríbirse
          </button>
        </form>
      </div>
    </div>
  </section>
);



export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <ProductCarousel />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
