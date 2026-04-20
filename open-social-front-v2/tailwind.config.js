/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        fade: 'fadeIn .3s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out both',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require('daisyui')],
  daisyui: {
    themes: [
      {
        opensocial: {
          'primary': '#0D9488',
          'primary-content': '#FFFFFF',
          'secondary': '#F97316',
          'secondary-content': '#FFFFFF',
          'accent': '#8B5CF6',
          'accent-content': '#FFFFFF',
          'neutral': '#334155',
          'neutral-content': '#F8FAFC',
          'base-100': '#FFFFFF',
          'base-200': '#F8FAFC',
          'base-300': '#E2E8F0',
          'base-content': '#1E293B',
          'info': '#38BDF8',
          'success': '#22C55E',
          'warning': '#FBBF24',
          'error': '#EF4444',
        },
      },
      {
        'opensocial-dark': {
          'primary': '#2DD4BF',
          'primary-content': '#0F172A',
          'secondary': '#FB923C',
          'secondary-content': '#0F172A',
          'accent': '#A78BFA',
          'accent-content': '#0F172A',
          'neutral': '#1E293B',
          'neutral-content': '#F8FAFC',
          'base-100': '#0F172A',
          'base-200': '#1E293B',
          'base-300': '#334155',
          'base-content': '#F1F5F9',
          'info': '#38BDF8',
          'success': '#22C55E',
          'warning': '#FBBF24',
          'error': '#EF4444',
        },
      },
    ],
    darkTheme: 'opensocial-dark',
  },
}
