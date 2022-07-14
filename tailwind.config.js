module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#9174FB',
          500: '#7E5CFB',
          600: '#724CFA',
          750: '#20233f',
          800: '#1F2138',
          900: '#131426'
        },
        cgreen: {
          a: '#38D9AB',
          b: '#202B3F'
        },
        cyellow: {
          a: '#E6891A',
          b: '#2D2844'
        },
        cgrey: {
          a: '#E7E9FB',
          b: '#292B42'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
