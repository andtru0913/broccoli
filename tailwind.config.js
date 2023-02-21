/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (!opacityValue) {
      return `rgb(var(${variableName}))`;
    }
    return `rgba(var(${variableName}), ${opacityValue})`;
  };
}

module.exports = {
  important: true,
  darkMode: "media",

  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],

  variants: {
    animation: ["motion-safe"],
  },

  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 3s ease-in-out forwards",
        fadeInRight: "fadeInRight 1s ease-in-out forwards",
        fadeInRightOut: "fadeInRightOut 1s ease-in-out forwards",
        fadeInLeft: "fadeInLeft 1s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInRight: {
          "0%": { opacity: 0, transform: "translate(75%,0)" },
          "100%": { opacity: 1 },
        },
        fadeInRightOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0, transform: "translate(75%, 25%)" },
        },
        fadeInLeft: {
          "0%": { opacity: 0, transform: "translate(-75%,75%)" },
          "100%": { opacity: 1 },
        },
      },

      textColor: {
        "color-base": withOpacity("--color-text-base"),
        muted: withOpacity("--color-text-muted"),
        inverted: withOpacity("--color-text-inverted"),
        "inverted-muted": withOpacity("--color-text-inverted-muted"),
        fill: withOpacity("--color-fill"),
        "fill-1": withOpacity("--color-fill-1"),
        "fill-2": withOpacity("--color-fill-2"),
        "primary-1": withOpacity("--color-primary-1"),
        "primary-l1": withOpacity("--color-primary-l1"),
        "primary-l2": withOpacity("--color-primary-l2"),
        "primary-d1": withOpacity("--color-primary-d1"),
        "primary-d2": withOpacity("--color-primary-d2"),
        "secondary-1": withOpacity("--color-secondary-1"),
        "secondary-l1": withOpacity("--color-secondary-l1"),
        "secondary-l2": withOpacity("--color-secondary-l2"),
        "secondary-d1": withOpacity("--color-secondary-d1"),
        "secondary-d2": withOpacity("--color-secondary-d2"),
        "tertiary-1": withOpacity("--color-tertiary-1"),
        "tertiary-l1": withOpacity("--color-tertiary-l1"),
        "tertiary-l2": withOpacity("--color-tertiary-l2"),
        "tertiary-d1": withOpacity("--color-tertiary-d1"),
        "tertiary-d2": withOpacity("--color-tertiary-d2"),
      },
      fill: {
        fill: withOpacity("--color-fill"),
        "fill-1": withOpacity("--color-fill-1"),
        "fill-2": withOpacity("--color-fill-2"),
        "primary-1": withOpacity("--color-primary-1"),
        "primary-l1": withOpacity("--color-primary-l1"),
        "primary-l2": withOpacity("--color-primary-l2"),
        "primary-d1": withOpacity("--color-primary-d1"),
        "primary-d2": withOpacity("--color-primary-d2"),
        "secondary-1": withOpacity("--color-secondary-1"),
        "secondary-l1": withOpacity("--color-secondary-l1"),
        "secondary-l2": withOpacity("--color-secondary-l2"),
        "secondary-d1": withOpacity("--color-secondary-d1"),
        "secondary-d2": withOpacity("--color-secondary-d2"),
        "tertiary-1": withOpacity("--color-tertiary-1"),
        "tertiary-l1": withOpacity("--color-tertiary-l1"),
        "tertiary-l2": withOpacity("--color-tertiary-l2"),
        "tertiary-d1": withOpacity("--color-tertiary-d1"),
        "tertiary-d2": withOpacity("--color-tertiary-d2"),
      },
      backgroundColor: {
        "color-base": withOpacity("--color-text-base"),
        muted: withOpacity("--color-text-muted"),
        inverted: withOpacity("--color-text-inverted"),
        "inverted-muted": withOpacity("--color-text-inverted-muted"),
        fill: withOpacity("--color-fill"),
        "fill-1": withOpacity("--color-fill-1"),
        "fill-2": withOpacity("--color-fill-2"),
        "fill-3": withOpacity("--color-fill-3"),
        "primary-1": withOpacity("--color-primary-1"),
        "primary-l1": withOpacity("--color-primary-l1"),
        "primary-l2": withOpacity("--color-primary-l2"),
        "primary-d1": withOpacity("--color-primary-d1"),
        "primary-d2": withOpacity("--color-primary-d2"),
        "secondary-1": withOpacity("--color-secondary-1"),
        "secondary-l1": withOpacity("--color-secondary-l1"),
        "secondary-l2": withOpacity("--color-secondary-l2"),
        "secondary-d1": withOpacity("--color-secondary-d1"),
        "secondary-d2": withOpacity("--color-secondary-d2"),
        "tertiary-1": withOpacity("--color-tertiary-1"),
        "tertiary-l1": withOpacity("--color-tertiary-l1"),
        "tertiary-l2": withOpacity("--color-tertiary-l2"),
        "tertiary-d1": withOpacity("--color-tertiary-d1"),
        "tertiary-d2": withOpacity("--color-tertiary-d2"),
      },

      gradientColorStops: {
        hue: withOpacity("--color-primary-1"),
        no: withOpacity("--color-secondary-1"),
      },
      screens: {
        // => @media (min-width: 640px) { ... }
        "dark-mode": { raw: "(prefers-color-scheme: dark)" },
      },
      fontSize: {
        "2xs": "0.75rem",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        fill: withOpacity("--color-fill"),
        "fill-1": withOpacity("--color-fill-1"),
        "fill-2": withOpacity("--color-fill-2"),
        "primary-1": withOpacity("--color-primary-1"),
        "primary-l1": withOpacity("--color-primary-l1"),
        "primary-l2": withOpacity("--color-primary-l2"),
        "primary-d1": withOpacity("--color-primary-d1"),
        "primary-d2": withOpacity("--color-primary-d2"),
        "secondary-1": withOpacity("--color-secondary-1"),
        "secondary-l1": withOpacity("--color-secondary-l1"),
        "secondary-l2": withOpacity("--color-secondary-l2"),
        "secondary-d1": withOpacity("--color-secondary-d1"),
        "secondary-d2": withOpacity("--color-secondary-d2"),
        "tertiary-1": withOpacity("--color-tertiary-1"),
        "tertiary-l1": withOpacity("--color-tertiary-l1"),
        "tertiary-l2": withOpacity("--color-tertiary-l2"),
        "tertiary-d1": withOpacity("--color-tertiary-d1"),
        "tertiary-d2": withOpacity("--color-tertiary-d2"),
      },
      maxWidth: {
        readable: "65ch",
      },
    },
  },

  plugins: [require("@tailwindcss/line-clamp")],
};
