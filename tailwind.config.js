/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}',"./node_modules/flowbite/**/*.js"],
    theme: {
      extend: {},
    },
    darkMode: 'media',
    plugins: [
      require('flowbite/plugin')
  ],
  };
  