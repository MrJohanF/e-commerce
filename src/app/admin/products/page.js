"use client";

import React, { useState } from "react";
import {
  Package,
  DollarSign,
  Tag,
  ImagePlus,
  Smartphone,
  Laptop,
  Save,
  Loader2,
  X,
  Plus,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

const AddProductDashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "smartphone",
    price: "",
    stock: "",
    description: "",
    specifications: [],
    brand: "",
    model: "",
    color: "",
    warranty: "",
    imageUrl: "",
    features: [""],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { key: "", value: "" }],
    }));
  };

  const removeSpecification = (index) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }));
  };

  const updateSpecification = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.map((spec, i) =>
        i === index ? { ...spec, [field]: value } : spec
      ),
    }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const updateFeature = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) =>
        i === index ? value : feature
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    setIsSubmitted(true);
  
    try {
      if (Number(formData.price) <= 0) {
        throw new Error("El precio debe ser mayor a 0");
      }
      
      // Llamada real al endpoint de creación de producto
      const response = await fetch("/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al crear el producto");
      }
      
      const data = await response.json();
      setSuccess("¡Producto agregado exitosamente!");
      
      // Reinicia el formulario
      setFormData({
        name: "",
        category: "smartphone",
        price: "",
        stock: "",
        description: "",
        specifications: [],
        brand: "",
        model: "",
        color: "",
        warranty: "",
        imageUrl: "",
        features: [""],
      });
      setIsSubmitted(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with animation */}
        <div className="mb-8 transform transition-all duration-500 hover:scale-102">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
            Nuevo Producto
          </h1>

          <p className="text-gray-600 mt-2 text-lg">
            Sistema de Gestión de Inventario
          </p>
        </div>

        {/* Main Form Container */}
        <div
          className={`bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden
          transform transition-all duration-500 hover:shadow-2xl`}
        >
          {/* Status Messages */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6 rounded-lg animate-slideIn">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 m-6 rounded-lg animate-slideIn">
              <p className="text-green-700">{success}</p>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto scrollbar-hide border-b bg-gray-50/30">
            {["basic", "details", "media"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center px-6 py-4 text-sm font-medium transition-all duration-300
                  ${
                    activeTab === tab
                      ? "text-purple-600 border-b-2 border-purple-500 bg-white"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                {tab === "basic" && (
                  <>
                    <Package className="h-4 w-4 mr-2" />
                    Información Básica
                  </>
                )}
                {tab === "details" && (
                  <>
                    <Tag className="h-4 w-4 mr-2" />
                    Detalles Técnicos
                  </>
                )}
                {tab === "media" && (
                  <>
                    <ImagePlus className="h-4 w-4 mr-2" />
                    Multimedia
                  </>
                )}
                <ChevronRight
                  className={`h-4 w-4 ml-2 transition-transform duration-300
                  ${activeTab === tab ? "rotate-90" : ""}`}
                />
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Basic Info Tab */}
            <div
              className={`space-y-6 transition-all duration-500 transform
              ${
                activeTab === "basic"
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0 hidden"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Product Name Input */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Producto
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border border-gray-300 
                      focus:ring-2 focus:ring-purple-500 focus:border-transparent
                      transition-all duration-300 hover:border-purple-300
                      placeholder-gray-400 text-gray-900`}
                    placeholder="iPhone 14 Pro Max"
                  />
                </div>

                {/* Category Select */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`text-gray-700 w-full px-4 py-3 rounded-xl border border-gray-300
                      focus:ring-2 focus:ring-purple-500 focus:border-transparent
                      transition-all duration-300 hover:border-purple-300
                      appearance-none bg-white`}
                  >
                    <option value="smartphone">Smartphone</option>
                    <option value="laptop">Laptop</option>
                  </select>
                  <div
                    className={`absolute right-3 top-[41px] pointer-events-none
                    transform group-hover:translate-x-1 transition-transform duration-300`}
                  >
                    {formData.category === "smartphone" ? (
                      <Smartphone className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Laptop className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Price Input */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio
                  </label>
                  <div className="relative">
                    <div
                      className={`absolute left-3 top-1/2 -translate-y-1/2
                      group-hover:text-purple-500 transition-colors duration-300`}
                    >
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className={`text-gray-700 w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300
                        focus:ring-2 focus:ring-purple-500 focus:border-transparent
                        transition-all duration-300 hover:border-purple-300`}
                      placeholder="999.99"
                    />
                  </div>
                </div>

                {/* Stock Input */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    className={`text-gray-700 w-full px-4 py-3 rounded-xl border border-gray-300
                      focus:ring-2 focus:ring-purple-500 focus:border-transparent
                      transition-all duration-300 hover:border-purple-300`}
                    placeholder="50"
                  />
                </div>

                {/* Description Textarea */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className={`text-gray-700 w-full px-4 py-3 rounded-xl border border-gray-300
                      focus:ring-2 focus:ring-purple-500 focus:border-transparent
                      transition-all duration-300 hover:border-purple-300
                      resize-none`}
                    placeholder="Describe el producto..."
                  />
                </div>
              </div>
            </div>

            {/* Details Tab */}
            <div
              className={`space-y-6 transition-all duration-500 transform
              ${
                activeTab === "details"
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0 hidden"
              }`}
            >
              {/* Specifications */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-lg font-medium text-gray-900">
                    Especificaciones Técnicas
                  </label>
                  <button
                    type="button"
                    onClick={addSpecification}
                    className={`inline-flex items-center px-4 py-2 rounded-xl
                      bg-purple-50 text-purple-600 hover:bg-purple-100
                      transition-all duration-300 transform hover:scale-105`}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar
                  </button>
                </div>

                {formData.specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-start animate-slideIn"
                  >
                    <input
                      type="text"
                      value={spec.key}
                      onChange={(e) =>
                        updateSpecification(index, "key", e.target.value)
                      }
                      placeholder="Característica"
                      className={`flex-1 px-4 py-3 rounded-xl border border-gray-300
                        focus:ring-2 focus:ring-purple-500 focus:border-transparent
                        transition-all duration-300 hover:border-purple-300`}
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) =>
                        updateSpecification(index, "value", e.target.value)
                      }
                      placeholder="Valor"
                      className={`flex-1 px-4 py-3 rounded-xl border border-gray-300
                        focus:ring-2 focus:ring-purple-500 focus:border-transparent
                        transition-all duration-300 hover:border-purple-300`}
                    />
                    <button
                      type="button"
                      onClick={() => removeSpecification(index)}
                      className={`p-3 text-gray-400 hover:text-red-500 rounded-xl
                        hover:bg-red-50 transition-all duration-300`}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Tab */}
            <div
              className={`space-y-6 transition-all duration-500 transform
              ${
                activeTab === "media"
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0 hidden"
              }`}
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL de la Imagen
                  </label>
                  <div className="relative group">
                    <input
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border border-gray-300
                        focus:ring-2 focus:ring-purple-500 focus:border-transparent
                        transition-all duration-300 hover:border-purple-300`}
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </div>
                </div>

                {formData.imageUrl && (
                  <div className="mt-4 animate-fadeIn">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Vista Previa:
                    </p>
                    <div
                      className={`relative w-full h-64 bg-gray-50 rounded-xl overflow-hidden
                      border-2 border-dashed border-gray-200`}
                    >
<img
  src={formData.imageUrl}
  alt="Product preview"
  className="w-full h-full object-contain transform transition-all duration-500 hover:scale-105"
/>

                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="sticky bottom-0 pt-6 mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center gap-2 py-4 px-6 
                  rounded-xl text-white font-medium
                  transition-all duration-500 transform hover:scale-102
                  ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  }
                  ${isSubmitted ? "animate-bounce" : ""}`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    <span>Guardar Producto</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Add custom styles for animations */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Add smooth transitions for tab panels */
        .tab-panel-enter {
          opacity: 0;
          transform: translateX(20px);
        }

        .tab-panel-enter-active {
          opacity: 1;
          transform: translateX(0);
          transition: opacity 300ms, transform 300ms;
        }

        .tab-panel-exit {
          opacity: 1;
          transform: translateX(0);
        }

        .tab-panel-exit-active {
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 300ms, transform 300ms;
        }
      `}</style>
    </div>
  );
};

export default AddProductDashboard;
