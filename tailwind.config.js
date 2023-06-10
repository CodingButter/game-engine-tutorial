/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        background: '#505d76',
        surface: '#232c3d',
        content: '#2f3a4f',
        hovered:'#64ff6c',
        "field":"#505d76",
      },
      textColor:{
        surface:'#64ff6c'
      },
      padding: {
        base: '8px',
        content: '14px',
      },
    },
  },
  plugins: [],
}

