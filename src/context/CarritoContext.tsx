// src/context/CarritoContext.tsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react'; // <-- CORRECCIÓN APLICADA
import type { LibroAPI, ItemCarrito } from '../types/Estructuras';

// 1. Definimos la forma del contexto
interface CarritoContextType {
  items: ItemCarrito[];
  agregarAlCarrito: (libro: LibroAPI, cantidad?: number) => void;
  eliminarDelCarrito: (idLibro: number) => void;
  vaciarCarrito: () => void;
  totalItems: number;
}

// 2. Creamos el contexto
const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

// 3. Creamos el "Proveedor" del contexto, que contendrá toda la lógica
export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<ItemCarrito[]>([]);

  // Efecto para cargar el carrito desde sessionStorage al iniciar la app
  useEffect(() => {
    const carritoGuardado = sessionStorage.getItem('carritoCompras');
    if (carritoGuardado) {
      setItems(JSON.parse(carritoGuardado));
    }
  }, []);

  // Función para guardar el carrito en sessionStorage cada vez que cambie
  const guardarCarrito = (carrito: ItemCarrito[]) => {
    setItems(carrito);
    sessionStorage.setItem('carritoCompras', JSON.stringify(carrito));
  };

  const agregarAlCarrito = (libro: LibroAPI, cantidad = 1) => {
    const itemExistente = items.find(item => item.id === libro.id);

    if (itemExistente) {
      // Si el libro ya está, actualizamos la cantidad
      const nuevoCarrito = items.map(item =>
        item.id === libro.id ? { ...item, cantidad: item.cantidad + cantidad } : item
      );
      guardarCarrito(nuevoCarrito);
    } else {
      // Si es un libro nuevo, lo agregamos
      const nuevoCarrito = [...items, { ...libro, cantidad }];
      guardarCarrito(nuevoCarrito);
    }
  };

  const eliminarDelCarrito = (idLibro: number) => {
    const nuevoCarrito = items.filter(item => item.id !== idLibro);
    guardarCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    guardarCarrito([]);
  };

  const totalItems = items.reduce((total, item) => total + item.cantidad, 0);

  return (
    <CarritoContext.Provider value={{ items, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, totalItems }}>
      {children}
    </CarritoContext.Provider>
  );
};

// 4. Creamos un "Hook" personalizado para usar el contexto fácilmente en otros componentes
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (context === undefined) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};