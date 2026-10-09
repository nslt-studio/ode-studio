// Home : roue des .selected-item dans .selected-list.
// Les items sont posés sur un grand cercle dont le centre est à droite de l'écran : l'item actif est
// pile au centre, le précédent et le suivant apparaissent en haut et en bas.
// Glisser (souris / tactile) avec inertie, molette / trackpad, flèches du clavier, clic sur un voisin ;
// la roue finit toujours aimantée sur un item.
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { onReady } from '../loader.js'
import { playClick } from '../sound.js'

gsap.registerPlugin(Draggable, InertiaPlugin)

// Angle (deg) entre deux items sur la roue
const ANGLE = 45
// Échelle de l'item pile au centre, qui redescend linéairement à 1 à un cran du centre
const ACTIVE_SCALE = 1.5
// Opacité des items non actifs (l'actif est à 1, dès qu'il devient actif, en 300ms var(--easing))
const INACTIVE_OPACITY = 0.5
// Rayon de la roue, en fraction de la hauteur d'écran
const RADIUS = 0.85
// Distance de glisser (px) pour passer d'un item au suivant
const DRAG = 400
// Espace minimum (px) entre deux items, quelle que soit la taille de la fenêtre
const MIN_GAP = 40
// Nombre d'items rendus de chaque côté de l'actif (les autres sont masqués)
const VISIBLE = 1.5
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
  const medias = items.map((item) => item.querySelector('.selected-media'))
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
    // Clients de l'item regroupés dans son data-client : "Client A, Client B"
    item.dataset.client = [...item.querySelectorAll('[data-client]')]
      .map((el) => (el.dataset.client || el.textContent).trim())
      .filter(Boolean)
      .join(', ')
  })

  // Textes de l'item actif (cherchés dans la page, puis dans tout le document s'ils sont hors de #swup)
  const find = (attr) => container.querySelector(`[${attr}]`) || document.querySelector(`[${attr}]`)
  const titles = {
    name: find('titles-name'),
    year: find('titles-year'),
    client: find('titles-clients'),
  }

  // Survol de l'item actif (seulement lui) : les .triangle-left de la page pivotent de 180°.
  // Détection par la position de la souris (elementsFromPoint) : fonctionne même si un élément
  // passe par-dessus l'item, et quand la roue tourne sous une souris immobile.
  const triangles = [...container.querySelectorAll('.triangle-left')]
  if (!triangles.length) console.warn('[home] .triangle-left introuvable dans la page')
  triangles.forEach((t) => (t.style.transition = 'rotate 300ms var(--easing)'))
  let pointer = null
  function updateCursor() {
    const over = pointer && document.elementsFromPoint(pointer.x, pointer.y).includes(items[active])
    triangles.forEach((t) => (t.style.rotate = over ? '180deg' : ''))
  }

  function render() {
    const p = progress()

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
      // 1 pile au centre -> 0 à un cran : sert à l'échelle du média
      const focus = Math.max(0, 1 - Math.abs(rel))
      // L'échelle s'applique au média de l'item, pas à l'item entier
      const media = medias[i]
      if (media) media.style.scale = 1 + (ACTIVE_SCALE - 1) * focus
    })

    const index = ((Math.round(p) % n) + n) % n
    if (index !== active) {
      // Pas de clic au premier affichage, seulement quand la roue change d'item
      if (active !== -1) playClick()
      active = index
      items.forEach((item, i) => {
        item.classList.toggle('active', i === index)
        item.style.opacity = i === index ? 1 : INACTIVE_OPACITY
      })
      for (const key in titles) {
        if (titles[key]) titles[key].textContent = items[index].dataset[key] ?? ''
      }
      // L'item survolé peut devenir (ou cesser d'être) actif quand la roue tourne sous la souris
      updateCursor()
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

  let pointerFrame = null
  function onPointerMove(e) {
    pointer = { x: e.clientX, y: e.clientY }
    cancelAnimationFrame(pointerFrame)
    pointerFrame = requestAnimationFrame(updateCursor)
  }
  function onPointerLeave() {
    pointer = null
    updateCursor()
  }

  addEventListener('wheel', onWheel, { passive: false })
  addEventListener('keydown', onKey)
  addEventListener('resize', onResize)
  list.addEventListener('click', onClick, true)
  addEventListener('pointermove', onPointerMove)
  document.documentElement.addEventListener('pointerleave', onPointerLeave)

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
    cancelAnimationFrame(resizeFrame)
    draggable.kill()
    gsap.killTweensOf(proxy)
    clearTimeout(wheelTimer)
    removeEventListener('wheel', onWheel)
    removeEventListener('keydown', onKey)
    removeEventListener('resize', onResize)
    list.removeEventListener('click', onClick, true)
    cancelAnimationFrame(pointerFrame)
    removeEventListener('pointermove', onPointerMove)
    document.documentElement.removeEventListener('pointerleave', onPointerLeave)
  }
}

export function destroy() {
  cleanup?.()
  cleanup = null
}
