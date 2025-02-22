import React, { useState, useEffect } from "react";
import { User, Camera, Bell, Shield, ChevronRight } from "lucide-react";

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  async function handleChangePassword() {
    // Basic validations
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("La nueva contraseña y su confirmación no coinciden.");
      return;
    }
  
    try {
      // Assuming you have the user's ID in localStorage or from your user state
      const adminUser = localStorage.getItem("adminUser");
      if (!adminUser) {
        alert("No se encontró usuario. Inicia sesión nuevamente.");
        return;
      }
      const userData = JSON.parse(adminUser);
  
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: userData.id,      // or userData.userId, depending on your object
          currentPassword,
          newPassword
        })
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al cambiar contraseña");
      }
      alert("¡Contraseña actualizada exitosamente!");
      // Optionally, reset form fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      alert(err.message);
      console.error("Error updating password:", err);
    }
  }
  

  useEffect(() => {
    const adminUser = localStorage.getItem("adminUser");
    if (adminUser) {
      setUser(JSON.parse(adminUser));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Configuración de la Cuenta
        </h1>
        <p className="text-gray-600">
          Administra tu información personal y preferencias
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {[
              { id: "profile", icon: User, label: "Perfil" },
              { id: "security", icon: Shield, label: "Seguridad" },
              { id: "notifications", icon: Bell, label: "Notificaciones" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-purple-50 text-purple-700 border-l-4 border-purple-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 mr-3 ${
                    activeTab === item.id ? "text-purple-700" : "text-gray-400"
                  }`}
                />
                {item.label}
                <ChevronRight
                  className={`ml-auto h-4 w-4 ${
                    activeTab === item.id ? "text-purple-700" : "text-gray-400"
                  }`}
                />
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-8">
              {/* Profile Photo */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center">
                    <User className="h-12 w-12 text-purple-600" />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <Camera className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Foto de Perfil
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    JPG o PNG. Máximo 1MB
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={user?.name || ""}
                    onChange={handleInputChange}
                    className="text-gray-600 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user?.email || ""}
                    onChange={handleInputChange}
                    className="text-gray-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                    placeholder="tu@email.com"
                  />
                </div>

                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center">
                  Guardar Cambios
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Cambiar Contraseña
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contraseña Actual
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmar Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <button
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center"
                  onClick={handleChangePassword}
                >
                  Actualizar Contraseña
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-8">
              <h3 className="text-lg font-medium text-gray-900">
                Preferencias de Notificación
              </h3>
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.notifications.email}
                    onChange={() => {}}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    Notificaciones por correo
                  </span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.notifications.push}
                    onChange={() => {}}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    Notificaciones push
                  </span>
                </label>
              </div>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center">
                Guardar Preferencias
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
