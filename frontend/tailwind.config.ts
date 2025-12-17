import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8edf9',
          100: '#d1dbf3',
          200: '#a3b7e7',
          300: '#7593db',
          400: '#476fcf',
          500: '#2B4593',
          600: '#233876',
          700: '#1b2a59',
          800: '#121c3c',
          900: '#0a0e1f',
        },
        secondary: {
          50: '#e8f5e8',
          100: '#d1ebd1',
          200: '#a3d7a3',
          300: '#75c375',
          400: '#47af47',
          500: '#228B22',
          600: '#1b6f1b',
          700: '#145314',
          800: '#0e380e',
          900: '#071c07',
        },
        accent: {
          50: '#f9f3ed',
          100: '#f3e7db',
          200: '#e7cfb7',
          300: '#dbb793',
          400: '#cf9f6f',
          500: '#B8834A',
          600: '#936a3b',
          700: '#6e502c',
          800: '#4a351e',
          900: '#251b0f',
        },
      },
      fontFamily: {
        sans: ['PT Sans', 'system-ui', 'sans-serif'],
        heading: ['Cabin', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      boxShadow: {
        'charity': '0 4px 6px -1px rgba(43, 69, 147, 0.1), 0 2px 4px -1px rgba(43, 69, 147, 0.06)',
        'charity-lg': '0 10px 15px -3px rgba(43, 69, 147, 0.1), 0 4px 6px -2px rgba(43, 69, 147, 0.05)',
        'charity-xl': '0 20px 25px -5px rgba(43, 69, 147, 0.1), 0 10px 10px -5px rgba(43, 69, 147, 0.04)',
      },
    },
  },
  plugins: [],
}
export default config