// Work details : apparition des .media-item un à un à l'arrivée sur la page.
import { gsap } from 'gsap'
import { onReady } from '../loader.js'

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
    { filter: 'opacity(1)', duration: MEDIA_FADE, stagger: MEDIA_STAGGER, ease: 'none', clearProps: 'filter', paused: true }
  )
  // Démarre à la fin du loader (ou tout de suite s'il n'y en a pas / plus)
  onReady(() => fade.play())

  cleanup = () => fade.kill()
}

export function destroy() {
  cleanup?.()
  cleanup = null
}
