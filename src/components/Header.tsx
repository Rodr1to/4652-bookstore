import React from 'react';

interface HeaderProps {
  setPage: (page: 'home' | 'catalogo') => void;
}

const Header: React.FC<HeaderProps> = ({ setPage }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 font-jakarta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div
            className="text-2xl font-bold text-custom-dark-blue cursor-pointer"
            onClick={() => setPage('home')}
          >
            Bookstore<span className="text-custom-purple">Club</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" onClick={(e) => { e.preventDefault(); setPage('home'); }} className="text-gray-600 hover:text-custom-purple transition-colors duration-300 font-semibold">Inicio</a>
            <a href="#" className="text-gray-600 hover:text-custom-purple transition-colors duration-300 font-semibold">Cursos</a>
            <a href="#" className="text-gray-600 hover:text-custom-purple transition-colors duration-300 font-semibold">Instructores</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setPage('catalogo'); }} className="text-gray-600 hover:text-custom-purple transition-colors duration-300 font-semibold">Nuestro Catálogo</a>
          </nav>
          <div>
            <button className="bg-custom-purple text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300">
              Únete ahora
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;