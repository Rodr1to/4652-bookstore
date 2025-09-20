import { useState } from 'react';
// Corrección: Se añaden las extensiones .tsx a las importaciones para asegurar que Vite resuelva los módulos correctamente.
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import HomePage from './pages/HomePage.tsx';
import CatalogoPage from './pages/CatalogoPage.tsx';

function App() {
  // Este estado controla qué página se muestra. 'home' es el valor inicial.
  const [page, setPage] = useState('home');

  return (
    <div className="bg-white">
      {/* El Header recibe la función setPage para poder cambiar el estado desde la navegación */}
      <Header setPage={setPage} />
      
      <main>
        {/* Renderizado condicional: muestra una página u otra basado en el estado 'page' */}
        {page === 'home' && <HomePage />}
        {page === 'catalogo' && <CatalogoPage setPage={setPage} />}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
