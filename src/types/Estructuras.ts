// src/types/estructuras.ts

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

// Para los libros que vienen de tu API
export interface LibroAPI {
  id: number;
  titulo: string;
  autor: string;
  editorial: string;
  precio: string;
  sinopsis: string;
  fecha_publicacion: string;
  id_categoria: number;
  url_portada: string;
}