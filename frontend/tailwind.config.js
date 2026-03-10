/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Lato"', 'sans-serif'],
      },
      colors: {
        sky: {
          deep: '#03071E',
          mid: '#0A0E2A',
          horizon: '#1A1040',
        },
        lantern: {
          hopeful: '#FFD166',
          nostalgic: '#F4A261',
          healing: '#A8DADC',
          dream: '#C77DFF',
          gratitude: '#FF85A1',
        }
      },
      animation: {
        'float-up': 'floatUp 20s linear forwards',
        'flicker': 'flicker 3s ease-in-out infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'shooting-star': 'shootingStar 1.5s ease-out forwards',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'rise': 'rise 2s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '1' },
          '100%': { transform: 'translateY(-120vh) translateX(var(--drift))', opacity: '0' }
        },
        flicker: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(0.97)' }
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.2', transform: 'scale(0.8)' }
        },
        shootingStar: {
          '0%': { transform: 'translateX(0) translateY(0)', opacity: '1', width: '0px' },
          '100%': { transform: 'translateX(300px) translateY(150px)', opacity: '0', width: '120px' }
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        rise: {
          '0%': { transform: 'translateY(60px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px currentColor', opacity: '0.8' },
          '50%': { boxShadow: '0 0 40px currentColor', opacity: '1' }
        }
      }
    }
  },
  plugins: []
}