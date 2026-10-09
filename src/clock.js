// Horloge de la nav : aiguilles (#hour, #minute, #second) + heures LA / NYC dans les boutons.
// Elle ne tourne que lorsque about est ouvert (startClock / stopClock appelés par nav.js).

import { LINE_OPACITY, LINE_WIDTH } from './graph.js'

const ZONES = {
  la: 'America/Los_Angeles',
  nyc: 'America/New_York',
}

// Rayon de chaque aiguille, en fraction du rayon de .clock-inner (moitié de son plus petit côté).
// 1 = bord de .clock-inner. Surchargeable dans Webflow avec l'attribut data-radius sur la .hand (ex. 0.8).
const RADIUS = { hour: 0.6, minute: 0.7, second: 1 }
// Diamètre du cercle tracé au centre de l'horloge, en fraction du plus petit côté de .clock-inner
// (0.15 ≈ 100px sur un écran 1440x900) ; même trait que les cercles du graph
const CENTER_SIZE = 0.65
// Espace (px) entre l'icône et le début du texte
const GAP = 8
// Durée de la transition au changement de ville (ms), easing = var(--easing)
const SWITCH_DURATION = 450

let city = 'la'
let offset = 0
let base = null
let running = false
let built = false
let raf = null
let interval = null
let timeout = null
let switchTimer = null
let switching = false
// Tours complets ajoutés à chaque aiguille au changement de ville, pour qu'elle prenne le chemin
// le plus court (sinon LA -> NYC ferait faire 3 tours à la minute et 180 à la seconde)
const correction = { second: 0, minute: 0, hour: 0 }

const formatters = Object.fromEntries(
  Object.entries(ZONES).map(([key, timeZone]) => [
    key,
    new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    }),
  ])
)

// Décalage (s) de la ville par rapport à UTC
function utcOffset(key, now) {
  const p = Object.fromEntries(formatters[key].formatToParts(now).map(({ type, value }) => [type, +value]))
  const diff = p.hour * 3600 + p.minute * 60 + p.second - (now / 1000) % 86400
  // Ramené entre -12h et +12h (le jour local peut différer du jour UTC), arrondi au quart d'heure
  return Math.round(((((diff + 43200) % 86400) + 86400) % 86400 - 43200) / 900) * 900
}

/* ---------- Construction (une fois) ---------- */

// Icône de l'aiguille : [data-hand-icon] ou .icon si présents, sinon le premier <svg>.
// Un svg dans un Embed Webflow est pris avec son wrapper (.w-embed).
function findIcon(hand) {
  const icon = hand.querySelector('[data-hand-icon], .icon, svg')
  if (icon?.tagName.toLowerCase() !== 'svg') return icon
  const embed = icon.closest('.w-embed')
  return embed && hand.contains(embed) ? embed : icon
}

// Taille de l'icône : mesurée si visible, sinon attributs width/height du svg,
// sinon valeur CSS en px, sinon ~ taille du texte
function iconSize(icon, prop, textStyle) {
  const measured = icon.getBoundingClientRect()[prop]
  if (measured) return measured
  const svg = icon.tagName.toLowerCase() === 'svg' ? icon : icon.querySelector('svg')
  const attr = parseFloat(svg?.getAttribute(prop))
  if (attr) return attr
  const css = getComputedStyle(icon)[prop]
  if (css.endsWith('px')) return parseFloat(css)
  return (parseFloat(textStyle?.fontSize) || 12) * 0.7
}

// Découpe le texte en lettres et isole l'icône ; les largeurs sont gardées pour layout()
function buildHand(hand) {
  const icon = findIcon(hand)
  // Le texte : le dernier élément de la .hand qui n'est pas (ou ne contient pas) l'icône
  const text = [...hand.querySelectorAll('*')]
    .reverse()
    .find((el) => !icon?.contains(el) && !el.contains(icon) && el.textContent.trim())

  // Largeurs calculées depuis la police (fonctionne même si .clock est en display: none)
  const ctx = document.createElement('canvas').getContext('2d')
  const style = text && getComputedStyle(text)
  if (style) ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
  const spacing = (style && parseFloat(style.letterSpacing)) || 0
  const upper = style?.textTransform === 'uppercase'

  const chars = text ? [...text.textContent] : []
  const spans = chars.map((c) => {
    const span = document.createElement('span')
    span.textContent = c
    span.style.whiteSpace = 'pre'
    return span
  })
  if (text) {
    text.replaceChildren(...spans)
    text.style.margin = '0'
  }

  // L'icône est placée dans un wrapper que le script positionne : les styles Webflow de .icon
  // (position, transform, interactions…) ne peuvent plus entrer en conflit avec le placement.
  // Taille figée en px : une fois la .hand réduite à 0×0, une icône en % ou en flex s'écraserait à 0.
  const iconWidth = icon ? iconSize(icon, 'width', style) : 0
  let iconWrap = null
  if (icon) {
    const iconHeight = iconSize(icon, 'height', style)
    iconWrap = document.createElement('span')
    Object.assign(iconWrap.style, { display: 'block', width: `${iconWidth}px`, height: `${iconHeight}px` })
    hand.prepend(iconWrap)
    iconWrap.append(icon)
    Object.assign(icon.style, {
      position: 'static',
      display: 'block',
      width: `${iconWidth}px`,
      height: `${iconHeight}px`,
      margin: '0',
    })
  }

  Object.assign(hand.style, {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '0',
    height: '0',
    transformOrigin: '0 0',
  })

  hand._items = [iconWrap, ...spans].filter(Boolean)
  hand._widths = [
    ...(icon ? [iconWidth] : []),
    ...chars.map((c) => ctx.measureText(upper ? c.toUpperCase() : c).width + spacing),
  ]
}

/* ---------- Mise en place sur le cercle (à l'ouverture et au resize) ---------- */

// Dispose l'icône puis chaque lettre le long d'un cercle centré sur .clock-inner.
// L'icône est à 0° (midi) dans le repère de l'aiguille, le texte suit dans le sens horaire :
// il suffit ensuite de faire tourner l'aiguille entière pour que l'icône pointe sur l'heure.
function layout() {
  const inner = document.querySelector('.clock .clock-inner')
  if (!inner) return
  const rect = inner.getBoundingClientRect()
  // Si .clock-inner n'a pas de taille, on se cale sur l'écran
  const size = Math.min(rect.width, rect.height) || Math.min(innerWidth, innerHeight) * 0.8
  const outer = size / 2

  if (center) center.style.width = center.style.height = `${size * CENTER_SIZE}px`

  inner.querySelectorAll('.hand').forEach((hand) => {
    if (!hand._items) return
    const radius = outer * (+hand.dataset.radius || RADIUS[hand.id] || 1)
    const { _items: items, _widths: widths } = hand

    let angle = 0
    items.forEach((el, i) => {
      if (i > 0) angle += (widths[i - 1] / 2 + widths[i] / 2 + (i === 1 ? GAP : 0)) / radius
      Object.assign(el.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        margin: '0',
        transformOrigin: '0 0',
        transform: `rotate(${angle}rad) translateY(${-radius}px) translate(-50%, -50%)`,
      })
    })
  })
}

let resizeFrame = null
function onResize() {
  cancelAnimationFrame(resizeFrame)
  resizeFrame = requestAnimationFrame(layout)
}

/* ---------- Temps ---------- */

// Textes LA / NYC + décalage horaire, recalculés chaque seconde
function tick() {
  const now = Date.now()

  document.querySelectorAll('.clock [data-time]').forEach((p) => {
    const key = p.dataset.time.toLowerCase()
    if (formatters[key]) p.textContent = formatters[key].format(now)
  })

  offset = utcOffset(city, now)
}

// Angles cumulés (jamais de retour à 0) ; base = multiple de 12h, donc les angles restent justes.
function angles(now) {
  const t = now / 1000 + offset
  base ??= Math.floor(t / 43200) * 43200
  const s = t - base
  return {
    second: s * 6 + correction.second,
    minute: s / 10 + correction.minute,
    hour: s / 120 + correction.hour,
  }
}

function render(values, transition = '') {
  for (const id in values) {
    const hand = document.querySelector(`.clock #${id}`)
    if (!hand) continue
    hand.style.transition = transition
    hand.style.transform = `rotate(${values[id]}deg)`
  }
}

// Aiguilles à chaque frame, avec les millisecondes : mouvement continu
function frame() {
  const values = angles(Date.now())
  // Pendant un changement de ville, seule l'aiguille des heures est en transition :
  // les minutes et les secondes continuent leur mouvement
  if (switching) delete values.hour
  render(values)
  raf = requestAnimationFrame(frame)
}

function setCity(key, animate = false) {
  if (!ZONES[key]) return
  const now = Date.now()
  const before = angles(now)

  city = key
  document.querySelectorAll('.clock [clock-button]').forEach((b) => {
    b.classList.toggle('active', b.getAttribute('clock-button').toLowerCase() === key)
  })
  tick()

  if (!animate || !running) return

  const after = angles(now)
  for (const id in after) {
    const delta = after[id] - before[id]
    const shortest = ((((delta + 180) % 360) + 360) % 360) - 180
    correction[id] += shortest - delta
  }

  // Seule l'aiguille des heures bouge (minutes et secondes sont identiques entre LA et NYC) : elle va
  // directement là où elle doit être à la fin de la transition, puis reprend l'animation frame par frame
  switching = true
  render({ hour: angles(now + SWITCH_DURATION).hour }, `transform ${SWITCH_DURATION}ms var(--easing)`)
  clearTimeout(switchTimer)
  switchTimer = setTimeout(() => {
    switching = false
    render(angles(Date.now()))
  }, SWITCH_DURATION)
}

/* ---------- Démarrage / arrêt ---------- */

function start() {
  layout()
  tick()
  render(angles(Date.now()))
  raf = requestAnimationFrame(frame)
  // Textes calés sur le début de chaque seconde
  timeout = setTimeout(() => {
    tick()
    interval = setInterval(tick, 1000)
  }, 1000 - (Date.now() % 1000))
  addEventListener('resize', onResize)
}

// Appelé à l'ouverture d'about
export function startClock() {
  if (running) return
  running = true
  if (built) start()
}

// Appelé à la fermeture d'about : plus aucun calcul tant que l'horloge est cachée
export function stopClock() {
  if (!running) return
  running = false
  cancelAnimationFrame(raf)
  clearTimeout(timeout)
  clearInterval(interval)
  removeEventListener('resize', onResize)
}

// Petit cercle au centre de .clock-inner, même épaisseur et même opacité que les cercles du graph
// (taille recalculée dans layout(), donc au resize)
let center = null
function drawCenter() {
  const inner = document.querySelector('.clock .clock-inner')
  if (!inner) return
  if (getComputedStyle(inner).position === 'static') inner.style.position = 'relative'
  const svgNS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNS, 'svg')
  // viewBox 0 0 100 100 : le cercle suit la taille du svg, le trait reste fin (non-scaling-stroke)
  svg.setAttribute('viewBox', '0 0 100 100')
  Object.assign(svg.style, {
    position: 'absolute',
    left: '50%',
    top: '50%',
    translate: '-50% -50%',
    overflow: 'visible',
    pointerEvents: 'none',
    opacity: String(LINE_OPACITY),
  })
  const circle = document.createElementNS(svgNS, 'circle')
  circle.setAttribute('cx', 50)
  circle.setAttribute('cy', 50)
  circle.setAttribute('r', 50)
  circle.setAttribute('fill', 'none')
  circle.setAttribute('stroke', 'currentColor')
  circle.setAttribute('stroke-width', String(LINE_WIDTH))
  circle.setAttribute('vector-effect', 'non-scaling-stroke')
  svg.append(circle)
  inner.prepend(svg)
  center = svg
  layout()
}

export async function initClock() {
  drawCenter()
  // Les largeurs de lettres dépendent de la police : on attend qu'elle soit chargée
  await document.fonts.ready
  document.querySelectorAll('.clock .hand').forEach(buildHand)
  built = true

  document.addEventListener('click', (e) => {
    const button = e.target.closest('.clock [clock-button]')
    if (button) setCity(button.getAttribute('clock-button').toLowerCase(), true)
  })

  setCity('la')
  // about déjà ouvert (ex. arrivée avec #about) avant la fin de la construction
  if (running) start()
}
