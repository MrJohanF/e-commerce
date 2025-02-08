"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ChevronRight,
  MonitorSmartphone,
  Cpu,
  Award,
  Users,
} from "lucide-react";

const CareersManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [careers, setCareers] = useState([
    {
      id: 1,
      title: "Desarrollador Frontend Senior",
      department: "Ingeniería",
      location: "Remoto",
      type: "Tiempo Completo",
      experience: "3-5 años",
      status: "active",
      applications: 12,
      postedDate: "2024-02-01",
    },
    {
      id: 2,
      title: "AI/ML Ingeniero de Datos",
      department: "Data Science",
      location: "Hibrído",
      type: "Tiempo Completo",
      experience: "2-4 años",
      status: "active",
      applications: 8,
      postedDate: "2024-02-05",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Tiempo Completo",
    experience: "",
    description: "",
    requirements: "",
    benefits: "",
  });

  // Stats data
  const stats = [
    {
      icon: Briefcase,
      label: "Ofertas Activas",
      value: "8",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Users,
      label: "Aplicaciones",
      value: "45",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: Award,
      label: "Posiciones Cubiertas",
      value: "12",
      color: "bg-green-50 text-green-600",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCareers((prev) => [
      ...prev,
      {
        ...formData,
        id: prev.length + 1,
        status: "active",
        applications: 0,
        postedDate: new Date().toISOString().split("T")[0],
      },
    ]);
    setShowForm(false);
    setFormData({
      title: "",
      department: "",
      location: "",
      type: "Full-time",
      experience: "",
      description: "",
      requirements: "",
      benefits: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header with Stats */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Cpu className="h-8 w-8 mr-3 text-purple-600" />
                Centro de carreras tecnológicas
              </h1>
              <p className="text-gray-600">
                Gestiona las oportunidades en tecnología
              </p>
            </div>
            <button
              //onClick={handleNewPosition}
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nueva Posición
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showForm ? (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <MonitorSmartphone className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">
                Nueva Posición Tech
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título del Puesto
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
                    required
                    placeholder="ej. Senior Frontend Developer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departamento
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
                    required
                  >
                    <option value="">Seleccionar departamento</option>
                    <option value="Engineering">Ingeniería</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Product">Producto</option>
                    <option value="Design">Diseño UX/UI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experiencia Requerida
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Empleo
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
                    required
                  >
                    <option value="Full-time">Tiempo Completo</option>
                    <option value="Part-time">Medio Tiempo</option>
                    <option value="Contract">Contrato</option>
                    <option value="Internship">Pasantía</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción del Puesto
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Publicar Posición
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar posiciones tech..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
                  />
                </div>
                <select className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white">
                  <option value="">Todas las Áreas</option>
                  <option value="engineering">Desarrollo</option>
                  <option value="data">Data Science</option>
                  <option value="design">UX/UI</option>
                </select>
                <select className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white">
                  <option value="">Todos los Estados</option>
                  <option value="active">Activo</option>
                  <option value="closed">Cerrado</option>
                </select>
              </div>
            </div>

            {/* Job Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careers.map((career) => (
                <div
                  key={career.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {career.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {career.department}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        career.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {career.status === "active" ? "Activo" : "Cerrado"}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {career.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {career.type}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {career.applications} aplicaciones
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                      <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(career.postedDate).toLocaleDateString("en-US", {
                        month: "numeric",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CareersManagement;
