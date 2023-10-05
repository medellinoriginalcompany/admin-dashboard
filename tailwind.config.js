/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gradient-primary': '#ecf2fe',
        'gradient-secondary': '#dae4f0',
        'accent': '#0560FD',
        'primary': '#fff', 
        'secondary': '#F7F7FA',
        'tertiary': '#d4d4d4',
      },
      boxShadow: {
        'b': '0px 10px 15px -15px rgba(0, 0, 0, 0.3)',
        'inner-lg': 'inset 0px 0px 6px 0px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        'source-sans': ["'Source Sans 3'", 'sans-serif'],
        'open-sans': ["'Open Sans'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}