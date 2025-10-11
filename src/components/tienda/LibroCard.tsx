import React from 'react';
import { Link } from 'react-router-dom';
import type { LibroAPI } from '../../types/Estructuras';
import { useCarrito } from '../../context/CarritoContext';

interface LibroCardProps {
  libro: LibroAPI;
}

const API_BASE_URL = 'https://rovalverde.alwaysdata.net/';

const LibroCard: React.FC<LibroCardProps> = ({ libro }) => {
  const { agregarAlCarrito } = useCarrito();
  const imageUrl = libro.url_portada ? `${API_BASE_URL}${libro.url_portada}` : 'https://placehold.co/400x600/0d4a3a/c2e822?text=Portada';

  const handleAgregarClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita que el Link se active
    e.stopPropagation(); // Detiene la propagación del evento
    agregarAlCarrito(libro);
    // La alerta ha sido removida.
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <Link to={`/libro/${libro.id}`} className="block overflow-hidden relative">
        <img src={imageUrl} alt={libro.titulo} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </Link>
      <div className="p-4 relative">
        <h4 className="text-md font-bold text-brand-dark truncate">{libro.titulo}</h4>
        <p className="text-sm text-brand-gray">{libro.autor}</p>
        <p className="text-lg font-extrabold text-brand-green mt-2">S/ {libro.precio}</p>

        <button
          onClick={handleAgregarClick}
          className="absolute -top-5 right-3 bg-brand-lime text-brand-dark p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
          title="Añadir al carrito"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LibroCard;