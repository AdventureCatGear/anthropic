/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        reef: {
          teal: '#0D9488',
          cyan: '#06B6D4',
          ocean: '#0369A1',
          aqua: '#22D3EE',
          deep: '#164E63',
          sand: '#FCD34D',
          coral: '#F97316',
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'wave': 'wave 4s ease-in-out infinite',
        'bubble': 'bubble 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateX(10px) rotate(2deg)' },
          '75%': { transform: 'translateX(-10px) rotate(-2deg)' },
        },
        bubble: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.8' },
          '50%': { opacity: '0.4' },
          '100%': { transform: 'translateY(-100px) scale(0.5)', opacity: '0' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        }
      }
    },
  },
  plugins: [],
}
