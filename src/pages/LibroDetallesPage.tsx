// src/pages/LibroDetallesPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { LibroAPI } from '../types/Estructuras'; // <-- CORREGIDO

const API_BASE_URL = 'https://rovalverde.alwaysdata.net/';

const LibroDetallesPage: React.FC = () => {
  const { idLibro } = useParams<{ idLibro: string }>();
  const [libro, setLibro] = useState<LibroAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLibroDetalles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/libro_detalle.php?id=${idLibro}`);
        const data = await response.json();
        if (data && !data.error && data.id) {
          setLibro(data);
        } else {
          throw new Error('Libro no encontrado');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
      } finally {
        setLoading(false);
      }
    };

    if (idLibro) {
      fetchLibroDetalles();
    }
  }, [idLibro]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-brand-gray animate-pulse">Cargando detalles del libro...</p>
      </div>
    );
  }

  if (error || !libro) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error al cargar el libro</h2>
        <p className="text-brand-gray mb-6">{error || 'El libro que buscas no existe.'}</p>
        <Link to="/tienda" className="text-brand-green font-bold hover:underline">
          &larr; Volver a la tienda
        </Link>
      </div>
    );
  }

  const imageUrl = libro.url_portada ? `${API_BASE_URL}${libro.url_portada}` : 'https://placehold.co/400x600/0d4a3a/c2e822?text=Portada';

  return (
    <div className="bg-white font-jakarta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/tienda" className="inline-flex items-center gap-2 text-brand-gray font-semibold hover:text-brand-dark transition-colors mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Volver a la tienda
        </Link>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <img src={imageUrl} alt={`Portada de ${libro.titulo}`} className="w-full rounded-lg shadow-2xl object-cover"/>
          </div>
          <div className="md:col-span-2">
            <h1 className="text-4xl font-extrabold text-brand-dark tracking-tight">{libro.titulo}</h1>
            <p className="text-xl text-brand-gray mt-2">por {libro.autor}</p>
            <p className="text-4xl font-bold text-brand-green my-6">S/ {libro.precio}</p>
            <div className="prose max-w-none text-brand-gray mb-8">
              <p>{libro.sinopsis}</p>
            </div>
            <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-brand-dark mb-4">Detalles del producto</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    <div>
                        <dt className="font-medium text-gray-500">Editorial</dt>
                        <dd className="text-brand-dark font-semibold">{libro.editorial}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-gray-500">Fecha de Publicación</dt>
                        <dd className="text-brand-dark font-semibold">{libro.fecha_publicacion}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-gray-500">ISBN</dt>
                        <dd className="text-brand-dark font-semibold">{libro.isbn || 'No disponible'}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-gray-500">Stock</dt>
                        <dd className="text-brand-dark font-semibold">{libro.stock > 0 ? `${libro.stock} unidades` : 'Agotado'}</dd>
                    </div>
                </dl>
            </div>
             <div className="mt-10">
                <button className="w-full bg-brand-lime text-brand-dark font-bold py-4 px-8 rounded-lg shadow-lg hover:scale-105 transition-transform text-lg">
                    Añadir al carrito
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibroDetallesPage;