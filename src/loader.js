// Loader (au chargement complet du site uniquement ; les navigations swup ne le rejouent pas).
// Webflow fournit .loader et ses textes / icônes ; le script dessine les deux cercles et les deux
// ellipses, positionne tout (et au resize), puis joue :
//   1. tracé des cercles, 2. apparition des textes en décalé, 3. le carré et le rond tournent chacun
//   sur un cercle jusqu'au clic sur Enter, 4. fondu du loader pendant que l'animation d'arrivée de la
//   page démarre (les pages attendent `onReady`).
import { gsap } from 'gsap'
import { siteEase } from './easing.js'

// Rayon des cercles : fraction du plus petit entre largeur / 5.8 et hauteur (calé sur la maquette)
const RADIUS_W = 1 / 5.8
const RADIUS_H = 0.275
// Hauteur des ellipses, en fraction du rayon
const ELLIPSE_RY = 0.7
// Opacité et épaisseur (px) des tracés
const LINE_OPACITY = 0.5
const LINE_WIDTH = 0.5
// ----- Timings (s) — toutes les animations utilisent la courbe --easing de Webflow -----
// Tracé de chaque forme, et décalage entre deux formes
const DRAW = 1.5
const DRAW_STAGGER = 0.025
// Fondu d'apparition de chaque texte, et décalage entre deux textes
const TEXT_FADE = 0.3
const TEXT_STAGGER = 0.025
// Départ des textes, en secondes après le début des tracés (sans attendre leur fin)
const TEXT_START = 0.6
// Fondu d'apparition du carré et du rond, et départ (s après le début des tracés, en même temps que
// les textes par défaut)
const ORBITERS_FADE = 0.3
const ORBITERS_START = 0.9
// Durée d'un tour complet du carré / du rond sur leur cercle
const ORBIT = 12
// Sortie : fondu du contenu (tracés, textes, carré, rond), puis fondu du fond du loader
const EXIT_CONTENT = 0.3
const EXIT_LOADER = 0.3

let resolveReady
const ready = new Promise((resolve) => (resolveReady = resolve))

// Lance `fn` quand le site est prêt : tout de suite s'il n'y a pas de loader (ou s'il est passé),
// sinon au clic sur Enter
export function onReady(fn) {
  ready.then(fn)
}

export function initLoader() {
  const loader = document.querySelector('.loader')
  if (!loader) return resolveReady()

  const html = document.documentElement
  html.classList.add('is-loading')
  html.style.overflow = 'hidden'

  const logo = loader.querySelector('.loader-logo')
  const left = loader.querySelector('[data-loader-label="left"]')
  const right = loader.querySelector('[data-loader-label="right"]')
  const enter = loader.querySelector('.loader-enter')
  const square = loader.querySelector('.loader-square')
  const dot = loader.querySelector('.loader-dot')

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
  // Cercle gauche, cercle droit, ellipse gauche, ellipse droite. pathLength = 1 : le tracé s'anime
  // de 0 à 1 quelle que soit la taille (stroke-dashoffset 1 -> 0).
  const shapes = ['circle', 'circle', 'ellipse', 'ellipse'].map((tag) => {
    const shape = document.createElementNS(svgNS, tag)
    shape.setAttribute('fill', 'none')
    shape.setAttribute('stroke', 'var(--white)')
    shape.setAttribute('stroke-width', String(LINE_WIDTH))
    shape.setAttribute('vector-effect', 'non-scaling-stroke')
    shape.setAttribute('pathLength', '1')
    shape.style.strokeDasharray = '1'
    shape.style.strokeDashoffset = '1'
    svg.append(shape)
    return shape
  })
  loader.prepend(svg)

  /* ---------- Placement ---------- */

  // Carré sur le cercle gauche (départ à l'intersection du haut), rond sur le cercle droit (départ à
  // l'intersection du bas) ; orbit.a = rotation commune (deg)
  const orbit = { a: 0 }
  let geo = null

  const place = (el, x, y, rotate = 0) => {
    if (!el) return
    Object.assign(el.style, { position: 'absolute', left: '0', top: '0', margin: '0' })
    el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${rotate}deg)`
  }

  function placeOrbiters() {
    if (!geo) return
    const { cx, cy, r } = geo
    const at = (centerX, deg) => {
      const rad = (deg * Math.PI) / 180
      return [centerX + r * Math.cos(rad), cy + r * Math.sin(rad)]
    }
    place(square, ...at(cx - r / 2, -60 + orbit.a))
    place(dot, ...at(cx + r / 2, 120 + orbit.a))
  }

  function layout() {
    const cx = innerWidth / 2
    const cy = innerHeight / 2
    const r = Math.min(innerWidth * RADIUS_W, innerHeight * RADIUS_H)
    geo = { cx, cy, r }

    // Cercles tournés de -90° : leur tracé démarre en haut (les ellipses démarrent sur leur côté)
    ;[cx - r / 2, cx + r / 2].forEach((x, i) => {
      const circle = shapes[i]
      circle.setAttribute('cx', x)
      circle.setAttribute('cy', cy)
      circle.setAttribute('r', r)
      circle.setAttribute('transform', `rotate(-90 ${x} ${cy})`)

      const ellipse = shapes[i + 2]
      ellipse.setAttribute('cx', x)
      ellipse.setAttribute('cy', cy)
      ellipse.setAttribute('rx', r)
      ellipse.setAttribute('ry', r * ELLIPSE_RY)
    })

    place(logo, cx, cy)
    place(left, cx - r, cy, -90)
    place(right, cx + r, cy, -90)
    placeOrbiters()
  }

  layout()
  addEventListener('resize', layout)

  /* ---------- Animation ---------- */

  const texts = [logo, left, right, enter].filter(Boolean)
  const orbiters = [square, dot].filter(Boolean)
  gsap.set([...texts, ...orbiters], { opacity: 0 })

  const ease = siteEase()
  // Tracés ; textes, carré et rond apparaissent pendant les tracés, sans attendre leur fin
  const intro = gsap.timeline({ defaults: { ease } })
  intro
    .to(shapes, { strokeDashoffset: 0, duration: DRAW, stagger: DRAW_STAGGER }, 0)
    // Les textes démarrent TEXT_START après le début des tracés, sans attendre leur fin
    .to(texts, { opacity: 1, duration: TEXT_FADE, stagger: TEXT_STAGGER }, TEXT_START)
    .to(orbiters, { opacity: 1, duration: ORBITERS_FADE }, ORBITERS_START)

  const spin = gsap.to(orbit, { a: 360, duration: ORBIT, ease: 'none', repeat: -1, onUpdate: placeOrbiters })

  // Animations réduites (réglage du système) : loader affiché directement, carré et rond immobiles
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    intro.progress(1)
    spin.pause()
  }

  /* ---------- Entrée ---------- */

  let entered = false
  function enterSite(e) {
    if (entered) return
    entered = true
    e?.preventDefault()
    intro.kill()

    // 1. fondu du contenu ; 2. fondu du fond du loader, pendant lequel l'animation d'arrivée de la page
    // démarre ; 3. le loader est retiré
    gsap
      .timeline({ defaults: { ease } })
      .to([svg, ...texts, ...orbiters], { opacity: 0, duration: EXIT_CONTENT })
      .add(() => {
        html.classList.remove('is-loading')
        html.style.overflow = ''
        resolveReady()
      })
      .to(loader, { opacity: 0, duration: EXIT_LOADER })
      .add(() => {
        spin.kill()
        removeEventListener('resize', layout)
        removeEventListener('keydown', onKey)
        loader.remove()
      })
  }

  const onKey = (e) => e.key === 'Enter' && enterSite(e)
  enter?.addEventListener('click', enterSite)
  addEventListener('keydown', onKey)
}
