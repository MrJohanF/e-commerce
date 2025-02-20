"use cliente";

import { Mail } from "lucide-react";

const NewsletterSection = () => {
    
  return (
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
              placeholder="Introduzca su dirección de correo"
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
};


export default NewsletterSection;