/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#6633FF',
        'custom-orange': '#FF6B00',
        'custom-dark-blue': '#1E293B',
        'custom-gray': '#64748B',
        'custom-light-gray': '#F8FAFC',
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

