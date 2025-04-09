module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'important-urgent': '#ef4444',
        'important-not-urgent': '#f97316',
        'not-important-urgent': '#3b82f6',
        'not-important-not-urgent': '#84cc16',
      }
    },
  },
  plugins: [],
}
