// src/types/Estructuras.ts

// Para los libros de ejemplo de la página de inicio (se mantiene por ahora)
export interface Book {
  id: number;
  imageUrl: string;
  category: string;
  title: string;
  author: string;
  price: string;
}

// Para las categorías que vienen de tu API
export interface Categoria {
  id_categoria: number;
  nombre: string;
  descripcion: string;
  imagen_url: string;
}

// Para los libros que vienen de tu API (CORREGIDO Y ACTUALIZADO)
export interface LibroAPI {
  id: number;
  isbn: string;           // <-- AÑADIDO
  titulo: string;
  autor: string;
  editorial: string;
  precio: string;
  stock: number;          // <-- AÑADIDO Y CAMBIADO A TIPO number
  sinopsis: string;
  fecha_publicacion: string;
  id_categoria: number;
  url_portada: string;
}

export interface ItemCarrito extends LibroAPI {
  cantidad: number;
}