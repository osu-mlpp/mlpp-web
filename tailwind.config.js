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
        }
      },
      boxShadow: {
        hover: '0 0 0 .1rem #FFFFFF'
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

  },
  plugins: [],
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './layout/**/*.{js,ts,jsx,tsx}'],
}
