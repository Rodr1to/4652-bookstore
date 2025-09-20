import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-custom-dark-blue text-white font-jakarta">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-gray-400">© 2025 Bookstore Social Club. Todos los derechos reservados.</p>
                <p className="text-gray-500 mt-2">Desarrollado con ❤️ para el curso de Programación Web 2.</p>
            </div>
        </footer>
    );
}

export default Footer