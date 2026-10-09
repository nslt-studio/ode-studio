// Journal details : apparition des .media-item un à un à l'arrivée sur la page.
import { gsap } from 'gsap'

// Durée (s) du fondu de chaque média et décalage (s) entre deux médias
const MEDIA_FADE = 0.5
const MEDIA_STAGGER = 0.08

let cleanup = null

export function init(container) {
  const medias = [...container.querySelectorAll('.media-item')]
  // Pas d'animation si le visiteur a demandé à réduire les animations (réglage du système)
  if (!medias.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // Fondu via filter: opacity() pour ne pas toucher à l'opacité définie dans Webflow
  const fade = gsap.fromTo(
    medias,
    { filter: 'opacity(0)' },
    { filter: 'opacity(1)', duration: MEDIA_FADE, stagger: MEDIA_STAGGER, ease: 'none', clearProps: 'filter' }
  )

  cleanup = () => fade.kill()
}

export function destroy() {
  cleanup?.()
  cleanup = null
}
