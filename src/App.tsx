// src/App.tsx

// ... (otros imports)
import { Route, Routes } from 'react-router-dom';
import CarritoPage from './pages/CarritoPage'; // <-- AÑADE ESTA LÍNEA
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import CatalogoPage from './pages/CatalogoPage';
import TiendaPage from './pages/TiendaPage';
import LibroDetallesPage from './pages/LibroDetallesPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="catalogo" element={<CatalogoPage />} />
        <Route path="tienda" element={<TiendaPage />} />
        <Route path="libro/:idLibro" element={<LibroDetallesPage />} />
        <Route path="carrito" element={<CarritoPage />} /> {/* <-- AÑADE ESTA LÍNEA */}
      </Route>
    </Routes>
  );
};

export default App;