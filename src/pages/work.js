// Work : nuage de .dots-item + liste .index-item reliés par projet (data-index / slug du lien = data-dots)
// et par leurs clients (data-client). Survoler un point ou une ligne met en avant le projet et ceux
// partageant un client, les relie par des fils et estompe le reste de la liste. Tri et filtres sur la liste.

import { gsap } from 'gsap'

// Rayon du nuage, en fraction de la moitié du plus petit côté de .dots-list
const CLOUD = 0.5
// Marge (px) à garder entre les items et les bords de l'écran
const PADDING = 16
// Courbure des fils, en fraction de la longueur du segment : 0 = droit, plus grand = plus bombé,
// négatif = bombé vers l'intérieur de la forme au lieu de l'extérieur
const BEND = -0.1
// Variation de courbure d'un fil à l'autre (0 = tous identiques, 1 = de 0 à 2× BEND).
// Tirée au hasard mais fixe pour une même paire de projets : le fil ne change pas d'un survol à l'autre.
const BEND_VARIATION = 0.6
// Longueur d'un fil "moyen", en fraction du rayon du nuage : à cette longueur la courbure vaut BEND.
// Plus long = plus bombé, plus court = plus tendu (indépendant de la taille de l'écran).
const BEND_REF = 0.5
// Force de cet effet : 0 = courbure proportionnelle à la longueur (comme un simple zoom),
// 1 = un fil 2× plus long est 2× plus bombé en proportion
const BEND_GROWTH = 1
// Courbure maximale (fraction de la longueur) pour éviter les boucles sur les très longs fils
const BEND_MAX = 0.5
// Épaisseur des fils (px)
const WIRE_WIDTH = 0.5
// Opacité des .index-item qui ne correspondent pas au survol
const INDEX_DIM = 0.5
// Décalage (px) du coin haut gauche de .index-media par rapport à la souris
const MEDIA_OFFSET = 12
// Filtres : opacité des .index-item écartés, et durée du repositionnement du nuage
const FILTERED_OPACITY = 0.1
const MOVE = 'left 300ms var(--easing), top 300ms var(--easing)'
// Animation d'arrivée : chaque cercle de points tourne de INTRO_SPIN degrés (en sens opposés) et ralentit
// jusqu'à sa place, comme la fin d'un mouvement déjà lancé (0 = pas de rotation)
const INTRO_SPIN = 40
const INTRO_DURATION = 1.8
const INTRO_EASE = 'expo.out'
// Apparition des lignes de l'index : durée (s) du fondu de chaque ligne et décalage (s) entre deux lignes
const INDEX_FADE = 0.4
const INDEX_STAGGER = 0.03
// Disposition des points : 'rings' (cercles concentriques) ou 'cloud' (nuage aléatoire)
const LAYOUT = 'rings'
// Cercles : rayon du cercle intérieur, en fraction du cercle extérieur
const RING_INNER = 0.6
// Lignes circulaires tracées entre les cercles de points (une à l'intérieur, une entre les deux, une à
// l'extérieur, à mi-distance) : opacité (0 = pas de lignes)
const RING_LINE_OPACITY = 0.1

let cleanup = null

const clientsOf = (el) =>
  [...el.querySelectorAll('.clients-item')].map((c) => (c.dataset.client || c.textContent).trim()).filter(Boolean)

// "Art Direction" / "art-direction" / "Art direction " -> "art-direction" (comparaisons de filtres)
const slugify = (v = '') =>
  v
    .toString()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

// Nombre pseudo-aléatoire entre 0 et 1, toujours le même pour une paire de slugs (dans n'importe quel ordre)
function pairRandom(a, b) {
  const key = [a, b].sort().join('|')
  let h = 2166136261
  for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 16777619)
  return (h >>> 0) / 4294967295
}

// Points aléatoires dans un disque de rayon 1, espacés au mieux (on garde le meilleur de plusieurs essais)
function scatter(n) {
  const minDist = 1.6 / Math.sqrt(n)
  const points = []
  for (let i = 0; i < n; i++) {
    let best = null
    let bestDist = -1
    for (let attempt = 0; attempt < 30; attempt++) {
      const r = Math.sqrt(Math.random())
      const a = Math.random() * Math.PI * 2
      const p = { x: r * Math.cos(a), y: r * Math.sin(a) }
      const d = Math.min(Infinity, ...points.map((q) => Math.hypot(p.x - q.x, p.y - q.y)))
      if (d > bestDist) {
        best = p
        bestDist = d
      }
      if (d >= minDist) break
    }
    points.push(best)
  }
  return points
}

// Deux cercles concentriques (extérieur au rayon 1, intérieur à RING_INNER), centre vide, façon roue :
// les points sont partagés à parts égales (à 1 près, l'intérieur prenant le point en plus) et répartis
// régulièrement sur chaque cercle, départ en haut puis sens horaire, dans l'ordre de l'index.
function rings(n) {
  const inner = Math.ceil(n / 2)
  const points = []
  ;[
    [inner, RING_INNER, 'inner'],
    [n - inner, 1, 'outer'],
  ].forEach(([count, r, ring]) => {
    for (let i = 0; i < count; i++) {
      const a = -Math.PI / 2 + (i / count) * Math.PI * 2
      points.push({ x: r * Math.cos(a), y: r * Math.sin(a), ring })
    }
  })
  return points
}


export function init(container) {
  const list = container.querySelector('.dots-list')
  const dots = [...(list?.querySelectorAll('.dots-item') ?? [])]
  const indexList = container.querySelector('.index-list')
  const indexItems = [...(indexList?.querySelectorAll('.index-item') ?? [])]

  const listeners = []
  const on = (el, type, fn) => {
    el.addEventListener(type, fn)
    listeners.push(() => el.removeEventListener(type, fn))
  }

  /* ---------- Liens de l'index ---------- */

  // .index-link : href = slug seul dans Webflow -> /work/slug (liens absolus, ancres et déjà préfixés ignorés)
  const linkSlugs = new Map()
  indexItems.forEach((item) => {
    const link = item.querySelector('.index-link')
    const href = link?.getAttribute('href')?.trim()
    if (!href || /^([a-z]+:|#|\/\/)/i.test(href)) return
    const slug = href.replace(/^\/+/, '')
    linkSlugs.set(item, slug.split('/').filter(Boolean).pop())
    if (slug && !slug.startsWith('work/')) link.setAttribute('href', `/work/${slug}`)
  })

  /* ---------- Données de l'index ---------- */

  // Chaque .index-item reçoit data-client (ses .clients-item) et data-services (ses .services-item,
  // utilisés par les filtres).
  const collator = new Intl.Collator('fr', { numeric: true, sensitivity: 'base' })

  indexItems.forEach((item) => {
    item.dataset.client = clientsOf(item).join(', ')
    item.dataset.services = [...item.querySelectorAll('.services-item')]
      .map((el) => el.textContent.trim())
      .filter(Boolean)
      .join(', ')
  })

  // Ligne <-> point du même projet (data-index ou slug du lien = data-dots) ; les attributs de la ligne
  // (nom, type, année, services, clients) sont copiés sur le point.
  const COPIED = ['index', 'type', 'year', 'services', 'client']
  const dotBySlug = new Map(dots.map((d) => [slugify(d.dataset.dots), d]))
  const slugOfItem = new Map()
  const itemBySlug = new Map()

  indexItems.forEach((item) => {
    const keys = [item.dataset.index, linkSlugs.get(item)].map(slugify).filter(Boolean)
    const dot = keys.map((k) => dotBySlug.get(k)).find(Boolean)
    if (!dot) return
    slugOfItem.set(item, dot.dataset.dots)
    itemBySlug.set(dot.dataset.dots, item)
    COPIED.forEach((attr) => {
      if (item.dataset[attr] && !dot.dataset[attr]) dot.dataset[attr] = item.dataset[attr]
    })
  })

  /* ---------- Clients ---------- */

  // slug -> Set des clients (en minuscules pour la comparaison) : ceux du point, sinon ceux de sa ligne
  const clients = new Map()
  dots.forEach((dot) => {
    const own = clientsOf(dot)
    if (own.length) dot.dataset.client = own.join(', ')
    const names = (dot.dataset.client ?? '').split(',').map((c) => c.trim().toLowerCase()).filter(Boolean)
    clients.set(dot.dataset.dots, new Set(names))
  })

  // Projets visibles (filtres) partageant au moins un client avec `slug` (lui compris)
  function related(slug) {
    if (!slug) return []
    const own = clients.get(slug) ?? new Set()
    return dots
      .filter(isActive)
      .map((d) => d.dataset.dots)
      .filter((s) => s === slug || [...(clients.get(s) ?? [])].some((c) => own.has(c)))
  }

  /* ---------- Nuage ---------- */

  // Position (disque de rayon 1) de chaque point ; le nuage complet garde toujours la même disposition
  // Position (disque de rayon 1) de chaque point, attribuée par arrangeDots()
  let points = new Map()

  // Les points visibles prennent les positions dans l'ordre de leur ligne dans l'index (1re ligne = 1re
  // position : centre de la disposition) ; les points sans ligne ferment la marche.
  // Rotation (deg) de chaque cercle, animée à l'arrivée sur la page
  const spin = { inner: 0, outer: 0 }
  let introSpin = null

  function arrangeDots({ animate = true } = {}) {
    // Un tri / filtre pendant l'animation d'arrivée l'interrompt : les cercles se remettent droits
    if (introSpin) {
      introSpin.kill()
      introSpin = null
      spin.inner = spin.outer = 0
    }
    const rows = [...(indexList?.querySelectorAll('.index-item') ?? [])]
    const rank = (dot) => {
      const i = rows.indexOf(itemBySlug.get(dot.dataset.dots))
      return i === -1 ? Infinity : i
    }
    const ordered = dots.filter(isActive).sort((a, b) => rank(a) - rank(b))
    const positions = LAYOUT === 'rings' ? rings(ordered.length) : scatter(ordered.length)
    points = new Map(positions.map((p, i) => [ordered[i], p]))
    layout({ animate })
  }
  // Centre de chaque .dots-link une fois placé (coordonnées de la liste) : sert aux fils,
  // même pendant le repositionnement animé
  const anchorPos = new Map()
  const anchorOf = (dot) => dot.querySelector('.dots-link') || dot

  dots.forEach((dot) => {
    // L'opacité de repos (ex. 0.35) est sur le .dots-link : c'est lui qui passe à 1 à la sélection,
    // immédiatement (aucune transition, y compris celles éventuellement définies dans Webflow)
    anchorOf(dot).style.transition = 'none'
  })

  // Rayon du nuage (px), mis à jour par layout()
  let radius = 0

  // animate : repositionnement lisse (filtres) ; sinon placement direct (chargement, resize)
  function layout({ animate = false } = {}) {
    if (!list) return
    const listRect = list.getBoundingClientRect()
    // Nuage caché : rien à mesurer
    if (!listRect.width && !listRect.height) return
    // Zone autorisée : la .dots-list, limitée à la partie visible de l'écran (coordonnées de la liste)
    let bounds = {
      left: Math.max(listRect.left, 0) - listRect.left,
      top: Math.max(listRect.top, 0) - listRect.top,
      right: Math.min(listRect.right, innerWidth) - listRect.left,
      bottom: Math.min(listRect.bottom, innerHeight) - listRect.top,
    }
    if (bounds.right <= bounds.left || bounds.bottom <= bounds.top) {
      bounds = { left: 0, top: 0, right: listRect.width, bottom: listRect.height }
    }

    const cx = listRect.width / 2
    const cy = listRect.height / 2
    radius = (Math.min(listRect.width, listRect.height) / 2) * CLOUD
    drawRingLines(cx, cy)

    // Toutes les mesures d'abord, puis toutes les écritures (un seul calcul de mise en page par appel,
    // important pendant l'animation d'arrivée où layout() tourne à chaque frame)
    const metrics = dots.filter(isActive).map((dot) => {
      // Étendue de l'item autour du centre du point : mesures relatives,
      // valables quelle que soit sa position actuelle (même en cours d'animation)
      const itemRect = dot.getBoundingClientRect()
      const a = anchorOf(dot).getBoundingClientRect()
      const ax = a.left + a.width / 2 - itemRect.left
      const ay = a.top + a.height / 2 - itemRect.top
      const ext = {
        left: -ax,
        top: -ay,
        right: itemRect.width - ax,
        bottom: itemRect.height - ay,
      }
      return { dot, ax, ay, ext }
    })

    metrics.forEach(({ dot, ax, ay, ext }) => {
      const clamp = (v, min, max) => (min > max ? (min + max) / 2 : Math.min(Math.max(v, min), max))
      const point = points.get(dot)
      // Rotation éventuelle du cercle du point (animation d'arrivée)
      const rot = ((spin[point.ring] ?? 0) * Math.PI) / 180
      const px = point.x * Math.cos(rot) - point.y * Math.sin(rot)
      const py = point.x * Math.sin(rot) + point.y * Math.cos(rot)
      const x = clamp(cx + px * radius, bounds.left + PADDING - ext.left, bounds.right - PADDING - ext.right)
      const y = clamp(cy + py * radius, bounds.top + PADDING - ext.top, bounds.bottom - PADDING - ext.bottom)

      dot.style.transition = animate ? MOVE : 'none'
      dot.style.left = `${x - ax}px`
      dot.style.top = `${y - ay}px`
      anchorPos.set(dot, { x, y })
    })
  }

  /* ---------- Lignes entre les cercles ---------- */

  const svgNS = 'http://www.w3.org/2000/svg'
  const ringLines = document.createElementNS(svgNS, 'svg')
  Object.assign(ringLines.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    height: '100%',
    overflow: 'visible',
    pointerEvents: 'none',
    opacity: String(RING_LINE_OPACITY),
  })
  // Rayons (fraction du cercle extérieur) : à mi-distance entre les cercles de points, plus un écart
  // équivalent de part et d'autre
  const gap = 1 - RING_INNER
  const lines = [RING_INNER - gap / 2, (RING_INNER + 1) / 2, 1 + gap / 2].map((ratio) => {
    const circle = document.createElementNS(svgNS, 'circle')
    circle.setAttribute('fill', 'none')
    circle.setAttribute('stroke', 'var(--white)')
    circle.setAttribute('stroke-width', String(WIRE_WIDTH))
    circle.setAttribute('vector-effect', 'non-scaling-stroke')
    ringLines.append(circle)
    return { circle, ratio }
  })
  if (list && LAYOUT === 'rings' && RING_LINE_OPACITY) list.prepend(ringLines)

  function drawRingLines(cx, cy) {
    lines.forEach(({ circle, ratio }) => {
      circle.setAttribute('cx', cx)
      circle.setAttribute('cy', cy)
      circle.setAttribute('r', Math.max(radius * ratio, 0))
    })
  }

  /* ---------- Fils ---------- */

  const svg = document.createElementNS(svgNS, 'svg')
  Object.assign(svg.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    height: '100%',
    overflow: 'visible',
    pointerEvents: 'none',
    opacity: '0',
    // Fils affichés / masqués immédiatement
    transition: 'none',
  })
  const path = document.createElementNS(svgNS, 'path')
  path.setAttribute('fill', 'none')
  path.setAttribute('stroke', 'var(--white)')
  path.setAttribute('stroke-width', String(WIRE_WIDTH))
  path.setAttribute('vector-effect', 'non-scaling-stroke')
  svg.append(path)
  if (list) {
    if (getComputedStyle(list).position === 'static') list.style.position = 'relative'
    list.prepend(svg)
  }

  // Groupe actuellement relié (redessiné si les points bougent au resize)
  let wired = null

  // Relie les points dans l'ordre angulaire autour de leur centre (boucle fermée dès 3 points),
  // chaque segment courbé selon BEND / sa longueur
  function drawWires(slugs) {
    const pts = slugs
      .map((s) => dots.find((d) => d.dataset.dots === s))
      .filter((dot) => dot && isActive(dot) && anchorPos.has(dot))
      .map((dot) => ({ ...anchorPos.get(dot), slug: dot.dataset.dots }))

    if (pts.length < 2) {
      svg.style.opacity = '0'
      return
    }

    const c = {
      x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
      y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
    }
    pts.sort((p, q) => Math.atan2(p.y - c.y, p.x - c.x) - Math.atan2(q.y - c.y, q.x - c.x))

    const segments = pts.length === 2 ? 1 : pts.length
    let d = `M${pts[0].x} ${pts[0].y}`
    for (let i = 0; i < segments; i++) {
      const p = pts[i]
      const q = pts[(i + 1) % pts.length]
      const mx = (p.x + q.x) / 2
      const my = (p.y + q.y) / 2
      const length = Math.hypot(q.x - p.x, q.y - p.y)
      const growth = (length / (radius * BEND_REF || 1)) ** BEND_GROWTH
      const variation = 1 + BEND_VARIATION * (pairRandom(p.slug, q.slug) * 2 - 1)
      const raw = BEND * growth * variation
      const bend = Math.sign(raw) * Math.min(Math.abs(raw), BEND_MAX)
      // Perpendiculaire orientée vers l'extérieur de la forme, puis courbure (signe de BEND compris)
      let nx = -(q.y - p.y)
      let ny = q.x - p.x
      if (nx * (mx - c.x) + ny * (my - c.y) < 0) {
        nx = -nx
        ny = -ny
      }
      nx *= bend
      ny *= bend
      d += `Q${mx + nx} ${my + ny} ${q.x} ${q.y}`
    }
    path.setAttribute('d', d)
    svg.style.opacity = '1'
  }

  /* ---------- Mise en avant ---------- */

  // Opacité d'une ligne : écartée par les filtres (0.1, non cliquable), estompée par un survol, ou normale.
  // Aucune transition sur l'index (y compris celles éventuellement définies dans Webflow).
  // keep : élément de la ligne qui doit rester à 1 (nom du client du groupe survolé). Dans ce cas, au lieu
  // d'estomper la ligne entière, on estompe tout ce qui l'entoure dans la ligne (frères à chaque niveau).
  const partlyDimmed = new Set()
  function styleIndex(item, dimmed, keep = null) {
    const active = isActive(item)
    item.style.pointerEvents = active ? '' : 'none'
    if (!active) return void (item.style.opacity = String(FILTERED_OPACITY))
    if (!dimmed || !keep || !item.contains(keep)) return void (item.style.opacity = dimmed ? String(INDEX_DIM) : '')

    item.style.opacity = ''
    for (let node = keep; node !== item; node = node.parentElement) {
      ;[...node.parentElement.children].forEach((sibling) => {
        // Le .index-media gère sa propre opacité (affiché seulement sur la ligne survolée)
        if (sibling === node || sibling.classList.contains('index-media')) return
        sibling.style.transition = 'none'
        sibling.style.opacity = String(INDEX_DIM)
        partlyDimmed.add(sibling)
      })
    }
  }

  // Applique l'estompage à toute la liste (dimmed(item) -> bool)
  function styleAllIndex(dimmed, keep = null) {
    partlyDimmed.forEach((el) => (el.style.opacity = ''))
    partlyDimmed.clear()
    indexItems.forEach((item) => styleIndex(item, dimmed(item), keep))
  }

  // slug survolé (point ou ligne) : le projet + ceux qui partagent un client passent à 1, reliés par
  // des fils ; les lignes de l'index qui ne correspondent pas sont estompées.
  // scroll : si aucune ligne correspondante n'est visible, la page défile jusqu'à celle du projet.
  function highlight(slug, { scroll = false } = {}) {
    const group = related(slug)
    wired = group

    dots.forEach((dot) => {
      anchorOf(dot).style.opacity = group.includes(dot.dataset.dots) ? '1' : ''
    })
    styleAllIndex((item) => !group.includes(slugOfItem.get(item)))
    drawWires(group)

    if (scroll) {
      const matching = indexItems.filter((item) => isActive(item) && group.includes(slugOfItem.get(item)))
      const visible = matching.some((item) => {
        const r = item.getBoundingClientRect()
        return r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth
      })
      const target = itemBySlug.get(slug) ?? matching[0]
      if (!visible && target) target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  function clear() {
    wired = null
    dots.forEach((dot) => {
      anchorOf(dot).style.opacity = ''
    })
    styleAllIndex(() => false)
    svg.style.opacity = '0'
  }

  /* ---------- Tri de l'index ---------- */

  // Boutons [data-caption] de .index-caption : tri A → Z ("client" par défaut), re-clic = ordre inverse.
  // Valeur de tri de chaque critère (pour les clients / services : le premier de la liste)
  const SORT_KEYS = {
    client: (item) => item.dataset.client.split(', ')[0],
    project: (item) => item.dataset.index,
    type: (item) => item.dataset.type,
    year: (item) => item.dataset.year,
  }
  let caption = 'client'
  let reverse = false

  // animate : repositionnement lisse des points selon le nouvel ordre
  function sortIndex(key, toggle = false, animate = true) {
    if (!SORT_KEYS[key] || !indexList) return
    reverse = toggle && key === caption ? !reverse : false
    caption = key
    container.querySelectorAll('.index-caption [data-caption]').forEach((b) => {
      b.classList.toggle('active', b.dataset.caption === key)
      // .reverse sur le bouton actif quand l'ordre est Z → A (utile pour un indicateur en CSS)
      b.classList.toggle('reverse', b.dataset.caption === key && reverse)
    })
    const value = (item) => (SORT_KEYS[key](item) ?? '').trim()
    indexItems
      .slice()
      .sort((a, b) => {
        const va = value(a)
        const vb = value(b)
        // Valeurs vides toujours en fin de liste, quel que soit le sens
        if (!va || !vb) return !va - !vb
        return reverse ? collator.compare(vb, va) : collator.compare(va, vb)
      })
      // Filtres : les projets actifs en haut, les autres ensuite (chacun dans l'ordre du tri)
      .sort((a, b) => isActive(b) - isActive(a))
      .forEach((item) => indexList.append(item))
    updateDirectory()
    arrangeDots({ animate })
  }

  /* ---------- Répertoire par client ---------- */

  // Tri par client : les clients ne sont affichés que sur la première ligne de chaque groupe (lignes
  // consécutives ayant exactement les mêmes clients), façon répertoire. Au survol d'une ligne du groupe,
  // ce bloc de clients suit la souris verticalement, sans dépasser la première et la dernière ligne du groupe.
  // Bloc des clients d'une ligne : .clients-list, sinon le parent des .clients-item, sinon le .clients-item
  const labelOf = (item) => {
    const first = item.querySelector('.clients-item')
    if (!first) return null
    return item.querySelector('.clients-list') || (first.parentElement !== item ? first.parentElement : first)
  }
  // ligne -> { label, items } de son groupe (uniquement en tri par client)
  let groups = new Map()

  function updateDirectory() {
    groups = new Map()
    let current = null
    let previousKey = null
    ;[...indexList.querySelectorAll('.index-item')].forEach((item) => {
      const label = labelOf(item)
      if (label) {
        label.style.translate = ''
        // Le bloc des clients se déplace par-dessus les lignes voisines : il ne doit jamais capter la
        // souris, sinon le survol bascule sans cesse entre sa ligne et celle réellement survolée
        label.style.pointerEvents = 'none'
      }
      // Clé du groupe : l'ensemble des clients (+ l'état des filtres, les lignes écartées étant en bas)
      const clientKey = item.dataset.client
        .split(',')
        .map((c) => c.trim().toLowerCase())
        .filter(Boolean)
        .sort()
        .join('|')
      const key = clientKey && `${isActive(item)}:${clientKey}`

      if (caption !== 'client' || !key) {
        if (label) label.style.visibility = ''
        previousKey = null
        return
      }
      if (key !== previousKey) current = { label, items: [] }
      current.items.push(item)
      groups.set(item, current)
      if (label) label.style.visibility = key === previousKey ? 'hidden' : ''
      previousKey = key
    })
  }

  // Nom du groupe de la ligne survolée centré sur la souris (en y), borné au groupe ; les autres reposent
  function followLabel() {
    const group = hoveredIndex && groups.get(hoveredIndex)
    groups.forEach((g) => g !== group && g.label && (g.label.style.translate = ''))
    if (!group?.label) return
    const label = group.label
    label.style.translate = ''
    const rest = label.getBoundingClientRect()
    const top = group.items[0].getBoundingClientRect().top
    const bottom = group.items[group.items.length - 1].getBoundingClientRect().bottom
    const target = Math.min(Math.max(pointer.y - rest.height / 2, top), bottom - rest.height)
    label.style.translate = `0 ${target - rest.top}px`
  }

  /* ---------- Survol de l'index ---------- */

  // Survol d'un .index-item : les autres lignes passent à INDEX_DIM ; dans le nuage, même mise en avant
  // qu'au survol d'un point (fils, sans défilement) ; son .index-media suit la souris.
  const pointer = { x: innerWidth / 2, y: innerHeight / 2 }
  const followers = new Map()

  indexItems.forEach((item) => {
    item.style.transition = 'none'
    const media = item.querySelector(':scope > .index-media') || item.querySelector('.index-media')
    if (!media) return
    Object.assign(media.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      pointerEvents: 'none',
      opacity: '0',
      transition: 'none',
    })
    followers.set(item, media)
  })

  let hoveredIndex = null

  // Média en bas à droite de la souris ; s'il sortirait par la droite, il passe à gauche de la souris.
  // Verticalement, il reste bloqué au bas de l'écran.
  function placeMedia(media) {
    const w = media.offsetWidth
    const right = pointer.x + MEDIA_OFFSET
    const x = right + w + MEDIA_OFFSET > innerWidth ? pointer.x - MEDIA_OFFSET - w : right
    const y = Math.min(pointer.y + MEDIA_OFFSET, innerHeight - media.offsetHeight - MEDIA_OFFSET)
    media.style.transform = `translate(${Math.max(x, 0)}px, ${Math.max(y, 0)}px)`
  }

  function onIndexEnter(item) {
    hoveredIndex = item
    highlight(slugOfItem.get(item))
    // Dans la liste, seule la ligne survolée reste à 1 (même les projets liés sont estompés)
    // Le nom du client du groupe (qui suit la souris) reste à 1, même s'il est sur une autre ligne
    styleAllIndex((other) => other !== item, groups.get(item)?.label)
    followLabel()
    const media = followers.get(item)
    if (!media) return
    placeMedia(media)
    media.style.opacity = '1'
  }

  function onIndexLeave(item) {
    if (hoveredIndex === item) hoveredIndex = null
    const media = followers.get(item)
    if (media) media.style.opacity = '0'
    // Passage direct d'une ligne à l'autre : le pointerenter suivant réapplique la mise en avant
    requestAnimationFrame(() => {
      if (hoveredIndex) return
      clear()
      followLabel()
    })
  }

  function onIndexMove(e) {
    pointer.x = e.clientX
    pointer.y = e.clientY
    const media = hoveredIndex && followers.get(hoveredIndex)
    if (media) placeMedia(media)
    followLabel()
  }

  /* ---------- Accordéon des filtres ---------- */

  // #filterButton : 1er clic ouvre [data-accordion="filter"] (max-height = hauteur de son .accordion-inner,
  // comme l'accordéon de la nav), .active sur le bouton et son .triangle-bottom pivote de 180° ; 2e clic,
  // clic en dehors ou Échap referment.
  const filterButton = container.querySelector('#filterButton, .filterButton')
  const filterAccordion = container.querySelector('[data-accordion="filter"]')
  const filterTriangle = filterButton?.querySelector('.triangle-bottom svg, svg.triangle-bottom, .triangle-bottom')
  let filterOpen = false

  if (filterTriangle) {
    filterTriangle.style.transformOrigin = '50% 50%'
    filterTriangle.style.transition = 'rotate 300ms var(--easing)'
  }

  function setFilter(open) {
    filterOpen = open
    filterButton?.classList.toggle('active', open)
    filterButton?.setAttribute('aria-expanded', open)
    if (filterTriangle) filterTriangle.style.rotate = open ? '180deg' : ''
    if (filterAccordion) {
      const inner = filterAccordion.querySelector('.accordion-inner')
      filterAccordion.style.maxHeight = open && inner ? `${inner.scrollHeight}px` : '0px'
    }
    syncFilterUrl()
  }

  /* ---------- Filtrage ---------- */

  // Boutons [data-service] / [data-type] de .filters ; "all" = aucun filtre sur ce groupe.
  // Plusieurs filtres d'un même groupe : OU ; services ET type : les deux doivent correspondre.
  const filterButtons = [...container.querySelectorAll('.filters [data-service], .filters [data-type]')]
  const groupOf = (b) => ('service' in b.dataset ? 'service' : 'type')
  const valueOf = (b) => slugify(b.dataset[groupOf(b)])
  const selected = { service: new Set(), type: new Set() }
  const filterLabel = filterButton?.querySelector('p')
  const filterLabelText = filterLabel?.textContent.trim() ?? ''

  // Point ou ligne correspondant aux filtres en cours
  function isActive(el) {
    const services = (el.dataset.services ?? '').split(',').map(slugify).filter(Boolean)
    const type = slugify(el.dataset.type)
    return (
      (!selected.service.size || services.some((s) => selected.service.has(s))) &&
      (!selected.type.size || selected.type.has(type))
    )
  }

  function applyFilters({ animate = true } = {}) {
    filterButtons.forEach((b) => {
      const group = groupOf(b)
      const value = valueOf(b)
      b.classList.toggle('active', value === 'all' ? !selected[group].size : selected[group].has(value))
    })
    const count = selected.service.size + selected.type.size
    if (filterLabel) filterLabel.textContent = count ? `${filterLabelText} (${count})` : filterLabelText

    // Nuage : points écartés masqués ; l'index est retrié (lignes écartées à 0.1 en bas de liste) et les
    // points restants reprennent l'ordre de la liste
    clear()
    dots.forEach((dot) => (dot.style.display = isActive(dot) ? '' : 'none'))
    sortIndex(caption, false, animate)
  }

  function toggleFilter(button) {
    const group = groupOf(button)
    const value = valueOf(button)
    if (value === 'all') selected[group].clear()
    else if (selected[group].has(value)) selected[group].delete(value)
    else selected[group].add(value)
    applyFilters()
    syncFilterUrl()
  }

  /* ---------- Filtres dans l'URL ---------- */

  // ?filters=open (accordéon ouvert) & service=web,motion & type=film : mis à jour à chaque changement
  // (replaceState : pas d'entrée d'historique, état de swup et #about conservés) et relus au chargement.
  const URL_KEYS = { service: 'service', type: 'type' }

  function syncFilterUrl() {
    const url = new URL(location.href)
    if (filterOpen) url.searchParams.set('filters', 'open')
    else url.searchParams.delete('filters')
    for (const group in URL_KEYS) {
      if (selected[group].size) url.searchParams.set(URL_KEYS[group], [...selected[group]].join(','))
      else url.searchParams.delete(URL_KEYS[group])
    }
    if (url.href !== location.href) history.replaceState(history.state, '', url.href)
  }

  function readFilterUrl() {
    const params = new URLSearchParams(location.search)
    for (const group in URL_KEYS) {
      // Seules les valeurs correspondant à un bouton existant sont reprises
      const known = new Set(filterButtons.filter((b) => groupOf(b) === group).map(valueOf))
      ;(params.get(URL_KEYS[group]) ?? '')
        .split(',')
        .map(slugify)
        .filter((v) => v && v !== 'all' && known.has(v))
        .forEach((v) => selected[group].add(v))
    }
    return params.get('filters') === 'open'
  }

  /* ---------- Événements ---------- */

  dots.forEach((dot) => {
    on(dot, 'pointerenter', () => highlight(dot.dataset.dots, { scroll: true }))
    on(dot, 'pointerleave', clear)
  })

  indexItems.forEach((item) => {
    on(item, 'pointerenter', () => onIndexEnter(item))
    on(item, 'pointerleave', () => onIndexLeave(item))
  })
  on(window, 'pointermove', onIndexMove)
  // Défilement sous une souris immobile : le nom du client suit toujours la souris
  on(window, 'scroll', () => hoveredIndex && followLabel())

  container.querySelectorAll('.index-caption [data-caption]').forEach((button) => {
    on(button, 'click', () => sortIndex(button.dataset.caption, true))
  })

  if (filterButton) on(filterButton, 'click', () => setFilter(!filterOpen))
  filterButtons.forEach((button) => on(button, 'click', () => toggleFilter(button)))
  // Fermeture des filtres : clic en dehors (ni le bouton ni l'accordéon) ou Échap
  on(document, 'click', (e) => {
    if (filterOpen && !filterButton?.contains(e.target) && !filterAccordion?.contains(e.target)) setFilter(false)
  })
  on(document, 'keydown', (e) => {
    if (e.key === 'Escape' && filterOpen) setFilter(false)
  })

  let resizeFrame = null
  on(window, 'resize', () => {
    cancelAnimationFrame(resizeFrame)
    resizeFrame = requestAnimationFrame(() => {
      layout()
      if (wired) drawWires(wired)
    })
  })

  const openFromUrl = readFilterUrl()
  applyFilters({ animate: false })
  if (openFromUrl) setFilter(true)

  /* ---------- Animation d'arrivée ---------- */

  // Pas d'animation si le visiteur a demandé à réduire les animations (réglage du système)
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
  let introFade = null

  if (!reduceMotion) {
    // Cercles : déjà en rotation au premier affichage (sens opposés), ils ralentissent jusqu'à leur place
    if (LAYOUT === 'rings' && INTRO_SPIN) {
      spin.inner = -INTRO_SPIN
      spin.outer = INTRO_SPIN
      layout()
      introSpin = gsap.to(spin, {
        inner: 0,
        outer: 0,
        duration: INTRO_DURATION,
        ease: INTRO_EASE,
        onUpdate: () => {
          layout()
          if (wired) drawWires(wired)
        },
        onComplete: () => (introSpin = null),
      })
    }

    // Index : les lignes apparaissent une à une, dans l'ordre de la liste. Le fondu passe par
    // filter: opacity() pour ne pas entrer en conflit avec l'opacité des survols / filtres.
    const rows = [...(indexList?.querySelectorAll('.index-item') ?? [])]
    introFade = gsap.fromTo(
      rows,
      { filter: 'opacity(0)' },
      { filter: 'opacity(1)', duration: INDEX_FADE, stagger: INDEX_STAGGER, ease: 'none', clearProps: 'filter' }
    )
  }

  cleanup = () => {
    introSpin?.kill()
    introFade?.kill()
    cancelAnimationFrame(resizeFrame)
    listeners.forEach((off) => off())
    svg.remove()
    ringLines.remove()
  }
}

export function destroy() {
  cleanup?.()
  cleanup = null
}
