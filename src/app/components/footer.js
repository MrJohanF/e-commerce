'use client';

import Link from 'next/link';

const Footer = () => {
  const sections = [
    {
      title: 'Productos',
      links: ['Novedades', 'Los más vendidos', 'Destacados', 'Accesorios'],
    },
    {
      title: 'Empresa',
      links: ['Quiénes somos', 'Carreras profesionales', 'Press', 'Socios'],
    },
    {
      title: 'Soporte',
      links: ['Centro de ayuda', 'Contacto con nosotros', 'Devoluciones', 'Garantía'],
    },
    {
      title: 'Legal',
      links: ['Política de privacidad', 'Condiciones de uso', 'Política de cookies', 'Conformidad'],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="hover:text-purple-400 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Tienda Virtual. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
