// Loader (au chargement complet du site uniquement ; les navigations swup ne le rejouent pas).
// Webflow fournit .loader et ses textes / icônes ; le script dessine les deux cercles et les deux
// ellipses, positionne tout (et au resize), puis joue :
//   1. apparition des textes en décalé, 2. tracé des cercles, 3. le carré et le rond apparaissent et
//   tournent chacun sur un cercle, avec le bouton Enter ; au clic sur Enter, 4. fondu du loader pendant que l'animation d'arrivée de la
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
// Une forme sur deux se trace dans l'autre sens (cercle droit et ellipse droite) ; false = toutes
// dans le même sens
const ALTERNATE = true
// ----- Timings (s) — toutes les animations utilisent la courbe --easing de Webflow -----
// Ordre : 1. Studio, Production et logo ensemble, 2. tracés des cercles, 3. carré + rond + bouton Enter.
// Les départs (*_START) sont en secondes depuis le début du loader.
// Fondu d'apparition des textes (tous ensemble, à 0)
const TEXT_FADE = 0.3
// Tracé de chaque forme, décalage entre deux formes, et départ
const DRAW = 1.5
const DRAW_STAGGER = 0.025
const DRAW_START = 0.15
// Fondu d'apparition du carré, du rond et du bouton Enter, et départ
const ORBITERS_FADE = 0.3
const ORBITERS_START = 0.9
// Durée d'un tour complet du carré / du rond sur leur cercle
const ORBIT = 12
// Sortie : fondu du contenu (tracés, textes, carré, rond), puis fondu du fond du loader
const EXIT_CONTENT = 0.3
const EXIT_LOADER = 0.3
// Pause entre les deux (le fond reste seul à l'écran)
const EXIT_PAUSE = 0.3

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
  // Cercle gauche, cercle droit, ellipse gauche, ellipse droite. Le tracé s'anime via draws[i].p
  // (0 -> 1), converti en stroke-dasharray / dashoffset en px d'après la longueur réelle de la forme
  // (pas de pathLength ni de dashoffset négatif : Safari / iOS les gèrent mal).
  const shapes = ['circle', 'circle', 'ellipse', 'ellipse'].map((tag) => {
    const shape = document.createElementNS(svgNS, tag)
    shape.setAttribute('fill', 'none')
    shape.setAttribute('stroke', 'var(--white)')
    shape.setAttribute('stroke-width', String(LINE_WIDTH))
    shape.setAttribute('vector-effect', 'non-scaling-stroke')
    svg.append(shape)
    return shape
  })
  // Progression du tracé (0 -> 1) et longueur (px) de chaque forme
  const draws = shapes.map(() => ({ p: 0, length: 0 }))

  function applyDraw() {
    draws.forEach(({ p, length }, i) => {
      // +1 px : aucun point visible au départ, aucune jointure visible à la fin
      const dash = length + 1
      shapes[i].style.strokeDasharray = `${dash} ${dash}`
      shapes[i].style.strokeDashoffset = String(dash * (1 - p))
    })
  }
  loader.prepend(svg)

  /* ---------- Placement ---------- */

  // Carré sur le cercle gauche (départ à son extrémité gauche, 180°), rond sur le cercle droit (départ
  // à son extrémité droite, 0°) ; orbit.a = rotation commune (deg)
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
    place(square, ...at(cx - r / 2, 180 + orbit.a))
    place(dot, ...at(cx + r / 2, 0 + orbit.a))
  }

  function layout() {
    const cx = innerWidth / 2
    const cy = innerHeight / 2
    const r = Math.min(innerWidth * RADIUS_W, innerHeight * RADIUS_H)
    geo = { cx, cy, r }

    // Cercles tournés de -90° : leur tracé démarre en haut (les ellipses démarrent sur leur côté).
    // Formes de droite avec ALTERNATE : retournées en miroir (même point de départ, sens inverse).
    ;[cx - r / 2, cx + r / 2].forEach((x, i) => {
      const reverse = ALTERNATE && i === 1
      const around = (t) => `translate(${x} ${cy}) ${t} translate(${-x} ${-cy})`
      const ry = r * ELLIPSE_RY

      const circle = shapes[i]
      circle.setAttribute('cx', x)
      circle.setAttribute('cy', cy)
      circle.setAttribute('r', r)
      circle.setAttribute('transform', around(reverse ? 'scale(-1 1) rotate(-90)' : 'rotate(-90)'))
      draws[i].length = 2 * Math.PI * r

      const ellipse = shapes[i + 2]
      ellipse.setAttribute('cx', x)
      ellipse.setAttribute('cy', cy)
      ellipse.setAttribute('rx', r)
      ellipse.setAttribute('ry', ry)
      ellipse.setAttribute('transform', reverse ? around('scale(1 -1)') : '')
      // Périmètre de l'ellipse (approximation de Ramanujan)
      draws[i + 2].length = Math.PI * (3 * (r + ry) - Math.sqrt((3 * r + ry) * (r + 3 * ry)))
    })
    applyDraw()

    place(logo, cx, cy)
    place(left, cx - r, cy, -90)
    place(right, cx + r, cy, -90)
    placeOrbiters()
  }

  layout()
  addEventListener('resize', layout)

  /* ---------- Animation ---------- */

  // Studio (gauche), Production (droite), logo
  const texts = [left, right, logo].filter(Boolean)
  const orbiters = [square, dot].filter(Boolean)
  const all = [...texts, ...orbiters, enter].filter(Boolean)
  gsap.set(all, { opacity: 0 })

  const ease = siteEase()
  // Textes, puis tracés des cercles, puis carré, rond et bouton Enter
  const intro = gsap.timeline({ defaults: { ease } })
  intro
    .to(texts, { opacity: 1, duration: TEXT_FADE }, 0)
    .to(draws, { p: 1, duration: DRAW, stagger: DRAW_STAGGER, onUpdate: applyDraw }, DRAW_START)
    .to([...orbiters, enter].filter(Boolean), { opacity: 1, duration: ORBITERS_FADE }, ORBITERS_START)

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

    // 1. fondu du contenu ; 2. pause EXIT_PAUSE ; 3. fondu du fond du loader, pendant lequel l'animation
    // d'arrivée de la page démarre ; 4. le loader est retiré
    gsap
      .timeline({ defaults: { ease } })
      .to([svg, ...all], { opacity: 0, duration: EXIT_CONTENT })
      .add(() => {
        html.classList.remove('is-loading')
        html.style.overflow = ''
        resolveReady()
      }, `+=${EXIT_PAUSE}`)
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
