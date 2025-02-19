'use client';

import { MonitorSmartphone, Shield, Cpu } from 'lucide-react';

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

export default FeaturesSection;
