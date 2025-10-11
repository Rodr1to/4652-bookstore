// src/pages/CarritoPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

const API_BASE_URL = 'https://rovalverde.alwaysdata.net/';

const CarritoPage: React.FC = () => {
  const { items, eliminarDelCarrito, vaciarCarrito, totalPrecio } = useCarrito();

  return (
    <div className="bg-brand-light-gray font-jakarta min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-brand-dark mb-8">Mi Carrito de Compras</h1>

        {items.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-lg shadow-md">
            <p className="text-lg text-brand-gray mb-6">Tu carrito está vacío.</p>
            <Link to="/tienda" className="bg-brand-lime text-brand-dark font-bold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
              Ir a la tienda
            </Link>
          </div>
        ) : (
          <div>
            <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
              <ul className="divide-y divide-gray-200">
                {items.map(item => (
                  <li key={item.id} className="p-4 sm:p-6 flex items-start justify-between space-x-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.url_portada ? `${API_BASE_URL}${item.url_portada}` : 'https://placehold.co/100x150'}
                        alt={item.titulo}
                        className="w-20 h-28 object-cover rounded-md shadow-sm flex-shrink-0"
                      />
                      <div>
                        <h3 className="font-bold text-brand-dark">{item.titulo}</h3>
                        <p className="text-sm text-brand-gray">{item.autor}</p>
                        <p className="text-md font-bold text-brand-green mt-1">S/ {parseFloat(item.precio).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-brand-gray">Cantidad: <span className="font-bold">{item.cantidad}</span></p>
                      <p className="font-bold text-brand-dark mt-1">Subtotal: S/ {(parseFloat(item.precio) * item.cantidad).toFixed(2)}</p>
                      <button
                        onClick={() => eliminarDelCarrito(item.id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 group transition-transform duration-300 mt-2"
                        title="Eliminar item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Sección de Totales y Vaciar Carrito */}
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={vaciarCarrito}
                className="bg-red-600 text-white font-bold py-2 px-5 rounded-lg shadow-md hover:bg-red-700 transition-colors"
              >
                Vaciar Carrito
              </button>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-brand-dark">
                  Total: S/ {totalPrecio.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarritoPage;