/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Noto Serif TC"', 'serif'],
        sans: ['"Noto Sans TC"', 'sans-serif'],
      },
      colors: {
        forest: {
          DEFAULT: 'oklch(0.32 0.06 160)',
          light: 'oklch(0.42 0.06 160)',
        },
        gold: {
          DEFAULT: 'oklch(0.72 0.1 80)',
          light: 'oklch(0.85 0.06 80)',
        },
        cream: 'oklch(0.98 0.005 80)',
        ink: {
          DEFAULT: 'oklch(0.22 0.01 60)',
          light: 'oklch(0.45 0.01 60)',
        },
      },
    },
  },
  plugins: [],
}
