/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/views/**/*.ejs"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2c3e50',
        secondary: '#3498db',
        success: '#2ecc71',
        error: '#e74c3c'
      }
    },
  },
  plugins: [],
} 