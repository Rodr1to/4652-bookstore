// src/App.tsx

import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import CatalogoPage from './pages/CatalogoPage';
import TiendaPage from './pages/TiendaPage'; // Importamos la nueva página

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="catalogo" element={<CatalogoPage />} />
        <Route path="tienda" element={<TiendaPage />} />
        {/* Próximamente añadiremos la ruta para los detalles del libro */}
        {/* <Route path="libro/:idLibro" element={<LibroDetallesPage />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
