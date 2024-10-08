/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        xs: '450px'
      },
      colors: {
        backColor: '#FAF9F6',
        eleColor: '#DC0000'
      }
    },
  },
  plugins: [],
}

