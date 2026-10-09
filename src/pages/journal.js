// Journal : défilement horizontal des .journal-item de .journal-list.
// L'item actif est toujours pile au centre de l'écran (opacité 1, les autres INACTIVE_OPACITY).
// Glisser avec inertie, molette / trackpad, flèches du clavier, clic sur un item ; on s'arrête toujours
// sur un item, sans boucle : bornes au premier et au dernier. Clic sonore à chaque nouvel item actif,
// apparition des items en décalé à l'arrivée.
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { playClick } from '../sound.js'

gsap.registerPlugin(Draggable, InertiaPlugin)

// Opacité des items non actifs
const INACTIVE_OPACITY = 0.5
const TRANSITION = 'opacity 300ms var(--easing)'
// Apparition des items : durée (s) du fondu de chaque item et décalage (s) entre deux items
const ITEM_FADE = 0.5
const ITEM_STAGGER = 0.08

let cleanup = null

export function init(container) {
  const list = container.querySelector('.journal-list')
  const items = [...(list?.querySelectorAll('.journal-item') ?? [])]
  if (!items.length) return

  // Position x de la liste qui centre chaque item à l'écran
  let snaps = []
  let active = -1

  items.forEach((item) => {
    item.style.transition = TRANSITION
    // Pas de "fantôme" d'image natif pendant le glisser
    item.querySelectorAll('img').forEach((img) => (img.draggable = false))
  })

  function measure() {
    const x = gsap.getProperty(list, 'x')
    snaps = items.map((item) => {
      const r = item.getBoundingClientRect()
      return innerWidth / 2 - (r.left - x + r.width / 2)
    })
  }

  const nearest = (x) =>
    snaps.reduce((best, s, i) => (Math.abs(s - x) < Math.abs(snaps[best] - x) ? i : best), 0)
  const clampX = (x) => Math.min(Math.max(x, snaps[snaps.length - 1]), snaps[0])

  // Item le plus proche du centre = actif (opacité 1, classe .active)
  function update() {
    const index = nearest(gsap.getProperty(list, 'x'))
    if (index === active) return
    // Clic sonore à chaque nouvel item actif (pas au premier affichage)
    if (active !== -1) playClick()
    active = index
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index)
      item.style.opacity = i === index ? '1' : String(INACTIVE_OPACITY)
    })
  }

  function goTo(index) {
    const i = Math.min(Math.max(index, 0), items.length - 1)
    gsap.to(list, { x: snaps[i], duration: 0.6, ease: 'power3.out', overwrite: true, onUpdate: update })
  }

  const [draggable] = Draggable.create(list, {
    type: 'x',
    inertia: true,
    dragClickables: true,
    edgeResistance: 0.85,
    bounds: { minX: 0, maxX: 0 },
    snap: { x: (v) => snaps[nearest(v)] },
    onPress: () => gsap.killTweensOf(list),
    onDrag: update,
    onThrowUpdate: update,
  })

  function applyBounds() {
    draggable.applyBounds({ minX: snaps[snaps.length - 1], maxX: snaps[0] })
  }

  // About ouvert : le slider ne réagit plus à la molette / au clavier
  const locked = () => document.documentElement.classList.contains('about-open')

  // Molette / trackpad (horizontal ou vertical) : le slider suit, puis s'aimante quand ça s'arrête
  let wheelTarget = 0
  let wheelTimer = null
  function onWheel(e) {
    if (locked()) return
    e.preventDefault()
    const unit = e.deltaMode === 1 ? 16 : 1
    const delta = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * unit
    if (!wheelTimer) wheelTarget = gsap.getProperty(list, 'x')
    wheelTarget = clampX(wheelTarget - delta)
    gsap.to(list, { x: wheelTarget, duration: 0.4, ease: 'power2.out', overwrite: true, onUpdate: update })

    clearTimeout(wheelTimer)
    wheelTimer = setTimeout(() => {
      wheelTimer = null
      goTo(nearest(wheelTarget))
    }, 150)
  }

  function onKey(e) {
    if (locked()) return
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(active + 1)
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goTo(active - 1)
  }

  // Clic sur un item non actif : il vient au centre (au lieu de suivre son lien)
  function onClick(e) {
    const i = items.indexOf(e.target.closest('.journal-item'))
    if (i === -1 || i === active) return
    e.preventDefault()
    e.stopPropagation()
    goTo(i)
  }

  // Resize (ou chargement des images) : nouvelles positions, l'item actif reste centré
  let resizeFrame = null
  function onResize() {
    cancelAnimationFrame(resizeFrame)
    resizeFrame = requestAnimationFrame(() => {
      const current = Math.max(active, 0)
      measure()
      applyBounds()
      gsap.set(list, { x: snaps[current] })
    })
  }

  addEventListener('wheel', onWheel, { passive: false })
  addEventListener('keydown', onKey)
  addEventListener('resize', onResize)
  addEventListener('load', onResize)
  list.addEventListener('click', onClick, true)

  // Au chargement : premier item centré et actif
  measure()
  applyBounds()
  gsap.set(list, { x: snaps[0] })
  update()

  // Apparition des items un à un. Le fondu passe par filter: opacity() pour ne pas entrer en conflit
  // avec l'opacité actif / inactif. Pas d'animation si le visiteur a demandé à réduire les animations.
  let introFade = null
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    introFade = gsap.fromTo(
      items,
      { filter: 'opacity(0)' },
      { filter: 'opacity(1)', duration: ITEM_FADE, stagger: ITEM_STAGGER, ease: 'none', clearProps: 'filter' }
    )
  }

  cleanup = () => {
    introFade?.kill()
    draggable.kill()
    gsap.killTweensOf(list)
    clearTimeout(wheelTimer)
    cancelAnimationFrame(resizeFrame)
    removeEventListener('wheel', onWheel)
    removeEventListener('keydown', onKey)
    removeEventListener('resize', onResize)
    removeEventListener('load', onResize)
    list.removeEventListener('click', onClick, true)
  }
}

export function destroy() {
  cleanup?.()
  cleanup = null
}
