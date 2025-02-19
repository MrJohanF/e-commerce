import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const BackToHome = ({ className = '' }) => {
  return (
    <Link 
      href="/"
      className={`
        inline-flex items-center gap-2
        px-3 py-2
        rounded-full
        text-gray-700 hover:text-purple-600
        bg-white/80 hover:bg-white
        border border-gray-100 hover:border-purple-100
        backdrop-blur-sm
        shadow-sm hover:shadow-md
        transition-all duration-300 ease-in-out
        group
        text-sm font-medium
        ${className}
      `}
    >
      <ChevronLeft 
        className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" 
      />
      <span>Volver al inicio</span>
    </Link>
  );
};

export default BackToHome;