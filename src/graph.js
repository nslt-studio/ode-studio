// Graph de .nav-right (panneau about) : deux cercles l'un au-dessus de l'autre, le logo au centre,
// Studio / Production dans les cercles, le rond et le carré qui tournent chacun sur un cercle.
// Webflow fournit .graph et ses éléments ; le script dessine les cercles et place tout dès le chargement
// (et au resize), sans animation d'apparition. Seule la rotation tourne, quand about est ouvert.
import { gsap } from 'gsap'

// Rayon des cercles : le plus petit entre largeur * RADIUS_W et hauteur * RADIUS_H de .graph
// (l'ensemble fait 2 rayons de large et 3 de haut)
const RADIUS_W = 0.36
const RADIUS_H = 0.267
// Opacité et épaisseur (px) des tracés (reprises par le cercle central de l'horloge)
export const LINE_OPACITY = 0.2
export const LINE_WIDTH = 0.5
// Durée d'un tour complet du rond / du carré
const ORBIT = 12

let graphApi = null

// Appelé par nav.js à l'ouverture / fermeture d'about
export function setGraphOpen(open) {
  graphApi?.setOpen(open)
}

export function initGraph() {
  const graph = document.querySelector('.nav-right .graph')
  if (!graph) return

  const logo = graph.querySelector('.graph-logo')
  const top = graph.querySelector('[data-graph-label="left"]')
  const bottom = graph.querySelector('[data-graph-label="right"]')
  const square = graph.querySelector('.graph-square')
  const dot = graph.querySelector('.graph-dot')

  if (getComputedStyle(graph).position === 'static') graph.style.position = 'relative'

  /* ---------- Tracés ---------- */

  const svgNS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNS, 'svg')
  Object.assign(svg.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    height: '100%',
    overflow: 'visible',
    pointerEvents: 'none',
    opacity: String(LINE_OPACITY),
  })
  // Cercle du haut, cercle du bas
  const shapes = [0, 1].map(() => {
    const circle = document.createElementNS(svgNS, 'circle')
    circle.setAttribute('fill', 'none')
    circle.setAttribute('stroke', 'currentColor')
    circle.setAttribute('stroke-width', String(LINE_WIDTH))
    circle.setAttribute('vector-effect', 'non-scaling-stroke')
    svg.append(circle)
    return circle
  })
  graph.prepend(svg)

  /* ---------- Placement ---------- */

  // Rond sur le cercle du haut (départ à l'intersection gauche, 150°), carré sur le cercle du bas
  // (départ à l'intersection droite, -30°) ; orbit.a = rotation commune (deg)
  const orbit = { a: 0 }
  let geo = null

  const place = (el, x, y) => {
    if (!el) return
    Object.assign(el.style, { position: 'absolute', left: '0', top: '0', margin: '0' })
    el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
  }

  function placeOrbiters() {
    if (!geo) return
    const { cx, cy, r } = geo
    const at = (centerY, deg) => {
      const rad = (deg * Math.PI) / 180
      return [cx + r * Math.cos(rad), centerY + r * Math.sin(rad)]
    }
    place(dot, ...at(cy - r / 2, 150 + orbit.a))
    place(square, ...at(cy + r / 2, -30 + orbit.a))
  }

  function layout() {
    const w = graph.clientWidth
    const h = graph.clientHeight
    if (!w || !h) return
    const cx = w / 2
    const cy = h / 2
    const r = Math.min(w * RADIUS_W, h * RADIUS_H)
    geo = { cx, cy, r }

    ;[cy - r / 2, cy + r / 2].forEach((y, i) => {
      shapes[i].setAttribute('cx', cx)
      shapes[i].setAttribute('cy', y)
      shapes[i].setAttribute('r', r)
    })

    place(logo, cx, cy)
    place(top, cx, cy - r)
    place(bottom, cx, cy + r)
    placeOrbiters()
  }

  new ResizeObserver(layout).observe(graph)
  layout()

  /* ---------- Rotation ---------- */

  // Le rond et le carré tournent seulement quand about est ouvert (immobiles si animations réduites)
  const spin = gsap.to(orbit, { a: 360, duration: ORBIT, ease: 'none', repeat: -1, paused: true, onUpdate: placeOrbiters })
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

  graphApi = {
    setOpen(open) {
      open && !reduced ? spin.play() : spin.pause()
    },
  }
}
