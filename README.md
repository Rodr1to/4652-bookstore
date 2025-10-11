# Proyecto Final: Tinta y Papel Store

Este proyecto es una aplicación web de e-commerce para una librería ficticia llamada "Tinta y Papel Store", desarrollada como proyecto final para el curso de **Programación Web 2**. La aplicación permite a los usuarios explorar un catálogo de libros clasificados por categorías, ver los detalles de cada libro y gestionar un carrito de compras.

El diseño y la experiencia de usuario se basan en la plantilla de ThemeForest: **[Crafto - eLearning Demo](https://crafto.themezaa.com/elearning/)**.

**[Ver el proyecto en vivo en Netlify](https://4652-project.netlify.app/)**

<img width="1424" height="908" alt="image" src="https://github.com/user-attachments/assets/0d0c87d5-c218-465c-aa23-537e4a216a97" />

---

## 🚀 Características Principales

Este proyecto implementa las siguientes funcionalidades clave, cumpliendo con los requisitos del curso:

* **Navegación Multi-página:** Uso de `react-router-dom` para una experiencia de aplicación de página única (SPA) con rutas limpias para cada sección.
* **Página de Inicio:** Una landing page atractiva con una altura mínima de 2000px que presenta la tienda y una selección de libros destacados.
* **Sistema Maestro-Detalle (Tienda):**
    * Una página de "Tienda" que consume un servicio web para mostrar las categorías de libros disponibles.
    * Al seleccionar una categoría, se realiza una consulta a un segundo servicio web que devuelve y muestra únicamente los libros pertenecientes a esa categoría.
* **Página de Detalles del Libro:**
    * Cada libro tiene una página de detalles individual accesible a través de una URL dinámica (ej. `/libro/1`).
    * Esta página consume un servicio web que recibe el ID del libro como parámetro para obtener y mostrar al menos 6 datos relevantes (título, autor, sinopsis, editorial, etc.).
* **Carrito de Compras:**
    * Funcionalidad completa para añadir libros al carrito desde la página de tienda y la de detalles.
    * El estado del carrito se gestiona globalmente con **React Context** y persiste en la sesión del usuario usando `sessionStorage`.
    * Una página dedicada al carrito donde se pueden ver los productos, subtotales, y el total de la compra.
    * Funcionalidad para **eliminar items** individualmente y para **vaciar el carrito** por completo.
* **Backend y Servicios Web:**
    * Una base de datos MySQL alojada en **Alwaysdata**.
    * Servicios web desarrollados en **PHP** para servir los datos en formato JSON, incluyendo endpoints para:
        * Obtener todas las categorías.
        * Obtener libros por ID de categoría (maestro-detalle).
        * Obtener los detalles de un libro por su ID.

---

## 🛠️ Tecnologías Utilizadas

### Frontend
* **Framework:** [React](https://react.dev/) con [Vite](https://vitejs.dev/)
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
* **Enrutamiento:** [React Router DOM](https://reactrouter.com/)

### Backend
* **Lenguaje:** [PHP](https://www.php.net/)
* **Base de Datos:** [MySQL](https://www.mysql.com/)

### Despliegue (Deployment)
* **Frontend:** [Netlify](https://www.netlify.com/)
* **Backend (Base de Datos y Servicios Web):** [Alwaysdata](https://www.alwaysdata.com/)

---

## 📋 Requisitos del Curso Cumplidos

A continuación se detallan los enlaces que verifican el cumplimiento de los requisitos solicitados:

* **g.2 - Ruta del servicio web (maestro-detalle):**
    * `https://rovalverde.alwaysdata.net/libros_por_categoria.php?id_categoria=1`

* **g.3 - Ruta del proyecto (funcionalidades 3, 4 y 5):**
    * `https://4652-project.netlify.app/`

* **g.4 - Ruta de la plantilla base:**
    * `https://crafto.themezaa.com/elearning/`

---

## 🔧 Instalación y Ejecución Local

Para ejecutar este proyecto en un entorno de desarrollo local, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/Rodr1to/4652-bookstore.git](https://github.com/Rodr1to/4652-bookstore.git)
    ```

2.  **Navega a la carpeta del proyecto:**
    ```bash
    cd 4652-bookstore
    ```

3.  **Instala las dependencias:**
    ```bash
    npm install
    ```

4.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

5.  Abre tu navegador en `http://localhost:5173`.
