import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { LibroAPI, ItemCarrito } from '../types/Estructuras';

interface CarritoContextType {
  items: ItemCarrito[];
  agregarAlCarrito: (libro: LibroAPI, cantidad?: number) => void;
  eliminarDelCarrito: (idLibro: number) => void;
  vaciarCarrito: () => void;
  totalItems: number;
  totalPrecio: number; 
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<ItemCarrito[]>([]);

  useEffect(() => {
    const carritoGuardado = sessionStorage.getItem('carritoCompras');
    if (carritoGuardado) {
      setItems(JSON.parse(carritoGuardado));
    }
  }, []);

  const guardarCarrito = (carrito: ItemCarrito[]) => {
    setItems(carrito);
    sessionStorage.setItem('carritoCompras', JSON.stringify(carrito));
  };

  const agregarAlCarrito = (libro: LibroAPI, cantidad = 1) => {
    const itemExistente = items.find(item => item.id === libro.id);

    if (itemExistente) {
      const nuevoCarrito = items.map(item =>
        item.id === libro.id ? { ...item, cantidad: item.cantidad + cantidad } : item
      );
      guardarCarrito(nuevoCarrito);
    } else {
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
  
  const totalPrecio = items.reduce((total, item) => total + (parseFloat(item.precio) * item.cantidad), 0);

  return (
    <CarritoContext.Provider value={{ items, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, totalItems, totalPrecio }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (context === undefined) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};