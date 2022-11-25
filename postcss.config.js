const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');


module.exports = {
  plugins: [
    autoprefixer,
    tailwindcss,
    // process.env.NODE_ENV !== 'development' ? purgecss : '',
  ],
};
