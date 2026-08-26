/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luna: {
          ice: '#A7EBF2',
          sky: '#54ACBF',
          ocean: '#26658C',
          deep: '#023859',
          midnight: '#011C40',
          cream: '#FAFBFD',
          creamAlt: '#F0F6F8',
          cardLight: '#FFFFFF',
          cardDark: 'rgba(2, 56, 89, 0.65)',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glow-ice': '0 0 25px -5px rgba(167, 235, 242, 0.45)',
        'glow-sky': '0 0 30px -5px rgba(84, 172, 191, 0.4)',
        'glow-ocean': '0 10px 30px -5px rgba(38, 101, 140, 0.5)',
        'glass-dark': '0 8px 32px 0 rgba(1, 28, 64, 0.37)',
        'glass-light': '0 8px 32px 0 rgba(38, 101, 140, 0.08)',
        'soft-float': '0 20px 40px -15px rgba(1, 28, 64, 0.15)',
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
