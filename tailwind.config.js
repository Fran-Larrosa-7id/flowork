module.exports = {
  darkMode: 'class', // Enable dark mode
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#ff1f43',        // Rojo brillante como el fondo animado
        secondary: '#e50914',   // Rojo fuerte tipo Netflix para detalles
        background: '#0b000c',  // Fondo oscuro total
        text: '#ffffff',        // Blanco puro para contraste
        border: '#8f001c',      // Bordes más apagados en rojo oscuro
        hover: '#ff4757',       // Un rojo claro brillante para hover
      },
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
      },
    },
  },
  plugins: [],
}