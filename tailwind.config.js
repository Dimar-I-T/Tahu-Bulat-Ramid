/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "tbr_full": "url('/src/img/tahu__3.png')",
        "tbr_singkat": "url('/src/img/tahu__3__3.PNG')",
        "star0": "url('/src/img/star0.png')",
        "star1": "url('/src/img/star1.png')",
        "b1": "url('/src/img/b1.png')",
        "b2": "url('/src/img/b2.png')",
        "b3": "url('/src/img/b3.png')",
        "b4": "url('/src/img/b4.png')",
        "b5": "url('/src/img/b5.png')",
        "cek0": "url('/src/img/cek0.png')",
        "cek1": "url('/src/img/cek1.png')",
        "tahu0": "url('/src/img/tahu0.jpg')",
        "tahu1": "url('/src/img/tahu1.jpg')",
        "tahu2": "url('/src/img/tahu2.jpg')",
        "wa" : "url('/src/img/wa.png')"
      },

      fontFamily: {
        inconsolata: ['Inconsolata', 'monospace'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-stroke': {
          '-webkit-text-stroke': '0.1px black',
          'color': '#F4DF00',
          "font-weight": 800
        },
      }, ['responsive', 'hover']);
    },
  ],

  safelist: [
    { pattern: /bg-star[0-4]/ }, 'bg-b1', 'bg-b2', 'bg-b3', 'bg-b4', 'bg-b5'
  ],
}