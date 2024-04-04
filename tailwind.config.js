/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ['"Titillium Web"', 'sans-serif'],
      },
      backgroundImage: {
        'ham-ver': "url('../src/imgs/ham-ver-pic.png')",
        'race-start': "url('../src/imgs/race-start.png')"
      }
    },
  },
  plugins: [],
  mode: 'jit',
}