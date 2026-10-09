// Loader (au chargement complet du site uniquement ; les navigations swup ne le rejouent pas).
// Webflow fournit .loader (fond plein écran) et .loader-logo. Séquence, inspirée de contrario.xyz :
// le logo apparaît par paliers d'opacité (0.33, 0.66, 1), chaque palier se dévoilant de gauche à droite
// (clip-path) par-dessus le précédent ; il reste affiché, disparaît en fondu, puis le fond du loader
// disparaît en fondu pendant que l'animation d'arrivée de la page démarre (les pages attendent `onReady`).
import { gsap } from 'gsap'
import { siteEase } from './easing.js'

// Paliers d'opacité du logo, dans l'ordre
const STEPS = [0.33, 0.66, 1]
// ----- Timings (s) -----
// Attente avant le premier palier
const DELAY = 0.6
// Temps entre le début de deux paliers, et durée du dévoilement gauche -> droite de chaque palier
const STEP_INTERVAL = 0.6
const STEP_WIPE = 0.6
// Durée pendant laquelle le logo reste à 1, puis fondu de disparition du logo
const HOLD = 0.6
const LOGO_FADE_OUT = 0.6
// Écran vide, puis fondu du fond du loader
const EXIT_PAUSE = 0.6
const EXIT_LOADER = 0.6

let resolveReady
const ready = new Promise((resolve) => (resolveReady = resolve))

// Lance `fn` quand le site est prêt : tout de suite s'il n'y a pas de loader (ou s'il est passé),
// sinon au début du fondu du fond du loader
export function onReady(fn) {
  ready.then(fn)
}

export function initLoader() {
  const loader = document.querySelector('.loader')
  if (!loader) return resolveReady()

  const html = document.documentElement
  html.classList.add('is-loading')
  html.style.overflow = 'hidden'

  function done() {
    html.classList.remove('is-loading')
    html.style.overflow = ''
    resolveReady()
  }

  // Animations réduites (réglage du système) : pas de loader
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    loader.remove()
    return done()
  }

  const logo = loader.querySelector('.loader-logo')
  const ease = siteEase()
  const tl = gsap.timeline()

  if (logo) {
    // Une couche par palier, empilées (copies du contenu de .loader-logo), chacune à son opacité.
    // flex : l'image se cale en haut de sa couche (en ligne, elle serait décalée et coupée par le clip)
    if (getComputedStyle(logo).position === 'static') logo.style.position = 'relative'
    const content = [...logo.childNodes]
    const layers = STEPS.map((opacity, i) => {
      const layer = document.createElement('div')
      if (i === 0) layer.append(...content)
      else layer.append(...content.map((node) => node.cloneNode(true)))
      Object.assign(layer.style, { display: 'flex', position: i === 0 ? 'relative' : 'absolute', inset: '0', height: '100%', opacity: String(opacity) })
      return layer
    })
    logo.append(...layers)

    // inset(haut droite bas gauche). Pendant le palier i, la nouvelle couche se dévoile de gauche à
    // droite pendant que la précédente se rogne d'autant par la gauche : chaque zone du logo n'affiche
    // qu'une couche (les opacités ne s'additionnent pas)
    gsap.set(layers, { clipPath: 'inset(0% 100% 0% 0%)' })
    gsap.set(logo, { opacity: 1 })
    layers.forEach((layer, i) => {
      const previous = layers[i - 1]
      const wipe = { p: 0 }
      tl.to(
        wipe,
        {
          p: 1,
          duration: STEP_WIPE,
          ease,
          onUpdate: () => {
            layer.style.clipPath = `inset(0% ${(1 - wipe.p) * 100}% 0% 0%)`
            if (previous) previous.style.clipPath = `inset(0% 0% 0% ${wipe.p * 100}%)`
          },
        },
        DELAY + i * STEP_INTERVAL
      )
    })
    tl.to(logo, { opacity: 0, duration: LOGO_FADE_OUT, ease }, `+=${HOLD}`)
  }

  tl.add(done, `+=${EXIT_PAUSE}`)
    .to(loader, { opacity: 0, duration: EXIT_LOADER, ease })
    .add(() => loader.remove())
}
