import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { LibroAPI } from '../types/Estructuras';

interface ApiResponse {
  total_filas: number;
  libros: LibroAPI[];
}

const CatalogoPage: React.FC = () => {
  const [libros, setLibros] = useState<LibroAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [numeroPagina, setNumeroPagina] = useState(1);
  const [filasPagina] = useState(10); 
  const [totalPaginas, setTotalPaginas] = useState(0);

  const [sortConfig, setSortConfig] = useState({
    columna: 'titulo',
    orden: 'ASC'
  });

  const leerServicio = async (pagina: number, columna: string, orden: string) => {
    setLoading(true);
    setError(null);
    try {
      // URL de Node.js
      const url = `http://rodvalverde.alwaysdata.net/api/libros?filas_pagina=${filasPagina}&numero_pagina=${pagina}&columna=${columna}&orden=${orden}`;
      
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

  useEffect(() => {
    leerServicio(numeroPagina, sortConfig.columna, sortConfig.orden);
  }, [numeroPagina, sortConfig]);

  const handleSort = (columna: string) => {
    let nuevoOrden = 'ASC';
    if (columna === sortConfig.columna && sortConfig.orden === 'ASC') {
      nuevoOrden = 'DESC';
    }
    setSortConfig({ columna, orden: nuevoOrden });
    setNumeroPagina(1); 
  };

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

  const getSortIcon = (columna: string) => {
    if (sortConfig.columna !== columna) {
        return null;
    }
    if (sortConfig.orden === 'ASC') {
        return <span className="ml-1">▲</span>;
    }
    return <span className="ml-1">▼</span>;
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

            <h1 className="text-4xl font-extrabold text-brand-dark mb-8">Catálogo de libros</h1>
            
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

                {!loading && !error && (
                  <div className="flex justify-center items-center gap-2 p-4 border-t border-gray-200 flex-wrap">
                      <button 
                        onClick={paginaAnterior} 
                        disabled={numeroPagina === 1}
                        className="bg-brand-dark text-white font-bold py-2 px-4 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition"
                      >
                          Anterior
                      </button>

                      <div className="flex gap-1 mx-2 overflow-x-auto">
                        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
                          <button
                            key={pagina}
                            onClick={() => setNumeroPagina(pagina)}
                            className={`w-10 h-10 rounded-lg font-bold transition-colors flex items-center justify-center ${
                              numeroPagina === pagina
                                ? 'bg-brand-green text-white shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {pagina}
                          </button>
                        ))}
                      </div>

                      <button 
                        onClick={paginaSiguiente} 
                        disabled={numeroPagina === totalPaginas}
                        className="bg-brand-dark text-white font-bold py-2 px-4 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition"
                      >
                          Siguiente
                      </button>
                      <div className="w-full text-center mt-2 text-sm text-brand-gray sm:hidden">
                          Página <strong>{numeroPagina}</strong> de <strong>{totalPaginas}</strong>
                      </div>
                  </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default CatalogoPage;