// src/pages/TiendaPage.tsx

import React, { useState, useEffect } from 'react';
import type { Categoria, LibroAPI } from '../types/Estructuras';
import CategoriaCard from '../components/tienda/CategoriaCard';
import LibroCard from '../components/tienda/LibroCard';

const TiendaPage: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [libros, setLibros] = useState<LibroAPI[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<number | null>(null);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [loadingLibros, setLoadingLibros] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      setLoadingCategorias(true);
      try {
        const response = await fetch('/api/categorias.php');
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      } finally {
        setLoadingCategorias(false);
      }
    };
    fetchCategorias();
  }, []);

  const handleCategoriaClick = async (idCategoria: number) => {
    if (selectedCategoria === idCategoria) {
      setSelectedCategoria(null); // Permite deseleccionar
      setLibros([]);
      return;
    }
    setSelectedCategoria(idCategoria);
    setLoadingLibros(true);
    setLibros([]);
    try {
      const response = await fetch(`/api/libros_por_categoria.php?id_categoria=${idCategoria}`);
      const data = await response.json();
      setLibros(data);
    } catch (error) {
      console.error(`Error al cargar libros:`, error);
    } finally {
      setLoadingLibros(false);
    }
  };

  return (
    <div className="bg-brand-light-gray font-jakarta min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold text-brand-dark mb-4">Nuestra Tienda</h1>
        <p className="text-lg text-brand-gray mb-10">Selecciona una categoría para explorar nuestro catálogo de libros.</p>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-brand-dark mb-6">Categorías</h2>
          {loadingCategorias ? (
            <p>Cargando categorías...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {categorias.map(cat => (
                <CategoriaCard
                  key={cat.id_categoria}
                  categoria={cat}
                  onClick={handleCategoriaClick}
                  isSelected={selectedCategoria === cat.id_categoria}
                />
              ))}
            </div>
          )}
        </div>

        {selectedCategoria && (
          <div>
            <h2 className="text-2xl font-bold text-brand-dark mb-6">Libros de la categoría seleccionada</h2>
            {loadingLibros ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 animate-pulse">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-lg h-96"></div>
                ))}
              </div>
            ) : (
              libros.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {libros.map(libro => (
                    <LibroCard key={libro.id} libro={libro} />
                  ))}
                </div>
              ) : (
                <p className="text-brand-gray">No se encontraron libros para esta categoría.</p>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TiendaPage;