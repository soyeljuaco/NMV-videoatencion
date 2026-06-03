/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        blue: { DEFAULT: '#0085ca', light: 'rgba(0,133,202,0.1)', lighter: 'rgba(0,133,202,0.05)' },
        purple: { DEFAULT: '#713474', soft: 'rgba(113,52,116,0.15)' },
        orange: { DEFAULT: '#ef9033' },
        green: { DEFAULT: '#25a337', soft: 'rgba(53,173,68,0.15)' },
      },
      boxShadow: {
        'wizard': '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)',
        'card': '0px 25px 50px 12px rgba(0,0,0,0.25)',
        'float': '0px 16px 8px rgba(0,0,0,0.25)',
        'step': '0px 10px 15px -3px rgba(0,145,206,0.3)',
      },
    },
  },
  plugins: [],
}
