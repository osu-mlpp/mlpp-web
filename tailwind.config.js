const colors = require('tailwindcss/colors')

module.exports = {
  presets: [
    require('@studiometa/tailwind-config')
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        grey: {
          DEFAULT: '#171414',
          light: '#2E2B2B'
        }
      },
      boxShadow: {
        hover: '0 0 0 .1rem #FFFFFF'
      },
      brightness: {
        30: '.30'
      }
    },
    fontFace: {
      SF: [
        {
          filename: '/fonts/SFMono-Light',
          weight: 300,
          display: 'swap',
        },
        {
          filename: '/fonts/SFMono-Regular',
          weight: 400,
          display: 'swap',
        },
        {
          filename: '/fonts/SFMono-Medium',
          weight: 500,
          display: 'swap',
        },
        {
          filename: '/fonts/SFMono-SemiBold',
          weight: 600,
          display: 'swap',
        },
      ],
    },
    fontFamily: {
      sf: ['SF', 'system-ui', '-apple-system', 'Arial', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      blue: colors.blue
    }
  },
  plugins: [],
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
}
