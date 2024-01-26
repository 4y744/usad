/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'inter': ['Inter', 'system-ui']
    },
    extend: {
      transitionProperty: {
        'max-height': 'max-height',
        'height': 'height',
        'width': 'width',
        'background': 'background',
        'padding': 'padding',
        'border': 'border',
        'rounded': 'border-radius'
      },
      backgroundImage: {
        'home-headline': "url('/src/assets/svgs/home-headline.svg')",
      }
    }
  },
  plugins: [],
}

