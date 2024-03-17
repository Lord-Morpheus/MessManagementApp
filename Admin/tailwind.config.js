/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'aliceblue':'#f0f8ff',
        'peachette':'#ffdab9',
      },
      height:{
        '17/20':'0.95',
      }
    },
  },
  plugins: [],
}

