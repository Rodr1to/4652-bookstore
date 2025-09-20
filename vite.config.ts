import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Redirige las peticiones de /api a tu servidor web
      '/api': {
        target: 'https://rovalverde.alwaysdata.net',
        changeOrigin: true,
        // Reescribe la ruta para quitar /api
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
