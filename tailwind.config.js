/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Zilla Slab"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        paper: '#F6F3ED',
        ink: '#1C1B19',
        brand: {
          DEFAULT: '#C1121F',
          dark: '#8A0F19',
        },
        teal: {
          DEFAULT: '#1F6F78',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(28,27,25,0.04), 0 8px 24px -8px rgba(28,27,25,0.10)',
      },
    },
  },
  plugins: [],
}
