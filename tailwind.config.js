/** @type {import('tailwindcss').Config} */
module.exports = {
  experimental: {
    optimizeUniversalDefaults: true
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'inter': ['Inter', 'system-ui'],
      'fira': ['Fira Code', 'system-ui'],
      'monospace': ['monospace', 'system-ui']
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
      },
      fontSize: {
        '2xs': '0.625rem'
      },
    }
  },
  plugins: [],
  experimental: {
    optimizeUniversalDefaults: true
  }
}

