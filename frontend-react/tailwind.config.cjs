module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        neon: '#66FFF2',
        accent: '#A78BFA'
      },
      boxShadow: {
        'card': '0 18px 54px rgba(0,0,0,0.55)'
      }
    }
  },
  plugins: []
}
