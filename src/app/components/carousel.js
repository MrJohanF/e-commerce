import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  ChevronRight,
} from "lucide-react";


const ProductCarousel = () => {
    const [activeSlide, setActiveSlide] = React.useState(0);
    const [products, setProducts] = useState([]);
  
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
  
    const nextSlide = () => {
      setActiveSlide((prev) => (prev + 1) % products.length);
    };
  
    const prevSlide = () => {
      setActiveSlide((prev) => (prev - 1 + products.length) % products.length);
    };
  
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-gray-500 text-3xl font-bold text-center mb-16">
            Productos Destacados  
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
                          <div className="aspect-square bg-white rounded-xl flex items-center justify-center p-8">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        </div>
                        <div className="w-full md:w-1/2 text-center md:text-left">
                          <div className="mb-4">
                            <h3 className="text-gray-600 text-2xl font-bold mb-2">
                              {product.name}
                            </h3>
                            <p className="text-gray-600 mb-4">
                              {product.description}
                            </p>
                            <p className="text-3xl font-bold text-purple-600 mb-6">
                              $ {product.price}
                            </p>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            {/* Link to the dedicated product detail page */}
                            <Link
                              href={`/productos/${product.id}`}
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

  export default ProductCarousel;