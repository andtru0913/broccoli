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
  theme: {

    extend: {
      textColor: {
        skin: {
          base: withOpacity('--color-text-base'),
          muted: withOpacity('--color-text-muted'),
          inverted: withOpacity('--color-text-inverted'),
        },
      },
      backgroundColor: {
        skin: {
          fill: withOpacity('--color-fill'),
          first: withOpacity('--color-first'),
          sec: withOpacity('--color-secondary'),
          third: withOpacity('--color-third'),
          'button-accent': withOpacity('--color-button-accent'),
          'button-accent-hover': withOpacity('--color-button-accent-hover'),
          'button-muted': withOpacity('--color-button-muted'),
        },
      },
      gradientColorStops: {
        skin: {
          hue: withOpacity('--color-fill'),
        },
      },
      screens: {
        'tablet': '640px',
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

      },
    },
  },
  plugins: [
    require("flowbite/plugin")
  ]
}