const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    "./src/*.{vue}",
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'apple': {
          '50': '#effef2',
          '100': '#d9ffe2',
          '200': '#b6fcc6',
          '300': '#7df89b',
          '400': '#3deb68',
          '500': '#13d443',
          '600': '#0abd37',
          '700': '#0b8a2c',
          '800': '#0f6c27',
          '900': '#0e5923',
          '950': '#01320f',
        },

      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: value => ({
          perspective: value,
        }),
      })
    }),
    function({ addUtilities }) {
      const newUtilities = {
        '.active': {
          '@apply bg-apple-400': {},
        },
        '.inactive': {
          '@apply border border-apple-400': {},
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}
