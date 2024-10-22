module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: '#FFA500',
        pink: {
          light: '#FFB6C1',
          DEFAULT: '#FFC0CB',
        },
        lilac: '#C8A2C8',
      },
      gradientColorStops: theme => ({
        ...theme('colors'),
        'orange': '#FFA500',
        'pink-lilac': '#C8A2C8',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
