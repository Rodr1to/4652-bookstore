import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-dark-footer text-white font-jakarta">
            <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
                {/* Columna del Logo y Redes */}
                <div className="md:col-span-1">
                    <img src="https://i.ibb.co/v67Bp4ZZ/tintaypapel-logo-jpg.png" alt="Tinta y Papel Logo" className="h-12 bg-white rounded p-1 mb-4" />
                    <p className="text-gray-400">Ofrecemos cursos de alta calidad para amantes de la lectura desde hace más de diez años.</p>
                </div>

                {/* Columna de Categorías */}
                <div>
                    <h4 className="font-bold text-white mb-4">Categorías Populares</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white">Ficción Contemporánea</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Desarrollo Personal</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Ciencia Ficción y Fantasía</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">No Ficción</a></li>
                    </ul>
                </div>

                {/* Columna de Ayuda */}
                <div>
                    <h4 className="font-bold text-white mb-4">¿Necesitas Ayuda?</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white">Llámanos: +1 234 567 8910</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Email: soporte@tintaypapel.com</a></li>
                    </ul>
                </div>

                {/* Columna de Newsletter */}
                <div>
                    <h4 className="font-bold text-white mb-4">Suscríbete al boletín</h4>
                    <form className="flex">
                        <input type="email" placeholder="Tu email" className="bg-gray-800 text-white px-4 py-2 rounded-l-md w-full focus:outline-none"/>
                        <button type="submit" className="bg-brand-lime text-brand-dark font-bold px-4 py-2 rounded-r-md">Enviar</button>
                    </form>
                    <p className="text-xs text-gray-500 mt-2">Protegemos tu privacidad.</p>
                </div>
            </div>
            <div className="border-t border-gray-800 text-center py-6">
                <p className="text-gray-500">© 2025 Tinta y Papel. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;