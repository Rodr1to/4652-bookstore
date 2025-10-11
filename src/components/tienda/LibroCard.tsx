// src/components/tienda/LibroCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import type { LibroAPI } from '../../types/estructuras';

interface LibroCardProps {
  libro: LibroAPI;
}

const API_BASE_URL = 'https://rovalverde.alwaysdata.net/';

const LibroCard: React.FC<LibroCardProps> = ({ libro }) => {
  const imageUrl = libro.url_portada ? `${API_BASE_URL}${libro.url_portada}` : 'https://placehold.co/400x600/0d4a3a/c2e822?text=Portada';

  return (
    <Link to={`/libro/${libro.id}`} className="block bg-white rounded-lg shadow-md overflow-hidden group transition-transform duration-300 hover:-translate-y-1">
      <div className="overflow-hidden relative">
        <img src={imageUrl} alt={libro.titulo} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white font-bold border-2 border-white py-2 px-4 rounded">Ver Detalles</span>
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-md font-bold text-brand-dark truncate">{libro.titulo}</h4>
        <p className="text-sm text-brand-gray">{libro.autor}</p>
        <p className="text-lg font-extrabold text-brand-green mt-2">S/ {libro.precio}</p>
      </div>
    </Link>
  );
};

export default LibroCard;