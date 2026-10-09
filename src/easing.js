// Courbe GSAP construite depuis la variable CSS --easing de Webflow (ex. cubic-bezier(0.76, 0, 0.24, 1)),
// pour que les animations GSAP aient le même rythme que les transitions CSS du site.
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(CustomEase)

// Mots-clés CSS équivalents
const KEYWORDS = {
  ease: [0.25, 0.1, 0.25, 1],
  linear: [0, 0, 1, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
}

let cached = null

// Nom de la courbe à passer en `ease` ; 'power2.inOut' si --easing est absent ou illisible
export function siteEase() {
  if (cached) return cached
  const value = getComputedStyle(document.documentElement).getPropertyValue('--easing').trim()
  const match = value.match(/cubic-bezier\(([^)]+)\)/)
  const points = match ? match[1].split(',').map(Number) : KEYWORDS[value]
  if (!points || points.length !== 4 || points.some(Number.isNaN)) return 'power2.inOut'
  const [x1, y1, x2, y2] = points
  CustomEase.create('site', `M0,0 C${x1},${y1} ${x2},${y2} 1,1`)
  cached = 'site'
  return cached
}
