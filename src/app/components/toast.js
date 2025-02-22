import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const borderColor = type === 'success' ? 'border-green-200' : 'border-red-200';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const Icon = type === 'success' ? CheckCircle : XCircle;

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center z-50 p-4 pointer-events-none">
      <div 
        className={`
          ${bgColor} 
          ${borderColor} 
          ${textColor} 
          border 
          rounded-xl 
          p-4 
          shadow-lg 
          animate-slide-up 
          w-full 
          max-w-md 
          flex 
          items-center 
          gap-3
          pointer-events-auto
          mb-safe
        `}
      >
        <div className="flex-shrink-0">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium break-words">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 transition-colors p-1"
          aria-label="Cerrar notificación"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Toast;