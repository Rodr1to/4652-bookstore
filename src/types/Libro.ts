export interface Book {
  id: number;
  imageUrl: string;
  category: string;
  title: string;
  author: string;
  price: string;
}

// Para los libros que vienen de tu API (CORREGIDO)
export interface LibroAPI {
  id: number;
  titulo: string;
  autor: string;
  editorial: string;
  precio: string;
  sinopsis: string;
  fecha_publicacion: string;
}