// src/components/Header.tsx

import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { totalItems } = useCarrito();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú desplegable

  const activeLinkStyle = { color: '#0d4a3a', fontWeight: '700' };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 font-jakarta relative"> {/* relative añadido para el posicionamiento del menú */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <NavLink to="/" className="flex items-center gap-3 cursor-pointer">
            <img src="https://i.ibb.co/v67Bp4ZZ/tintaypapel-logo-jpg.png" alt="Logo" className="h-12" />
            <span className="text-2xl font-bold text-brand-dark hidden sm:block">
              Tinta y Papel <span className="text-brand-green">Store</span>
            </span>
          </NavLink>

          <div className="flex items-center gap-8">
            <nav className="hidden md:flex space-x-8 items-center">
              <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-brand-green transition-colors font-semibold">
                Inicio
              </NavLink>
              <NavLink to="/tienda" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-brand-green transition-colors font-semibold">
                Tienda
              </NavLink>
              
              {/* Si está logueado, mostramos el enlace directo al Admin */}
              {isAuthenticated ? (
                  <NavLink to="/admin" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-brand-lime font-bold hover:text-brand-green transition-colors duration-300">
                    Administrar
                  </NavLink>
              ) : (
                  <NavLink to="/catalogo" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-brand-green transition-colors font-semibold">
                    Catálogo
                  </NavLink>
              )}

              <NavLink to="/carrito" className="relative text-gray-600 hover:text-brand-green transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</span>
                )}
              </NavLink>
            </nav>

            <div>
                {isAuthenticated ? (
                    <div className="relative">
                        {/* Botón del usuario con menú desplegable */}
                        <button 
                            onClick={toggleMenu}
                            className="flex items-center gap-2 text-brand-dark font-bold border-l-2 border-gray-300 pl-4 ml-2 hover:text-brand-green focus:outline-none"
                        >
                            Hola, {user?.nombres}
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Menú desplegable */}
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                                <Link 
                                    to="/admin" 
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Administrar
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <NavLink to="/login" className="bg-brand-dark text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300">
                        Iniciar Sesión
                    </NavLink>
                )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;