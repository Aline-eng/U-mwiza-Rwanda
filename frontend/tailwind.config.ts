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
        // Legacy palette (kept for backward compat)
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
        // Dark theme semantic tokens
        dark: {
          bg: '#020617',
          surface: '#0F172A',
          card: '#0F172A',
          border: '#1E293B',
          hover: '#1E293B',
        },
        electric: {
          DEFAULT: '#3B82F6',
          dim: 'rgba(59,130,246,0.15)',
          500: '#3B82F6',
          600: '#2563EB',
        },
        neon: {
          green: '#10B981',
          dim: 'rgba(16,185,129,0.15)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tight: '-0.02em',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'shimmer': 'shimmer 2s infinite linear',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'counter': 'counter 2s ease-out forwards',
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
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59,130,246,0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(59,130,246,0.35)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        // Legacy
        'charity': '0 4px 6px -1px rgba(43, 69, 147, 0.1), 0 2px 4px -1px rgba(43, 69, 147, 0.06)',
        'charity-lg': '0 10px 15px -3px rgba(43, 69, 147, 0.1), 0 4px 6px -2px rgba(43, 69, 147, 0.05)',
        'charity-xl': '0 20px 25px -5px rgba(43, 69, 147, 0.1), 0 10px 10px -5px rgba(43, 69, 147, 0.04)',
        // Dark theme
        'glow-blue': '0 0 30px rgba(59,130,246,0.2)',
        'glow-emerald': '0 0 30px rgba(16,185,129,0.2)',
        'glow-amber': '0 0 30px rgba(245,158,11,0.2)',
        'card-dark': '0 4px 24px rgba(0,0,0,0.5)',
        'card-dark-lg': '0 8px 40px rgba(0,0,0,0.6)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(30,41,59,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,0.4) 1px, transparent 1px)",
        'dot-pattern': "radial-gradient(circle, rgba(59,130,246,0.12) 1px, transparent 1px)",
        'hero-gradient': "linear-gradient(135deg, rgba(2,6,23,0.85) 0%, rgba(15,23,42,0.75) 100%)",
        'gradient-radial': "radial-gradient(var(--tw-gradient-stops))",
        'blue-glow-radial': "radial-gradient(ellipse at center, rgba(59,130,246,0.15) 0%, transparent 70%)",
        'emerald-glow-radial': "radial-gradient(ellipse at center, rgba(16,185,129,0.15) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
}
export default config
