"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  Camera,
  DollarSign,
  Package,
  Tag,
  Layers
} from "lucide-react";

const EditProductPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("basic");

  // Fetch product details on mount
  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          throw new Error("Error obteniendo datos del producto");
        }
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const processedValue = type === 'number' ? parseFloat(value) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error actualizando el producto");
      }
      setSuccess("¡Producto actualizado exitosamente!");
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-center p-8 max-w-md w-full bg-white rounded-xl shadow-lg border border-purple-100 transform transition-all duration-300 hover:shadow-xl">
          <div className="flex justify-center mb-6">
            <Loader2 className="h-12 w-12 text-purple-600 animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Cargando producto</h2>
          <p className="text-gray-600">Obteniendo información del producto...</p>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-center p-8 max-w-md w-full bg-white rounded-xl shadow-lg border border-purple-100">
          <div className="flex justify-center mb-6">
            <AlertCircle className="h-16 w-16 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Producto no encontrado</h2>
          <p className="text-gray-600 mb-8">No pudimos encontrar el producto que estás buscando.</p>
          <Link 
            href="/admin/dashboard" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Editar Producto
          </h1>
          <Link 
            href="/admin/dashboard" 
            className="flex items-center gap-2 px-4 py-2 text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Volver al Dashboard</span>
          </Link>
        </div>

        {/* Content Card with Tabs */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
          {error && (
            <div className="mx-6 mt-6 flex items-center gap-3 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-fadeIn">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="mx-6 mt-6 flex items-center gap-3 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg animate-fadeIn">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <p className="text-green-700">{success}</p>
            </div>
          )}

          {/* Navigation Tabs: Basic & Media */}
          <div className="flex overflow-x-auto border-b bg-gray-50/50 mt-4">
            {[
              { id: "basic", label: "Información Básica", icon: Package },
              { id: "media", label: "Multimedia", icon: Camera }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "text-purple-600 border-b-2 border-purple-500 bg-white"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? "text-purple-600" : "text-gray-400"}`} />
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Basic Tab */}
            {activeTab === "basic" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Producto
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Tag className="h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-300" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name || ""}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                        placeholder="Ej: Smartphone Galaxy S21"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Layers className="h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-300" />
                      </div>
                      <select
                        name="category"
                        value={formData.category || ""}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 appearance-none bg-white"
                      >
                        <option value="">Seleccionar categoría</option>
                        <option value="smartphone">Smartphone</option>
                        <option value="laptop">Laptop</option>
                        <option value="tablet">Tablet</option>
                        <option value="accessories">Accesorios</option>
                        <option value="audio">Audio</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio (MXN)
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-300" />
                      </div>
                      <input
                        type="number"
                        name="price"
                        value={formData.price || 0}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inventario
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Package className="h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-300" />
                      </div>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock || 0}
                        onChange={handleChange}
                        required
                        min="0"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción del Producto
                  </label>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 resize-none"
                    placeholder="Describe detalladamente el producto..."
                  />
                </div>
              </div>
            )}

            {/* Media Tab */}
            {activeTab === "media" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL de la Imagen
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Camera className="h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-300" />
                    </div>
                    <input
                      type="url"
                      name="imageUrl"
                      id="imageUrlInput"
                      value={formData.imageUrl || ""}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </div>
                </div>

                {formData.imageUrl && (
                  <div className="mt-4 animate-fadeIn">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Vista Previa:
                    </p>
                    <div className="group relative w-full h-72 bg-gray-50 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center">
                      <img
                        src={formData.imageUrl}
                        alt="Product preview"
                        className="w-full h-full object-contain transform transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          type="button"
                          className="bg-white text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors duration-300 transform hover:scale-105"
                          onClick={() => document.getElementById('imageUrlInput').focus()}
                        >
                          Cambiar Imagen
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200">
              <Link 
                href="/admin/dashboard"
                className="inline-flex items-center px-5 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Cancelar
              </Link>
              
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Guardar Cambios
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default EditProductPage;
