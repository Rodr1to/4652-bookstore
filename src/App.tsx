// src/App.tsx

import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import CatalogoPage from './pages/CatalogoPage';
import TiendaPage from './pages/TiendaPage';
import LibroDetallesPage from './pages/LibroDetallesPage'; // <-- AÑADE ESTA LÍNEA

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="catalogo" element={<CatalogoPage />} />
        <Route path="tienda" element={<TiendaPage />} />
        <Route path="libro/:idLibro" element={<LibroDetallesPage />} /> {/* <-- AÑADE ESTA LÍNEA */}
      </Route>
    </Routes>
  );
};

export default App;
