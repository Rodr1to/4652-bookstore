// src/components/Header.tsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext'; // <-- AÑADE ESTA LÍNEA

const Header: React.FC = () => {
  const { totalItems } = useCarrito(); // <-- Obtenemos el total de items
  const activeLinkStyle = { color: '#0d4a3a', fontWeight: '700' };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 font-jakarta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <NavLink to="/" className="flex items-center gap-3 cursor-pointer">
            {/* ... logo y texto ... */}
          </NavLink>

          <nav className="hidden md:flex space-x-8 items-center">
            {/* ... otros NavLink ... */}
            
            {/* ÍCONO DEL CARRITO */}
            <NavLink to="/carrito" className="relative text-gray-600 hover:text-brand-green transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </NavLink>
          </nav>

          <div>
            <button className="bg-brand-dark text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300">
              Únete ahora
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;