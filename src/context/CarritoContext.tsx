// src/context/CarritoContext.tsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { LibroAPI, ItemCarrito } from '../types/Estructuras';

// 1. Definimos la forma del contexto
interface CarritoContextType {
  items: ItemCarrito[];
  agregarAlCarrito: (libro: LibroAPI, cantidad?: number) => void;
  eliminarDelCarrito: (idLibro: number) => void;
  vaciarCarrito: () => void;
  incrementarCantidad: (idLibro: number) => void;
  decrementarCantidad: (idLibro: number) => void;
  totalItems: number;
  totalPrecio: number; 
}

// 2. Creamos el contexto
const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

// 3. Creamos el "Proveedor" del contexto
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
      const nuevoCarrito = items.map(item =>
        item.id === libro.id ? { ...item, cantidad: Math.min(item.cantidad + cantidad, item.stock) } : item // Controla stock
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

  // --- FUNCIÓN CORREGIDA ---
  const decrementarCantidad = (idLibro: number) => {
    const nuevoCarrito = items.map(item => {
      if (item.id === idLibro) {
        // La cantidad mínima es 1
        const nuevaCantidad = Math.max(1, item.cantidad - 1);
        return { ...item, cantidad: nuevaCantidad };
      }
      return item;
    });
    guardarCarrito(nuevoCarrito);
  };
  
  const incrementarCantidad = (idLibro: number) => {
    const nuevoCarrito = items.map(item => {
      if (item.id === idLibro) {
        // La cantidad máxima es el stock
        const nuevaCantidad = Math.min(item.cantidad + 1, item.stock);
        return { ...item, cantidad: nuevaCantidad };
      }
      return item;
    });
    guardarCarrito(nuevoCarrito);
  };

  // --- CÁLCULOS TOTALES ---
  const totalItems = items.reduce((total, item) => total + item.cantidad, 0);
  const totalPrecio = items.reduce((total, item) => total + (parseFloat(item.precio) * item.cantidad), 0);

  return (
    <CarritoContext.Provider 
      value={{ 
        items, 
        agregarAlCarrito, 
        eliminarDelCarrito, 
        vaciarCarrito, 
        totalItems, 
        totalPrecio,
        incrementarCantidad,
        decrementarCantidad
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

// 4. Hook personalizado
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (context === undefined) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};