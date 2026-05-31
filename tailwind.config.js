/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FBF7F2',
        blush: {
          50: '#FDF2F4',
          100: '#FCE4E8',
          200: '#F9C9D2',
          300: '#F2A0B0',
          400: '#E97089',
          500: '#D94F6B',
          600: '#BE3553',
          700: '#9E2843',
          800: '#83243C',
          900: '#702238',
        },
        ink: {
          50: '#F6F6F7',
          100: '#E2E2E5',
          200: '#C5C5CB',
          300: '#9FA0A8',
          400: '#7A7B85',
          500: '#5E5F69',
          600: '#4A4B53',
          700: '#3D3E45',
          800: '#2A2B30',
          900: '#1A1B1F',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#3D3E45',
            a: {
              color: '#BE3553',
              '&:hover': { color: '#9E2843' },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}