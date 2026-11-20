/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857', // Emerald header
          800: '#065f46',
        },
        paper: '#f8faf7', // soft white background
        busy: { bg: '#ecfdf5', border: '#34d399', text: '#065f46' },
        demand: { bg: '#fffbeb', border: '#fbbf24', text: '#92400e' },
        free: { bg: '#f1f5f9', border: '#94a3b8', text: '#334155' },
      },
      fontFamily: {
        sans: [
          'Noto Sans Devanagari',
          'Noto Sans',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: { base: ['1.0625rem', '1.6rem'] },
      keyframes: {
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        pop: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: { pop: 'pop .25s ease-out' },
    },
  },
  plugins: [],
};
