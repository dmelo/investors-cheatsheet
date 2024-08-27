/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["winter", "black"]
  },
  darkMode: ["class", '[data-theme="black"]'],
  plugins: [require('daisyui')],
}

