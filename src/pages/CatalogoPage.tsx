// src/pages/CatalogoPage.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { LibroAPI } from '../types/Estructuras';

// Interfaz para la respuesta completa de la API
interface ApiResponse {
  total_filas: number;
  libros: LibroAPI[];
}

const CatalogoPage: React.FC = () => {
  const [libros, setLibros] = useState<LibroAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Estados para Paginación ---
  const [numeroPagina, setNumeroPagina] = useState(1);
  const [filasPagina] = useState(10); // Puedes cambiar esto (ej. 5)
  const [totalPaginas, setTotalPaginas] = useState(0);

  // --- Estados para Ordenamiento ---
  const [sortConfig, setSortConfig] = useState({
    columna: 'titulo',
    orden: 'ASC'
  });

  // --- Función para leer el servicio web (ahora es dinámica) ---
  const leerServicio = async (pagina: number, columna: string, orden: string) => {
    setLoading(true);
    setError(null);
    try {
      const url = `/api/libros_paginado.php?filas_pagina=${filasPagina}&numero_pagina=${pagina}&columna=${columna}&orden=${orden}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
      }
      
      const data: ApiResponse = await response.json();
      
      if (data.libros) {
        setLibros(data.libros);
        setTotalPaginas(Math.ceil(data.total_filas / filasPagina));
      } else {
        throw new Error("Formato de respuesta incorrecto de la API.");
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
    } finally {
      setLoading(false);
    }
  };

  // --- useEffect se activa al cambiar página u ordenamiento ---
  useEffect(() => {
    leerServicio(numeroPagina, sortConfig.columna, sortConfig.orden);
  }, [numeroPagina, sortConfig]); // Depende de la página y el orden

  // --- Manejador para cambiar el orden ---
  const handleSort = (columna: string) => {
    let nuevoOrden = 'ASC';
    if (columna === sortConfig.columna && sortConfig.orden === 'ASC') {
      nuevoOrden = 'DESC';
    }
    setSortConfig({ columna, orden: nuevoOrden });
    setNumeroPagina(1); // Reiniciar a la página 1 al reordenar
  };

  // --- Manejadores para la paginación ---
  const paginaSiguiente = () => {
    if (numeroPagina < totalPaginas) {
      setNumeroPagina(numeroPagina + 1);
    }
  };

  const paginaAnterior = () => {
    if (numeroPagina > 1) {
      setNumeroPagina(numeroPagina - 1);
    }
  };

  // --- Función para renderizar el ícono de orden ---
  const getSortIcon = (columna: string) => {
    if (sortConfig.columna !== columna) return "<span></span>"; // Sin icono
    if (sortConfig.orden === 'ASC') return <span className="ml-1">▲</span>; // Flecha arriba
    return <span className="ml-1">▼</span>; // Flecha abajo
  };

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

            <h1 className="text-4xl font-extrabold text-brand-dark mb-8">Catálogo Completo (Paginado)</h1>
            
            <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
                {error && <p className="p-6 text-center text-red-500 font-semibold">{`Error al cargar los datos: ${error}`}</p>}
                
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-brand-light-gray border-b border-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-brand-dark uppercase tracking-wider cursor-pointer" onClick={() => handleSort('titulo')}>
                                  Título {getSortIcon('titulo')}
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-brand-dark uppercase tracking-wider cursor-pointer" onClick={() => handleSort('autor')}>
                                  Autor {getSortIcon('autor')}
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-brand-dark uppercase tracking-wider cursor-pointer" onClick={() => handleSort('editorial')}>
                                  Editorial {getSortIcon('editorial')}
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-brand-dark uppercase tracking-wider cursor-pointer" onClick={() => handleSort('fecha_publicacion')}>
                                  Fecha Pub. {getSortIcon('fecha_publicacion')}
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-brand-dark uppercase tracking-wider cursor-pointer" onClick={() => handleSort('precio')}>
                                  Precio {getSortIcon('precio')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                [...Array(filasPagina)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded"></div></td>
                                    </tr>
                                ))
                            ) : (
                                libros.map((libro) => (
                                    <tr key={libro.id} className="hover:bg-lime-50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{libro.titulo}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{libro.autor}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{libro.editorial}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{libro.fecha_publicacion}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-brand-green">S/ {parseFloat(libro.precio).toFixed(2)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* --- Controles de Paginación --- */}
                {!loading && !error && (
                  <div className="flex justify-between items-center p-4 border-t border-gray-200">
                      <button 
                        onClick={paginaAnterior} 
                        disabled={numeroPagina === 1}
                        className="bg-brand-dark text-white font-bold py-2 px-4 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                          Anterior
                      </button>
                      <span className="text-sm text-brand-gray">
                          Página <strong>{numeroPagina}</strong> de <strong>{totalPaginas}</strong>
                      </span>
                      <button 
                        onClick={paginaSiguiente} 
                        disabled={numeroPagina === totalPaginas}
                        className="bg-brand-dark text-white font-bold py-2 px-4 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                          Siguiente
                      </button>
                  </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default CatalogoPage;