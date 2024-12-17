/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'grid-pattern': `linear-gradient(to right, #272727 1px, transparent 1px),
                        linear-gradient(to bottom, #272727 1px, transparent 1px)`
      },
      backgroundSize: {
        'grid-size': '40px 40px' // Adjust the grid size as needed
      }
    }
  },
  plugins: [],
  variants: {
    extend: {
      scrollbar: ['rounded']
    }
  },
  safelist: [
    // Add class for overflow hidden
    'overflow-hidden'
  ]
}
