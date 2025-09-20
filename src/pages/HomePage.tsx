import React from 'react';
import type { Book } from '../types/Libro';

// El componente BookCard no necesita cambios.
const BookCard: React.FC<{ book: Book }> = ({ book }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group transition-transform duration-300 hover:-translate-y-2 border border-gray-100">
      <div className="overflow-hidden">
        <img src={book.imageUrl} alt={book.title} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <span className="text-sm font-semibold text-brand-green">{book.category}</span>
        <h4 className="text-xl font-bold text-brand-dark mt-2 mb-1 truncate">{book.title}</h4>
        <p className="text-brand-gray mb-4">por {book.author}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-extrabold text-brand-dark">{book.price}</span>
          <button className="bg-brand-lime text-brand-dark font-semibold py-2 px-4 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Ver más
          </button>
        </div>
      </div>
    </div>
);

const HomePage: React.FC = () => {
    const books: Book[] = [
        { id: 1, imageUrl: 'https://static.vecteezy.com/system/resources/previews/005/377/487/non_2x/cartoon-doodle-book-isolated-on-white-background-education-hand-drawn-icon-free-vector.jpg', category: 'Ficción', title: 'El Laberinto de Sombras', author: 'Ana Morales', price: 'S/ 59.90' },
        { id: 2, imageUrl: 'https://www.comunidadbaratz.com/wp-content/uploads/Conoces-los-detalles-para-que-tu-libro-sea-el-pr%C3%83%C2%B3ximo-bestseller-mundial-1.jpg', category: 'No Ficción', title: 'Código Limpio', author: 'Robert C. Martin', price: 'S/ 89.90' },
        { id: 3, imageUrl: 'https://www.planetadelibros.com/usuaris/libros/fotos/299/original/portada_cronicas-marcianas_ray-bradbury_201906251540.jpg', category: 'Ciencia Ficción', title: 'Crónicas de Marte', author: 'Ray Bradbury', price: 'S/ 65.00' },
        { id: 4, imageUrl: 'https://www.planetadelibros.com/usuaris/libros/fotos/330/original/portada_la-sombra-del-viento-20-aniversario_carlos-ruiz-zafon_202103111500.jpg', category: 'Misterio', title: 'La Sombra del Viento', author: 'Carlos Ruiz Zafón', price: 'S/ 75.50' },
        { id: 5, imageUrl: 'https://www.penguinlibros.com/pe/6472679-medium_default/el-nombre-del-viento-td-cronica-del-asesino-de-reyes-1.jpg', category: 'Fantasía', title: 'El Nombre del Viento', author: 'Patrick Rothfuss', price: 'S/ 82.00' },
        { id: 6, imageUrl: 'https://blog.davidtorne.com/wp-content/uploads/2020/04/habits-atomics.jpg', category: 'Desarrollo Personal', title: 'Hábitos Atómicos', author: 'James Clear', price: 'S/ 95.00' },
    ];

    return (
        <div className="font-jakarta bg-brand-light-gray min-h-2000px">
            <section className="bg-brand-green text-white py-32 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-left">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">La mejor plataforma para amantes de la lectura.</h1>
                        <p className="text-lg text-gray-300 mb-10">Cursos online de los mejores autores. Únete a 17 millones de lectores hoy.</p>
                        <div className="flex items-center gap-4">
                            <button className="bg-brand-lime text-brand-dark font-bold py-4 px-8 rounded-lg shadow-lg hover:scale-105 transition-transform">Empezar ahora</button>
                            <button className="text-white font-bold group flex items-center">
                                <span>Cómo funciona</span>
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div>
                        {/* IMAGEN PRINCIPAL ACTUALIZADA */}
                        <img 
                            src="https://i.ibb.co/WWnD84Mg/generated.webp" 
                            alt="Libro antiguo con pluma, representando la escritura y la lectura" 
                            className="rounded-lg shadow-2xl ring-1 ring-white/10"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-white py-20 px-4">
                <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
                    <div>
                        <h3 className="text-2xl font-bold text-brand-dark">Garantizado y verificado</h3>
                        <p className="text-brand-gray mt-2">Contenido de la más alta calidad, curado por expertos.</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-brand-dark">Horario flexible</h3>
                        <p className="text-brand-gray mt-2">Aprende a tu propio ritmo, en cualquier momento y lugar.</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-brand-dark">Para todos los bolsillos</h3>
                        <p className="text-brand-gray mt-2">Planes accesibles para que nunca dejes de aprender.</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-brand-dark">Instructores expertos</h3>
                        <p className="text-brand-gray mt-2">Aprende directamente de los mejores autores y críticos.</p>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-brand-dark mb-2">Libros Destacados</h2>
                    <p className="text-center text-brand-gray mb-12">Seleccionados por nuestros expertos para inspirarte.</p>
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