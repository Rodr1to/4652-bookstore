// src/components/MainLayout.tsx

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Aquí se renderizará cada página */}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;