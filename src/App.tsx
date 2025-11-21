// src/App.tsx

import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import CatalogoPage from './pages/CatalogoPage';
import TiendaPage from './pages/TiendaPage';
import LibroDetallesPage from './pages/LibroDetallesPage';
import CarritoPage from './pages/CarritoPage';
import LoginPage from './pages/LoginPage'; 
import AdminLibrosPage from './pages/AdminLibrosPage'; 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="catalogo" element={<CatalogoPage />} />
        <Route path="tienda" element={<TiendaPage />} />
        <Route path="libro/:idLibro" element={<LibroDetallesPage />} />
        <Route path="carrito" element={<CarritoPage />} />
        <Route path="login" element={<LoginPage />} /> {/* <-- NUEVA RUTA */}
        <Route path="admin" element={<AdminLibrosPage />} /> {/* <-- NUEVA RUTA */}
      </Route>
    </Routes>
  );
};

export default App;