import React, { useState, useEffect } from 'react';

interface CatalogoPageProps {
  setPage: (page: 'home' | 'catalogo') => void;
}

interface LibroAPI {
  id: string;
  nombre: string;
  autor: string;
  precioventa: string;
}

const CatalogoPage: React.FC<CatalogoPageProps> = ({ setPage }) => {
  const [libros, setLibros] = useState<LibroAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const response = await fetch('/api/libros.php');
        if (!response.ok) {
          throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
        }
        const data = await response.json();
        setLibros(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
            setError(`Error al cargar los datos: ${err.message}`);
        } else {
            setError('Ocurrió un error desconocido.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLibros();
  }, []);

  return (
    <div className="bg-gray-50 font-jakarta min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setPage('home')}
          className="mb-8 bg-white text-custom-dark-blue font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-all flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Volver al inicio
        </button>

        <h1 className="text-4xl font-extrabold text-custom-dark-blue mb-8">Catálogo Completo de Libros</h1>
        
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {loading && <p className="p-6 text-center text-gray-500">Cargando libros...</p>}
          {error && <p className="p-6 text-center text-red-500 font-semibold">{error}</p>}
          
          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Nombre</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Autor</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Precio</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {libros.map((libro) => (
                    <tr key={libro.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{libro.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{libro.nombre}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{libro.autor}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-custom-purple">S/ {libro.precioventa}</td>
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