/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],

  variants: {
    animation: ["motion-safe"]
  },
  theme: {

    extend: {
      animation: {
        fadeIn: "fadeIn 3s ease-in-out forwards",
        fadeInRight: "fadeInRight 1s ease-in-out forwards",
        fadeInRightOut: "fadeInRightOut 1s ease-in-out forwards",
        fadeInLeft: "fadeInLeft 1s ease-in-out forwards"
      },
      keyframes: {

        fadeIn: {
          "0%": { opacity: 0, },
          "100%": { opacity: 1, }
        },
        fadeInRight: {
          "0%": { opacity: 0, transform: 'translate(75%,0)' },
          "100%": { opacity: 1, }
        },
        fadeInRightOut: {
          "0%": { opacity: 1, },
          "100%": { opacity: 0, transform: 'translate(75%, 25%)' },
        },
        fadeInLeft: {
          "0%": { opacity: 0, transform: 'translate(-75%,75%)' },
          "100%": { opacity: 1, }
        }
      },

      textColor: {
        skin: {
          base: withOpacity('--color-text-base'),
          muted: withOpacity('--color-text-muted'),
          inverted: withOpacity('--color-text-inverted'),
          'inverted-muted': withOpacity('--color-text-inverted-muted'),
          'navlink-active': withOpacity('--color-navlink-active'),
          'navlink-hover': withOpacity('--color-navlink-hover'),
        },
      },
      backgroundColor: {
        skin: {
          fill: withOpacity('--color-fill'),
          primary: withOpacity('--color-primary'),
          secondary: withOpacity('--color-secondary'),
          shadow: withOpacity('--color-shadow'),
          border: withOpacity('--color-border'),
          'button-accent': withOpacity('--color-button-accent'),
          'button-accent-hover': withOpacity('--color-button-accent-hover'),
          'error': withOpacity('--color-error'),
          'error-hover': withOpacity('--color-error-hover'),
          'approve': withOpacity('--color-approve'),
          'approve-hover': withOpacity('--color-approve-hover'),
          'navlink-active': withOpacity('--color-navlink-active'),
          'navlink-hover': withOpacity('--color-navlink-hover'),
          'link': withOpacity('--color-link'),
          'link-hover': withOpacity('--color-link-hover'),
          'button-sec': withOpacity('--color-button-secondary'),
          'button-sec-hover': withOpacity('--color-button-secondary-hover'),
        },
      },
      gradientColorStops: {
        skin: {
          hue: withOpacity('--color-primary'),
          no: withOpacity('--color-secondary'),
        },
      },
      screens: {
        'mobile': { 'max': '767px' },
        'md': '767px',
        // => @media (min-width: 640px) { ... }
      },
      fontSize: {
        '2xs': '0.75rem'
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'amethyst': '#AF929D',
        'theme-green': '#7C8076',
        'green-light': '#9EA199',
        'green-dark': '#53554F',
        'theme-creme': '#EEE9E5',
        'theme-dark': '#4C4E48',
        'beige-1': '#DED4CB',
        'beige-2': '#C3B0A5',
        'beige-3': '#A9927D',
        'green-1': '#80A490',
        'green-2': '#55796D',
        'green-3': '#294D4A',
        'purple-1': '#AF929D',
        'purple-2': '#846376',
        'purple-3': '#59344F',
        'darkest': '#472D30',
        'salmone': '#E56B6F',
        'limone': '#FFE1A8',
        'baby': '#FFE8D1',
        'delete': '#e63946',
        'create': '#457b9d',
        'dark-blue': '#324149',

      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ]
}
