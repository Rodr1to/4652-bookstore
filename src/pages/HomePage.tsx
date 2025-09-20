import React from 'react';

// Interfaz para el objeto Book
interface Book {
  id: number;
  imageUrl: string;
  category: string;
  title: string;
  author: string;
  price: string;
}

// Interfaz para los props del componente BookCard
interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group transition-transform duration-300 hover:-translate-y-2 border border-gray-100">
      <div className="overflow-hidden">
        <img src={book.imageUrl} alt={book.title} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <span className="text-sm font-semibold text-custom-purple">{book.category}</span>
        <h4 className="text-xl font-bold text-custom-dark-blue mt-2 mb-1 truncate">{book.title}</h4>
        <p className="text-custom-gray mb-4">por {book.author}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-extrabold text-custom-dark-blue">{book.price}</span>
          <button className="bg-custom-orange text-white font-semibold py-2 px-4 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Ver más
          </button>
        </div>
      </div>
    </div>
);

const HomePage: React.FC = () => {
    const books: Book[] = [
        { id: 1, imageUrl: 'https://img.freepik.com/foto-gratis/composicion-libros-coloridos-sobre-mesa-blanca_23-2147844621.jpg?w=900', category: 'Ficción', title: 'El Laberinto de Sombras', author: 'Ana Morales', price: 'S/ 59.90' },
        { id: 2, imageUrl: 'https://img.freepik.com/foto-gratis/libros-antiguos-dispuestos-sobre-superficie-madera-generados-ia_188544-27038.jpg?w=1060', category: 'No Ficción', title: 'Código Limpio', author: 'Robert C. Martin', price: 'S/ 89.90' },
        { id: 3, imageUrl: 'https://img.freepik.com/foto-gratis/pila-libros-tapa-dura-generados-ia_188544-29837.jpg?w=1060', category: 'Ciencia Ficción', title: 'Crónicas de Marte', author: 'Ray Bradbury', price: 'S/ 65.00' },
        { id: 4, imageUrl: 'https://img.freepik.com/foto-gratis/pila-libros-sobre-fondo-colorido-ia-generativa_169016-29177.jpg?w=1060', category: 'Misterio', title: 'La Sombra del Viento', author: 'Carlos Ruiz Zafón', price: 'S/ 75.50' },
        { id: 5, imageUrl: 'https://img.freepik.com/foto-gratis/libros-colores-sobre-mesa-madera_23-2147844618.jpg?w=900', category: 'Fantasía', title: 'El Nombre del Viento', author: 'Patrick Rothfuss', price: 'S/ 82.00' },
        { id: 6, imageUrl: 'https://img.freepik.com/foto-gratis/coleccion-libros-antiguos-polvo-estante-madera-generados-ia_188544-29323.jpg?w=1060', category: 'Desarrollo Personal', title: 'Hábitos Atómicos', author: 'James Clear', price: 'S/ 95.00' },
    ];

    return (
        <div className="font-jakarta bg-custom-light-gray min-h-2000px">
            {/* Hero Section */}
            <section className="bg-white py-24 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-left">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-custom-dark-blue mb-6 leading-tight">Descubre tu Próxima Gran Lectura</h1>
                        <p className="text-lg text-custom-gray mb-10">Explora un universo de historias, conocimiento y aventuras. En nuestra librería, cada libro es una puerta a un nuevo mundo.</p>
                        <div className="flex items-center gap-4">
                            <button className="bg-custom-purple text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-opacity-90 transition-all">Explorar Libros</button>
                            <button className="text-custom-dark-blue font-bold group flex items-center">
                                <span>Ver Categorías</span>
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div>
                        <img src="https://img.freepik.com/foto-gratis/mujer-joven-que-trabaja-ideas-nuevas-computadora-portatil_23-2147981268.jpg?w=1060" alt="Lectora feliz" className="rounded-lg shadow-2xl"/>
                    </div>
                </div>
            </section>

            {/* Featured Books Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-custom-dark-blue mb-2">Libros Destacados</h2>
                    <p className="text-center text-custom-gray mb-12">Seleccionados por nuestros expertos para inspirarte.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {books.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;