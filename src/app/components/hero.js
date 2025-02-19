'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="pt-16 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl text-gray-600 font-bold leading-tight mb-6">
              Transforma tu
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {' '}Experiencia Digital
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Descubre productos tecnológicos de primera calidad que combinan
              innovación con elegancia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/productos"
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors inline-flex items-center justify-center"
              >
                Explorar Productos
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/nosotros"
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
                src="/appleiphone.png"
                alt="Producto Destacado"
                className="relative w-full max-w-lg mx-auto rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
