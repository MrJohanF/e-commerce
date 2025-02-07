import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Trophy, Clock, Building2, ChevronRight, Heart, Shield, Target } from 'lucide-react';
import Header from '../components/header';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-16 bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-gray-600 text-4xl md:text-6xl font-bold mb-6">
                Construyendo el
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Futuro Digital </span>
                Juntos
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Desde 2020, hemos estado transformando la manera en que las personas interactúan con la tecnología, ofreciendo productos innovadores y experiencias excepcionales.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '50K+', label: 'Clientes Satisfechos', icon: <Users className="w-8 h-8 text-purple-600" /> },
                { number: '200+', label: 'Productos', icon: <Trophy className="w-8 h-8 text-purple-600" /> },
                { number: '24/7', label: 'Soporte', icon: <Clock className="w-8 h-8 text-purple-600" /> },
                { number: '15+', label: 'Países', icon: <Building2 className="w-8 h-8 text-purple-600" /> }
              ].map((stat, index) => (
                <div key={index} className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-100 mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-3xl blur-3xl opacity-20"></div>
                <div className="relative aspect-square rounded-3xl overflow-hidden">
                  <Image
                    src="/about-mission.jpg"
                    alt="Nuestra Misión"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-gray-600 text-3xl font-bold mb-6">Nuestra Misión</h2>
                <p className="text-gray-600 mb-8">
                  Nuestra misión es proporcionar tecnología innovadora que mejore la vida cotidiana de las personas. Nos esforzamos por crear productos que no solo sean funcionales, sino que también sean intuitivos y accesibles para todos.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: <Heart className="w-6 h-6" />, title: 'Pasión por la Innovación', text: 'Constantemente buscamos nuevas formas de mejorar y evolucionar.' },
                    { icon: <Shield className="w-6 h-6" />, title: 'Compromiso con la Calidad', text: 'Cada producto cumple con los más altos estándares de calidad.' },
                    { icon: <Target className="w-6 h-6" />, title: 'Enfoque en el Cliente', text: 'Las necesidades de nuestros clientes guían cada decisión que tomamos.' }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                        <p className="text-gray-600">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-gray-600 text-3xl font-bold mb-4">Nuestro Equipo</h2>
              <p className="text-gray-600">
                Un grupo diverso de apasionados expertos trabajando juntos para crear experiencias tecnológicas excepcionales.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Ana García', role: 'CEO & Fundadora', image: '/team-1.jpg' },
                { name: 'Carlos Ruiz', role: 'Director de Tecnología', image: '/team-2.jpg' },
                { name: 'Laura Torres', role: 'Directora de Diseño', image: '/team-3.jpg' }
              ].map((member, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 text-center group hover:bg-white hover:shadow-xl transition-all">
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-600 mb-4">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-purple-900 to-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Únete a Nuestra Historia</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Estamos siempre buscando personas talentosas y apasionadas para unirse a nuestro equipo. Descubre las oportunidades disponibles.
            </p>
            <Link
              href="/careers"
              className="inline-flex items-center px-8 py-3 bg-white text-purple-900 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Ver Oportunidades
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
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