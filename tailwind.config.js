/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'xxs': '375',
        'xxxs': '320',
      },
      colors: {
        'success-text': "#4ade80",
        'success-bg': "#f0fdf4",
        'error-text': "#f87171",
        'error-bg': "#fef2f2",
        'warning-text': "#facc15",
        'warning-bg': "#fefce8",
      },
      keyframes: {
        slideToLeft: {
          '0%': { transform: 'translateX(200%)' },
          '100%': { transform: 'translateX(0)' },
        }
      },
      animation: {
        'slite-to-left': 'slideToLeft .5s linear',
      },
    },
  },
  plugins: [],
}
