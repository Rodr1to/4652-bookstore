// src/components/tienda/CategoriaCard.tsx

import React from 'react';
import type { Categoria } from '../../types/Estructuras';

interface CategoriaCardProps {
  categoria: Categoria;
  onClick: (id: number) => void;
  isSelected: boolean;
}

const API_BASE_URL = 'https://rovalverde.alwaysdata.net/';

const CategoriaCard: React.FC<CategoriaCardProps> = ({ categoria, onClick, isSelected }) => {
  const imageUrl = categoria.imagen_url ? `${API_BASE_URL}${categoria.imagen_url}` : 'https://placehold.co/600x400/0d4a3a/c2e822?text=Sin+Imagen';

  const cardClasses = `
    cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden group transform transition-all duration-300
    hover:shadow-2xl hover:-translate-y-2 border-4
    ${isSelected ? 'border-brand-lime' : 'border-transparent'}
  `;

  return (
    <div className={cardClasses} onClick={() => onClick(categoria.id_categoria)}>
      <div className="h-40 overflow-hidden">
        <img src={imageUrl} alt={categoria.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-brand-dark truncate">{categoria.nombre}</h3>
        <p className="text-sm text-brand-gray mt-1 h-10 overflow-hidden">{categoria.descripcion}</p>
      </div>
    </div>
  );
};

export default CategoriaCard;