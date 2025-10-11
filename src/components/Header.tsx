// src/components/Header.tsx

import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const activeLinkStyle = {
    color: '#0d4a3a', // Este es tu 'brand-green'
    fontWeight: '700',
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 font-jakarta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <NavLink to="/" className="flex items-center gap-3 cursor-pointer">
            <img src="https://i.ibb.co/v67Bp4ZZ/tintaypapel-logo-jpg.png" alt="Tinta y Papel Logo" className="h-12" />
            <span className="text-2xl font-bold text-brand-dark hidden sm:block">
              Tinta y Papel <span className="text-brand-green">Store</span>
            </span>
          </NavLink>

          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-brand-green transition-colors duration-300 font-semibold">
              Inicio
            </NavLink>
            <NavLink to="/tienda" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-brand-green transition-colors duration-300 font-semibold">
              Tienda
            </NavLink>
            <NavLink to="/catalogo" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-brand-green transition-colors duration-300 font-semibold">
              Catálogo Completo
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