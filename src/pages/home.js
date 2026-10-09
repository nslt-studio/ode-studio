// Home : roue des .selected-item dans .selected-list.
// Les items sont posés sur un cercle dont le centre est à droite de l'écran : l'item actif est pile au
// centre, les voisins apparaissent au-dessus et en dessous, inclinés.
// Chaque item a un .selected-media (plein écran, opacity 0 dans Webflow) : celui de l'item actif passe
// à 1, sans transition. Les vidéos ne tournent que pour l'item actif.
// Glisser (souris / tactile) avec inertie, molette / trackpad, flèches du clavier, clic sur un voisin ;
// la roue finit toujours aimantée sur un item.
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { onReady } from '../loader.js'
import { playClick } from '../sound.js'

gsap.registerPlugin(Draggable, InertiaPlugin)

// Angle (deg) entre deux items sur la roue
const ANGLE = 20
// Opacité selon l'écart avec l'item actif : actif, voisins directs, voisins suivants (au-delà : le
// dernier palier). Changement en 300ms var(--easing) à chaque nouvel item actif.
const OPACITIES = [1, 0.5, 0.1]
// Rayon de la roue, en fraction de la hauteur d'écran
const RADIUS = 0.75
// .line : largeur minimale (fraction de sa largeur pleine) quand la roue est à mi-chemin entre deux
// items ; elle revient linéairement à 100 % quand un item est pile au centre
const LINE_MIN = 0.75
// Distance de glisser (px) pour passer d'un item au suivant
const DRAG = 400
// Espace minimum (px) entre deux items, quelle que soit la taille de la fenêtre
const MIN_GAP = 40
// Nombre d'items rendus de chaque côté de l'actif (les autres sont masqués)
const VISIBLE = 2.5
// Animation d'arrivée : la roue est déjà lancée à pleine vitesse quand la page apparaît, et l'on ne voit
// que sa fin (décélération jusqu'au premier item). INTRO_STEPS : items parcourus (0 = pas d'animation) ;
// INTRO_DURATION : durée (s) ; INTRO_EASE : courbe, très rapide au début pour donner l'impression d'un
// mouvement déjà en cours.
const INTRO_STEPS = 3
const INTRO_DURATION = 1.5
const INTRO_EASE = 'expo.out'

let cleanup = null

export function init(container) {
  const list = container.querySelector('.selected-list')
  const items = [...(list?.querySelectorAll('.selected-item') ?? [])]
  if (!items.length) return

  const n = items.length
  const line = container.querySelector('.line')

  // Médias sortis des items : un élément en position: fixed dans un parent transformé (les items
  // tournent et se déplacent) suivrait ce parent au lieu de rester calé sur l'écran. Ils vont dans un
  // conteneur sans transformation, en tête de la page ; leur classe et leurs styles Webflow restent.
  const mediaLayer = document.createElement('div')
  mediaLayer.className = 'selected-medias'
  // Empilement propre (z-index 0) : le z-index des médias reste contenu ici, la roue passe au-dessus
  Object.assign(mediaLayer.style, { position: 'relative', zIndex: '0' })
  const medias = items.map((item) => {
    const media = item.querySelector('.selected-media')
    if (media) {
      media.style.transition = 'none'
      mediaLayer.append(media)
    }
    return media
  })
  container.prepend(mediaLayer)
  // Vidéos : lecture pilotée par la roue (autoplay coupé, sinon toutes tourneraient en arrière-plan)
  const videos = medias.map((media) => [...(media?.querySelectorAll('video') ?? [])])
  videos.flat().forEach((video) => {
    video.autoplay = false
    video.pause()
  })
  // La roue est pilotée par la position y d'un élément fantôme (jamais affiché) : Draggable, l'inertie
  // et les tweens agissent tous sur cette seule valeur, render() en déduit la position des items.
  const proxy = document.createElement('div')
  let radius = 0
  let active = -1

  // Rayon proportionnel à la hauteur d'écran, mais jamais assez petit pour que les items se chevauchent
  function measure() {
    const itemHeight = Math.max(...items.map((item) => item.offsetHeight))
    radius = Math.max(innerHeight * RADIUS, (itemHeight + MIN_GAP) / Math.sin((ANGLE * Math.PI) / 180))
  }

  const progress = () => -gsap.getProperty(proxy, 'y') / DRAG
  const wrap = gsap.utils.wrap(-n / 2, n / 2)

  Object.assign(list.style, { position: 'relative', overflow: 'hidden' })
  items.forEach((item) => {
    Object.assign(item.style, {
      position: 'absolute',
      top: '50%',
      left: '50%',
      margin: '0',
      // Seule l'opacité est animée (translate / rotate suivent la roue à chaque frame)
      transition: 'opacity 300ms var(--easing)',
    })
    // Pas de "fantôme" d'image natif pendant le glisser
    item.querySelectorAll('img').forEach((img) => (img.draggable = false))
  })

  function render() {
    const p = progress()

    // Écart à l'item le plus proche : 0 pile dessus, 0.5 à mi-chemin -> largeur 100 % -> LINE_MIN
    if (line) {
      const offset = Math.abs(p - Math.round(p)) * 2
      line.style.width = `${(1 - (1 - LINE_MIN) * offset) * 100}%`
    }

    items.forEach((item, i) => {
      const rel = n > 1 ? wrap(i - p) : 0
      if (Math.abs(rel) > VISIBLE) {
        item.style.visibility = 'hidden'
        return
      }
      const rad = (rel * ANGLE * Math.PI) / 180
      const x = radius - radius * Math.cos(rad)
      const y = radius * Math.sin(rad)
      item.style.visibility = ''
      item.style.translate = `calc(-50% + ${x}px) calc(-50% + ${y}px)`
      // Rotation d'une roue rigide : l'item tourne exactement du même angle que sa position sur la roue
      // (centre à droite : descendre sur la roue = tourner dans le sens inverse des aiguilles d'une montre)
      item.style.rotate = `${-rel * ANGLE}deg`
    })

    const index = ((Math.round(p) % n) + n) % n
    if (index !== active) {
      // Pas de clic au premier affichage, seulement quand la roue change d'item
      if (active !== -1) playClick()
      active = index
      items.forEach((item, i) => {
        item.classList.toggle('active', i === index)
        const gap = Math.abs(n > 1 ? Math.round(wrap(i - index)) : 0)
        item.style.opacity = OPACITIES[Math.min(gap, OPACITIES.length - 1)]
      })
      // Média de l'item actif visible (sans transition) ; seules ses vidéos tournent
      medias.forEach((media, i) => {
        if (media) media.style.opacity = i === index ? '1' : ''
      })
      videos.forEach((list, i) =>
        list.forEach((video) => (i === index ? video.play().catch(() => {}) : video.pause()))
      )
      container.dispatchEvent(new CustomEvent('selected:change', { detail: { index, item: items[index] } }))
    }
  }

  // Va à l'item situé `delta` crans plus loin que l'item le plus proche
  function step(delta) {
    gsap.to(proxy, {
      y: -(Math.round(progress()) + delta) * DRAG,
      duration: 0.6,
      ease: 'power3.out',
      overwrite: true,
      onUpdate: render,
    })
  }

  const [draggable] = Draggable.create(proxy, {
    trigger: list,
    type: 'y',
    inertia: true,
    dragClickables: true,
    snap: { y: (v) => Math.round(v / DRAG) * DRAG },
    onPress: () => gsap.killTweensOf(proxy),
    onDrag: render,
    onThrowUpdate: render,
  })

  // Molette / trackpad : la roue suit le défilement, puis s'aimante quand il s'arrête
  let wheelTarget = 0
  let wheelTimer = null
  // About ouvert : la roue ne réagit plus
  // About ouvert ou loader affiché : la roue ne réagit plus
  const locked = () => /\b(about-open|is-loading)\b/.test(document.documentElement.className)

  function onWheel(e) {
    if (locked()) return
    e.preventDefault()
    const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY
    if (!wheelTimer) wheelTarget = gsap.getProperty(proxy, 'y')
    wheelTarget -= delta
    gsap.to(proxy, { y: wheelTarget, duration: 0.4, ease: 'power2.out', overwrite: true, onUpdate: render })

    clearTimeout(wheelTimer)
    wheelTimer = setTimeout(() => {
      wheelTimer = null
      step(0)
    }, 150)
  }

  function onKey(e) {
    if (locked()) return
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') step(1)
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') step(-1)
  }

  // Clic sur un item voisin : la roue tourne jusqu'à lui (au lieu de suivre son lien)
  function onClick(e) {
    const item = e.target.closest('.selected-item')
    const i = items.indexOf(item)
    if (i === -1 || i === active) return
    e.preventDefault()
    e.stopPropagation()
    step(Math.round(wrap(i - progress())))
  }

  let resizeFrame = null
  function onResize() {
    cancelAnimationFrame(resizeFrame)
    resizeFrame = requestAnimationFrame(() => {
      measure()
      render()
    })
  }

  addEventListener('wheel', onWheel, { passive: false })
  addEventListener('keydown', onKey)
  addEventListener('resize', onResize)
  list.addEventListener('click', onClick, true)

  measure()

  // Arrivée : la roue tourne déjà dès le premier affichage (aucun délai, aucune image à l'arrêt) puis
  // ralentit jusqu'au premier item.
  // Toute interaction (glisser, molette, clavier, clic) reprend aussitôt la main. Pas d'animation si
  // le visiteur a demandé à réduire les animations (réglage du système).
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (INTRO_STEPS && !reduceMotion) {
    gsap.set(proxy, { y: INTRO_STEPS * DRAG })
    // Démarre à la fin du loader (ou tout de suite s'il n'y en a pas / plus)
    const intro = gsap.to(proxy, {
      y: 0,
      duration: INTRO_DURATION,
      ease: INTRO_EASE,
      paused: true,
      onUpdate: render,
    })
    onReady(() => intro.play())
  }
  render()

  cleanup = () => {
    videos.flat().forEach((video) => video.pause())
    cancelAnimationFrame(resizeFrame)
    draggable.kill()
    gsap.killTweensOf(proxy)
    clearTimeout(wheelTimer)
    removeEventListener('wheel', onWheel)
    removeEventListener('keydown', onKey)
    removeEventListener('resize', onResize)
    list.removeEventListener('click', onClick, true)
  }
}

export function destroy() {
  cleanup?.()
  cleanup = null
}
