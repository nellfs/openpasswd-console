module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'secure-blue': '#2c6ff3',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
