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
        'tertiary': '#3F3F3F',
      },
    },
  },
  plugins: [],
}