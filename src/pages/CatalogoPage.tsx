// src/pages/CatalogoPage.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { LibroAPI } from '../types/Estructuras';

const CatalogoPage: React.FC = () => {
  const [libros, setLibros] = useState<LibroAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const leerServicio = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/libros.php'); 
        if (!response.ok) {
          throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
        }
        const data = await response.json();
        setLibros(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
      } finally {
        setLoading(false);
      }
    };
    leerServicio();
  }, []);

  return (
    <div className="bg-white font-jakarta min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/" 
              className="mb-8 bg-white text-brand-dark font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-all flex items-center border border-gray-200 w-fit"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Volver al inicio
            </Link>

            <h1 className="text-4xl font-extrabold text-brand-dark mb-8">Catálogo Completo de Libros</h1>
            
            <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
                {loading ? (
                    <div className="animate-pulse">
                        <div className="bg-brand-light-gray h-12"></div>
                        <div className="p-4 space-y-4">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="h-8 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    </div>
                ) : error ? (
                    <p className="p-6 text-center text-red-500 font-semibold">{`Error al cargar los datos: ${error}`}</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-brand-light-gray border-b border-gray-200">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-brand-dark uppercase tracking-wider">Título</th>
                                    <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-brand-dark uppercase tracking-wider">Autor</th>
                                    <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-brand-dark uppercase tracking-wider">Editorial</th>
                                    <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-brand-dark uppercase tracking-wider">Fecha Pub.</th>
                                    <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-brand-dark uppercase tracking-wider">Precio</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {libros.map((libro) => (
                                    <tr key={libro.id} className="hover:bg-lime-50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{libro.titulo}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{libro.autor}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{libro.editorial}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{libro.fecha_publicacion}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-brand-green">S/ {libro.precio}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default CatalogoPage;