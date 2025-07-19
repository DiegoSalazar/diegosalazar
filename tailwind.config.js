/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{pug,html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
