import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const BackToHome = ({ className = '' }) => {
  return (
    <Link 
      href="/"
      className={`
        inline-flex items-center gap-1 sm:gap-2 
        px-2 sm:px-4 py-1.5 sm:py-2
        rounded-lg
        text-gray-600 hover:text-purple-600 
        bg-white hover:bg-gray-50
        shadow-sm hover:shadow
        transition-all duration-200
        text-xs sm:text-sm md:text-base
        ${className}
      `}
    >
      <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
      <span className="font-medium">Volver al inicio</span>
    </Link>
  );
};

export default BackToHome;