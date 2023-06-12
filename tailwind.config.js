/** @type {import('tailwindcss').Config} */

function sb2sl([s, b]) {
  const sl = []
  var l = ((2 - s / 100) * b) / 2 // Lightness range 0-100
  sl[0] = Math.round((s * b) / (l < 50 ? l * 2 : 200 - l * 2)) | 0
  sl[1] = Math.round(l)
  return sl
}

function generateNeutrals(hue){
  const shades = {}
  const sb = [
    [55, 6],
    [49, 7],
    [43, 8],
    [36, 9],
    [29, 10],
    [23, 12],
    [17, 14],
    [14, 18],
    [11, 23],
    [8,  26],
    [6,  38],
    [5,  49],
    [5,  60],
    [4,  70],
    [2, 81],
    [1, 90],
    [0, 100]
  ]
  sb.map(sb2sl).forEach(([sat, bright], index) => {
      const key = 1000 - (index * 50 + 50)
      shades[key] = `hsla(${hue},${sat}%,${bright}%,1)`
    })
  return shades
}

function generateShades(hue) {
  const shades = {}
  const sb = [
    [100, 24],
    [97, 41],
    [95, 57],
    [93, 73],
    [90, 90],
    [78, 94],
    [63, 97],
    [40, 97],
    [8, 100]
  ]
    sb.map(sb2sl)
    .forEach(([sat, bright], index) => {
      const key = 1000 - (index * 100 + 100)
      shades[key] = `hsla(${hue},${sat}%,${bright}%,1)`
    })
  return shades
}

// const Colors = {
//   neutral: {
//     150: "hsla(146,0%,100%,1)", 
//     200: "hsla(146,4%,90%,1)", 
//     250: "hsla(146,4%,80%,1)", 
//     300: "hsla(146,4%,69%,1)", 
//     350: "hsla(146,4%,59%,1)", 
//     400: "hsla(146,3%,48%,1)", 
//     450: "hsla(146,3%,37%,1)", 
//     500: "hsla(146,4%,25%,1)", 
//     550: "hsla(146,6%,22%,1)", 
//     600: "hsla(146,8%,17%,1)", 
//     650: "hsla(146,9%,13%,1)", 
//     700: "hsla(146,13%,11%,1)", 
//     750: "hsla(146,17%,9%,1)", 
//     800: "hsla(146,22%,7%,1)", 
//     850: "hsla(146,27%,6%,1)", 
//     900: "hsla(146,32%,5%,1)", 
//     950: "hsla(146,38%,4%,1)"
//   },
//   brand: {
//     100: "hsla(97,100%,96%,1)", 
//     200: "hsla(97,87%,78%,1)", 
//     300: "hsla(97,91%,66%,1)", 
//     400: "hsla(97,86%,57%,1)", 
//     500: "hsla(97,82%,50%,1)", 
//     600: "hsla(97,87%,39%,1)", 
//     700: "hsla(97,90%,30%,1)", 
//     800: "hsla(97,94%,21%,1)", 
//     900: "hsla(97,100%,12%,1)"
//   },
//   success: {
//     100: "hsla(70,100%,96%,1)", 
//     200: "hsla(70,87%,78%,1)", 
//     300: "hsla(70,91%,66%,1)", 
//     400: "hsla(70,86%,57%,1)", 
//     500: "hsla(70,82%,50%,1)", 
//     600: "hsla(70,87%,39%,1)", 
//     700: "hsla(70,90%,30%,1)", 
//     800: "hsla(70,94%,21%,1)", 
//     900: "hsla(70,100%,12%,1)"
//   },
//   info: {
//     100: "hsla(190,100%,96%,1)", 
//     200: "hsla(190,87%,78%,1)", 
//     300: "hsla(190,91%,66%,1)", 
//     400: "hsla(190,86%,57%,1)", 
//     500: "hsla(190,82%,50%,1)", 
//     600: "hsla(190,87%,39%,1)", 
//     700: "hsla(190,90%,30%,1)", 
//     800: "hsla(190,94%,21%,1)", 
//     900: "hsla(190,100%,12%,1)"
//   },
//   warn: {
//     100: "hsla(60,100%,96%,1)", 
//     200: "hsla(60,87%,78%,1)", 
//     300: "hsla(60,91%,66%,1)", 
//     400: "hsla(60,86%,57%,1)", 
//     500: "hsla(60,82%,50%,1)", 
//     600: "hsla(60,87%,39%,1)", 
//     700: "hsla(60,90%,30%,1)", 
//     800: "hsla(60,94%,21%,1)", 
//     900: "hsla(60,100%,12%,1)"
//   },
//   error: {
//     100: "hsla(1,100%,96%,1)", 
//     200: "hsla(1,87%,78%,1)", 
//     300: "hsla(1,91%,66%,1)", 
//     400: "hsla(1,86%,57%,1)", 
//     500: "hsla(1,82%,50%,1)", 
//     600: "hsla(1,87%,39%,1)", 
//     700: "hsla(1,90%,30%,1)", 
//     800: "hsla(1,94%,21%,1)", 
//     900: "hsla(1,100%,12%,1)"
//   }
// };

const Colors = {
  neutral: generateNeutrals(146),
  brand: generateShades(97),
  success: generateShades(70),
  info: generateShades(190),
  warn: generateShades(60),
  error: generateShades(1),
}

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: Colors,
      borderColor: Colors,
      textColor: Colors,
    },
  },
  plugins: ['@headlessui/tailwindcss'],
}