"use client";

import React from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ArrowRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Header from '../components/header';

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section with Floating Cards */}
        <section className="relative pt-16 bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <h1 className="text-gray-600 text-4xl md:text-6xl font-bold mb-6">
                ¿Necesitas
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Ayuda</span>?
              </h1>
              <p className="text-xl text-gray-600">
                Estamos aquí para responder tus preguntas y ayudarte en cada paso
              </p>
            </div>

            {/* Floating Contact Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto -mb-32 relative z-10">
              {[
                {
                  icon: <MessageCircle className="w-6 h-6" />,
                  title: "Chat en Vivo",
                  info: "Respuesta instantánea",
                  action: "Iniciar Chat",
                  gradient: "from-purple-500 to-purple-600"
                },
                {
                  icon: <Phone className="w-6 h-6" />,
                  title: "Llámanos",
                  info: "+57 (323) 684-4945",
                  action: "Llamar ahora",
                  gradient: "from-blue-500 to-blue-600"
                },
                {
                  icon: <Mail className="w-6 h-6" />,
                  title: "Email",
                  info: "soporte@tiendaucompensar.com",
                  action: "Enviar email",
                  gradient: "from-indigo-500 to-indigo-600"
                }
              ].map((item, index) => (
                <div key={index} 
                     className="bg-white rounded-2xl shadow-xl p-6 hover:transform hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white mb-4`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.info}</p>
                  <button className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
                    {item.action}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="bg-gray-100 pt-40 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Left Side - Contact Form */}
                <div className="p-8 md:p-12">
                  <h2 className="text-gray-600 text-3xl font-bold mb-8">Envíanos un mensaje</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Nombre</label>
                        <input
                          type="text"
                          className="text-gray-700 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                          placeholder="Tu nombre"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Apellido</label>
                        <input
                          type="text"
                          className="text-gray-700 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                          placeholder="Tu apellido"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        className="text-gray-700 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Asunto</label>
                      <select
                        className="text-gray-600 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                        required
                      >
                        <option value="">Selecciona un asunto</option>
                        <option value="soporte">Soporte Técnico</option>
                        <option value="ventas">Ventas</option>
                        <option value="facturacion">Facturación</option>
                        <option value="otros">Otros</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Mensaje</label>
                      <textarea
                        rows="4"
                        className="text-gray-700 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                        placeholder="¿En qué podemos ayudarte?"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 font-medium"
                    >
                      Enviar Mensaje
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>

                {/* Right Side - Info */}
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 md:p-12 text-white">
                  <h3 className="text-2xl font-bold mb-8">Información de Contacto</h3>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium mb-1">Ubicación</h4>
                        <p className="text-gray-100">
                          Calle Principal 123<br />
                          Bogota D.C, Colombia 12345
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock className="w-6 h-6 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium mb-1">Horario de Atención</h4>
                        <p className="text-gray-100">
                          Lunes - Viernes: 9:00 - 18:00<br />
                          Sábado: 10:00 - 14:00<br />
                          Domingo: Cerrado
                        </p>
                      </div>
                    </div>

                    <div className="h-px bg-white/20"></div>

                    <div>
                      <h4 className="font-medium mb-4">Síguenos</h4>
                      <div className="flex gap-4">
                        {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                          <a
                            key={social}
                            href={`#${social}`}
                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                          >
                            <span className="sr-only">{social}</span>
                            {
                              social === 'facebook' ? <Facebook className="w-5 h-5 text-white" /> :
                              social === 'twitter' ? <Twitter className="w-5 h-5 text-white" /> :
                              social === 'instagram' ? <Instagram className="w-5 h-5 text-white" /> :
                              social === 'linkedin' ? <Linkedin className="w-5 h-5 text-white" /> : <Mail className="w-5 h-5 text-white" />
                            }
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-12">
                    <img 
                      src="/api/placeholder/400/320"
                      alt="Contact illustration"
                      className="w-full h-48 object-cover rounded-xl opacity-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Preview Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-gray-600 text-3xl font-bold mb-4">Preguntas Frecuentes</h2>
              <p className="text-gray-600">
                Encuentra respuestas rápidas a las preguntas más comunes
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="mb-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-gray-400 text-lg font-medium">¿Pregunta frecuente #{item}?</h3>
                    <ArrowRight className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              ))}
              
              <div className="text-center mt-8">
                <button className="inline-flex items-center px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-xl hover:bg-purple-50 transition-colors font-medium">
                  Ver todas las preguntas
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4 py-12">
          <div className="border-t border-gray-800 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Tienda Virtual. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}