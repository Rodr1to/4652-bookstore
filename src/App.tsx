import React, { useState } from 'react';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import HomePage from './pages/HomePage.tsx';
import CatalogoPage from './pages/CatalogoPage.tsx';

const App: React.FC = () => {
  const [page, setPage] = useState<'home' | 'catalogo'>('home');

  return (
    <>
      <Header setPage={setPage} />
      <main>
        {page === 'home' && <HomePage />}
        {page === 'catalogo' && <CatalogoPage setPage={setPage} />}
      </main>
      <Footer />
    </>
  );
};

export default App;
