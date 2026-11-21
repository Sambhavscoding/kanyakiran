/** @type {import('tailwindcss').Config} */
const colors = require('./src/constants/colors.js');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-andika)', 'Andika', 'sans-serif'],
        handwriting: ['var(--font-caveat)', 'Caveat', 'Dancing Script', 'cursive'],
      },
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        neutral: colors.neutral,
      },
    },
  },
  plugins: [],
};
