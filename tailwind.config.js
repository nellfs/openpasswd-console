module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Nunito'],
        others: ['Poppins']
      },
      colors: {
        'secure-cyan': '#2c6ff3',
        'secure-blue': '#006bff',
        'secure-light-blue': '#0063ec',
        'secure-dark-blue': '#0059d4'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
