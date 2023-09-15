/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent': '#262626',
        'primary': '#fafafa', 
        'secondary': '#f4f4f5',
        'tertiary': '#d4d4d4',
      },
      boxShadow: {
        'b': '0px 10px 15px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}