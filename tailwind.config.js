/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    './node_modules/preline/preline.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        'manrope': [ 'Manrope', ...defaultTheme.fontFamily.sans ],
        'newsreader': [ 'Newsreader', 'serif' ]
      }
    },
  },
  plugins: [
    require('preline/plugin')
  ],
}

