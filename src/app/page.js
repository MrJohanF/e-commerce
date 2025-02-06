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


const HeroSection = () => (
  <section className="pt-16 bg-gradient-to-br from-purple-50 via-white to-blue-50">
    <div className="container mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl text-gray-600 font-bold leading-tight mb-6">
            Transforma tu
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Experiencia Digital
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            Descubre productos tecnológicos de primera calidad que combinan
            innovación con elegancia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/products"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors inline-flex items-center justify-center"
            >
              Explorar Productos
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 border border-purple-600 text-purple-600 hover:bg-purple-50 rounded-full font-medium transition-colors inline-flex items-center justify-center"
            >
              Más Información
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full blur-3xl"></div>
            <img
              src="appleiphone.png"
              alt="Producto Destacado"
              className="relative w-full max-w-lg mx-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => {
  const features = [
    {
      title: "Integración inteligente",
      description:
        "Conecta sin problemas todos tus dispositivos en un ecosistema unificado",
      icon: <MonitorSmartphone className="w-8 h-8 text-purple-600" />,
    },
    {
      title: "Diseño Premium",
      description:
        "Fabricado por expertos con materiales de primera calidad y atención al detalle",
      icon: <Shield className="w-8 h-8 text-purple-600" />,
    },
    {
      title: "Rendimiento avanzado",
      description:
        "Potente tecnología que se adapta a sus necesidades y estilo de vida",
      icon: <Cpu className="w-8 h-8 text-purple-600" />,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl text-gray-400 font-bold mb-4">
            Por qué elegir Tienda Virtual
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experimente una tecnología diseñada para mejorar su vida con
            funciones innovadoras y una calidad inigualable.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white border border-gray-100 hover:border-purple-200 transition-all hover:shadow-lg group"
            >
              <div className="w-16 h-16 rounded-2xl bg-purple-100 p-3 mb-6 group-hover:scale-110 transition-transform flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl text-gray-400 font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
            placeholder="Enter your email"
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

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-semibold mb-4">Productos</h3>
          <ul className="space-y-2">
            {["Novedades", "Los más vendidos", "Destacados", "Accesorios"].map(
              (item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-purple-400 transition-colors">
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Empresa</h3>
          <ul className="space-y-2">
            {["Quiénes somos", "Carreras profesionales", "Press", "Socios"].map(
              (item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-purple-400 transition-colors">
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Soporte</h3>
          <ul className="space-y-2">
            {[
              "Centro de ayuda",
              "Contacto con nosotros",
              "Devoluciones",
              "Garantía",
            ].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-purple-400 transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            {[
              "Política de privacidad",
              "Condiciones de uso",
              "Política de cookies",
              "Conformidad",
            ].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-purple-400 transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-12 pt-8 text-center">
        <p>&copy; {new Date().getFullYear()} Tienda Virtual. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
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
