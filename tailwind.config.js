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
      shades[`neutral-${key}`] = `hsla(${hue},${sat}%,${bright}%,1)`
    })
  return shades
}

function generateShades(name,hue) {
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
      shades[`${name}-${key}`] = `hsla(${hue},${sat}%,${bright}%,1)`
    })
  const defaultSahade = sb2sl(sb[4])
  shades[name] = `hsla(${hue},${defaultSahade[0]}%,${defaultSahade[1]}%,1))`
  return shades
}

const Colors = {
  ...generateNeutrals(146),
  ...generateShades("primary",97),
  ...generateShades("success",70),
  ...generateShades("info",190),
  ...generateShades("warning",60),
  ...generateShades("danger",1),
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
  plugins: [],
}