/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#0d4a3a',
        'brand-lime': '#c2e822',
        'brand-dark': '#1e293b',
        'brand-gray': '#64748B',
        'brand-light-gray': '#f0f3f2',
        'brand-dark-footer': '#1c1c1c',
      },
      fontFamily: {
        'jakarta': ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      minHeight: {
        '2000px': '2000px',
      }
    },
  },
  plugins: [],
}

