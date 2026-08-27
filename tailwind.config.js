/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aura: {
          cream: '#FFF8DC',
          paper: '#E8D3B0',
          orange: '#E8893A',
          gold: '#D4A72C',
          brown: '#4A3325',
          muted: '#7A5C43',
          polaroid: '#FFFDF5',
          pale: '#FFE9A8',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px -5px rgba(212, 167, 44, 0.45)',
        'glow-orange': '0 0 30px -5px rgba(232, 137, 58, 0.4)',
        'glow-warm': '0 10px 30px -5px rgba(74, 51, 37, 0.15)',
        'glass-paper': '0 8px 32px 0 rgba(74, 51, 37, 0.1)',
        'glass-dark': '0 8px 32px 0 rgba(74, 51, 37, 0.25)',
        'soft-float': '0 20px 40px -15px rgba(74, 51, 37, 0.12)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'drift-blob': 'driftBlob 14s ease-in-out infinite alternate',
        'drift-blob-reverse': 'driftBlobRev 18s ease-in-out infinite alternate',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        driftBlob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(60px, -40px) scale(1.15)' },
          '100%': { transform: 'translate(-40px, 30px) scale(0.95)' },
        },
        driftBlobRev: {
          '0%': { transform: 'translate(0px, 0px) scale(1.1)' },
          '50%': { transform: 'translate(-50px, 45px) scale(0.9)' },
          '100%': { transform: 'translate(40px, -35px) scale(1.05)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
    },
  },
  plugins: [],
}
