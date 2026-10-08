// Work : nuage de .dots-item + grille de .grid-item reliés par leur slug (data-dots = data-grid)
// et par leurs clients (data-client). Survoler un point ou une case met en avant le projet,
// les projets partageant un client, les relie par des fils et estompe le reste de la grille.

// Rayon du nuage, en fraction de la moitié du plus petit côté de .dots-list
const CLOUD = 0.5
// Marge (px) à garder entre les items (titres compris) et les bords de l'écran
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
// Opacité des .grid-item qui ne correspondent pas au survol
const DIM = 0.35
const TRANSITION = 'opacity 150ms var(--easing)'
// Épaisseur des fils (px)
const WIRE_WIDTH = 0.5
// Index : opacité des autres .index-item au survol
const INDEX_DIM = 0.35
// Décalage (px) du coin haut gauche de .index-media par rapport à la souris
const MEDIA_OFFSET = 12
// Filtres : opacité des .grid-item / .index-item écartés, et durée du repositionnement du nuage
const FILTERED_OPACITY = 0.1
const MOVE = 'left 300ms var(--easing), top 300ms var(--easing)'

let cleanup = null

const clientsOf = (el) =>
  [...el.querySelectorAll('.clients-item')].map((c) => (c.dataset.client || c.textContent).trim()).filter(Boolean)

// "Art Direction" / "art-direction" / "Art direction " -> "art-direction" (comparaisons de filtres)
const slugify = (v = '') =>
  v
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
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

export function init(container) {
  const list = container.querySelector('.dots-list')
  const dots = [...(list?.querySelectorAll('.dots-item') ?? [])]
  const grids = [...container.querySelectorAll('.grid-list .grid-item')]
  if (!dots.length) return

  /* ---------- Clients ---------- */

  // slug -> Set des clients (en minuscules pour la comparaison)
  const clients = new Map()
  dots.forEach((dot) => {
    const names = clientsOf(dot)
    dot.dataset.client = names.join(', ')
    clients.set(dot.dataset.dots, new Set(names.map((c) => c.toLowerCase())))
  })
  grids.forEach((grid) => {
    const dot = dots.find((d) => d.dataset.dots === grid.dataset.grid)
    if (dot) grid.dataset.client = dot.dataset.client
  })

  // Projets partageant au moins un client avec `slug` (lui compris)
  function related(slug) {
    const own = clients.get(slug) ?? new Set()
    return dots
      .filter(isDotActive)
      .map((d) => d.dataset.dots)
      .filter((s) => s === slug || [...(clients.get(s) ?? [])].some((c) => own.has(c)))
  }

  /* ---------- Nuage ---------- */

  // Position (disque de rayon 1) de chaque point ; le nuage complet garde toujours la même disposition
  const original = new Map(scatter(dots.length).map((p, i) => [dots[i], p]))
  let points = new Map(original)
  // Centre de chaque .dots-link une fois placé (coordonnées de la liste) : sert aux fils,
  // même pendant le repositionnement animé
  const anchorPos = new Map()
  const titlesOf = (dot) => dot.querySelector('.dots-titles')
  const anchorOf = (dot) => dot.querySelector('.dots-link') || dot

  dots.forEach((dot) => {
    // L'opacité de repos (ex. 0.35) est sur le .dots-link : c'est lui qui passe à 1 à la sélection
    anchorOf(dot).style.transition = TRANSITION
    const titles = titlesOf(dot)
    if (titles) {
      titles.style.opacity = '0'
      titles.style.transition = TRANSITION
    }
  })

  // Rayon du nuage (px), mis à jour par layout()
  let radius = 0

  // animate : repositionnement lisse (filtres) ; sinon placement direct (chargement, resize)
  function layout({ animate = false } = {}) {
    const listRect = list.getBoundingClientRect()
    // Nuage caché (ex. arrivée en vue list) : rien à mesurer, il sera placé à l'affichage de la grille
    if (!list.offsetParent && getComputedStyle(list).position !== 'fixed') return
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

    dots.filter(isDotActive).forEach((dot) => {
      // Étendue de l'item (titres compris) autour du centre du point : mesures relatives,
      // valables quelle que soit sa position actuelle (même en cours d'animation)
      const itemRect = dot.getBoundingClientRect()
      const titlesRect = titlesOf(dot)?.getBoundingClientRect() ?? itemRect
      const a = anchorOf(dot).getBoundingClientRect()
      const ax = a.left + a.width / 2 - itemRect.left
      const ay = a.top + a.height / 2 - itemRect.top
      const ext = {
        left: Math.min(itemRect.left, titlesRect.left) - itemRect.left - ax,
        top: Math.min(itemRect.top, titlesRect.top) - itemRect.top - ay,
        right: Math.max(itemRect.right, titlesRect.right) - itemRect.left - ax,
        bottom: Math.max(itemRect.bottom, titlesRect.bottom) - itemRect.top - ay,
      }

      const clamp = (v, min, max) => (min > max ? (min + max) / 2 : Math.min(Math.max(v, min), max))
      const point = points.get(dot)
      const x = clamp(cx + point.x * radius, bounds.left + PADDING - ext.left, bounds.right - PADDING - ext.right)
      const y = clamp(cy + point.y * radius, bounds.top + PADDING - ext.top, bounds.bottom - PADDING - ext.bottom)

      dot.style.transition = animate ? MOVE : 'none'
      dot.style.left = `${x - ax}px`
      dot.style.top = `${y - ay}px`
      anchorPos.set(dot, { x, y })
    })
  }

  /* ---------- Fils ---------- */

  const svgNS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNS, 'svg')
  Object.assign(svg.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    height: '100%',
    overflow: 'visible',
    pointerEvents: 'none',
    opacity: '0',
    transition: TRANSITION,
  })
  if (getComputedStyle(list).position === 'static') list.style.position = 'relative'
  const path = document.createElementNS(svgNS, 'path')
  path.setAttribute('fill', 'none')
  path.setAttribute('stroke', 'var(--white)')
  path.setAttribute('stroke-width', String(WIRE_WIDTH))
  path.setAttribute('vector-effect', 'non-scaling-stroke')
  svg.append(path)
  list.prepend(svg)

  // Relie les points dans l'ordre angulaire autour de leur centre (boucle fermée dès 3 points),
  // chaque segment légèrement courbé vers l'extérieur
  // Groupe actuellement relié (redessiné si les points bougent au resize)
  let wired = null

  function drawWires(slugs) {
    const pts = slugs
      .map((s) => dots.find((d) => d.dataset.dots === s))
      .filter((dot) => dot && isDotActive(dot) && anchorPos.has(dot))
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

  // slug survolé (point ou case) : le projet + ceux qui partagent un client passent à 1, reliés par
  // des fils ; les cases de la grille qui ne correspondent pas sont estompées.
  function highlight(slug, { scroll = false, title = false } = {}) {
    const group = related(slug)
    wired = group

    dots.forEach((dot) => {
      anchorOf(dot).style.opacity = group.includes(dot.dataset.dots) ? '1' : ''
      const titles = titlesOf(dot)
      if (title && titles) titles.style.opacity = dot.dataset.dots === slug ? '1' : '0'
    })
    grids.forEach((grid) => styleGrid(grid, !group.includes(grid.dataset.grid)))
    drawWires(group)

    // Défilement automatique seulement si la grille est la vue affichée
    if (scroll && view === 'grid') {
      const matching = grids.filter((g) => isGridActive(g) && group.includes(g.dataset.grid))
      const visible = matching.some((g) => {
        const r = g.getBoundingClientRect()
        return r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth
      })
      const target = grids.find((g) => g.dataset.grid === slug) ?? matching[0]
      if (!visible && target) target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  function clear() {
    wired = null
    dots.forEach((dot) => {
      anchorOf(dot).style.opacity = ''
      const titles = titlesOf(dot)
      if (titles) titles.style.opacity = '0'
    })
    grids.forEach((grid) => styleGrid(grid, false))
    svg.style.opacity = '0'
  }

  // Opacité d'une case : écartée par les filtres (0.1, non cliquable), estompée par un survol (DIM), ou normale
  function styleGrid(grid, dimmed) {
    const active = isGridActive(grid)
    grid.style.opacity = !active ? String(FILTERED_OPACITY) : dimmed ? String(DIM) : ''
    grid.style.pointerEvents = active ? '' : 'none'
  }

  grids.forEach((grid) => (grid.style.transition = TRANSITION))


  /* ---------- Liens de l'index ---------- */

  // .index-link : href = slug seul dans Webflow -> /work/slug (liens absolus, ancres et déjà préfixés ignorés)
  container.querySelectorAll('.index-list .index-item .index-link').forEach((link) => {
    const href = link.getAttribute('href')?.trim()
    if (!href || /^([a-z]+:|#|\/\/)/i.test(href)) return
    const slug = href.replace(/^\/+/, '')
    if (!slug || slug.startsWith('work/')) return
    link.setAttribute('href', `/work/${slug}`)
  })

  /* ---------- Tri de l'index ---------- */

  // Chaque .index-item reçoit data-client (ses .clients-item) et data-services (ses .services-item,
  // eux-mêmes remis dans l'ordre alphabétique dans leur .services-list).
  // Les boutons [data-caption] de .index-caption trient la liste (A → Z) ; "client" par défaut.
  const collator = new Intl.Collator('fr', { numeric: true, sensitivity: 'base' })
  const indexList = container.querySelector('.index-list')
  const sortItems = [...(indexList?.querySelectorAll('.index-item') ?? [])]

  sortItems.forEach((item) => {
    item.dataset.client = clientsOf(item).join(', ')

    const servicesList = item.querySelector('.services-list')
    const services = [...item.querySelectorAll('.services-item')].sort((a, b) =>
      collator.compare(a.textContent.trim(), b.textContent.trim())
    )
    if (servicesList) services.forEach((el) => servicesList.append(el))
    item.dataset.services = services.map((el) => el.textContent.trim()).filter(Boolean).join(', ')
  })

  // Valeur de tri de chaque critère (pour les clients / services : le premier de la liste)
  const SORT_KEYS = {
    client: (item) => item.dataset.client.split(', ')[0],
    project: (item) => item.dataset.index,
    services: (item) => item.dataset.services.split(', ')[0],
    type: (item) => item.dataset.type,
    year: (item) => item.dataset.year,
  }
  let caption = 'client'
  let reverse = false

  // Nouveau critère : A → Z ; re-clic sur le critère actif : inverse l'ordre (Z → A, puis A → Z…)
  function sortIndex(key, toggle = false) {
    if (!SORT_KEYS[key] || !indexList) return
    reverse = toggle && key === caption ? !reverse : false
    caption = key
    container.querySelectorAll('.index-caption [data-caption]').forEach((b) => {
      b.classList.toggle('active', b.dataset.caption === key)
      // .reverse sur le bouton actif quand l'ordre est Z → A (utile pour un indicateur en CSS)
      b.classList.toggle('reverse', b.dataset.caption === key && reverse)
    })
    const value = (item) => (SORT_KEYS[key](item) ?? '').trim()
    sortItems
      .slice()
      .sort((a, b) => {
        const va = value(a)
        const vb = value(b)
        // Valeurs vides toujours en fin de liste, quel que soit le sens
        if (!va || !vb) return !va - !vb
        return reverse ? collator.compare(vb, va) : collator.compare(va, vb)
      })
      // Filtres : les projets actifs en haut, les autres ensuite (chacun dans l'ordre du tri)
      .sort((a, b) => isIndexActive(b) - isIndexActive(a))
      .forEach((item) => indexList.append(item))
  }

  /* ---------- Survol de l'index ---------- */

  // Survol d'un .index-item : les autres passent à INDEX_DIM, son .index-media apparaît et suit
  // directement la souris (sans retard)
  const indexItems = [...container.querySelectorAll('.index-list .index-item')]
  const pointer = { x: innerWidth / 2, y: innerHeight / 2 }
  const followers = new Map()

  // Aucune transition sur le survol de l'index (y compris celles éventuellement définies dans Webflow)
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

  // Coin haut gauche du média juste en bas à droite de la souris, sans jamais sortir de l'écran
  function placeMedia(media) {
    const x = Math.min(pointer.x + MEDIA_OFFSET, innerWidth - media.offsetWidth - MEDIA_OFFSET)
    const y = Math.min(pointer.y + MEDIA_OFFSET, innerHeight - media.offsetHeight - MEDIA_OFFSET)
    media.style.transform = `translate(${Math.max(x, 0)}px, ${Math.max(y, 0)}px)`
  }

  function onIndexEnter(item) {
    hoveredIndex = item
    indexItems.forEach((other) => styleIndex(other, other !== item))
    const media = followers.get(item)
    if (!media) return
    placeMedia(media)
    media.style.opacity = '1'
  }

  function onIndexLeave(item) {
    if (hoveredIndex === item) hoveredIndex = null
    const media = followers.get(item)
    if (media) media.style.opacity = '0'
    // Passage direct d'un item à l'autre : le pointerenter suivant réapplique les opacités
    requestAnimationFrame(() => {
      if (!hoveredIndex) indexItems.forEach((other) => styleIndex(other, false))
    })
  }

  // Opacité d'une ligne : écartée par les filtres (0.1, non cliquable), estompée par un survol, ou normale
  function styleIndex(item, dimmed) {
    const active = isIndexActive(item)
    item.style.opacity = !active ? String(FILTERED_OPACITY) : dimmed ? String(INDEX_DIM) : ''
    item.style.pointerEvents = active ? '' : 'none'
  }

  function onIndexMove(e) {
    pointer.x = e.clientX
    pointer.y = e.clientY
    const media = hoveredIndex && followers.get(hoveredIndex)
    if (media) placeMedia(media)
  }

  /* ---------- Filtres ---------- */

  // #filterButton : 1er clic ouvre [data-accordion="filter"] (max-height = hauteur de son .accordion-inner,
  // comme l'accordéon de la nav), .active sur le bouton et son .triangle-bottom pivote de 180° ; 2e clic referme.
  const filterButton = container.querySelector('#filterButton, .filterButton')
  const filterAccordion = container.querySelector('[data-accordion="filter"]')
  const filterTriangle = filterButton?.querySelector('.triangle-bottom svg, svg.triangle-bottom, .triangle-bottom')
  let filterOpen = false

  if (filterTriangle) {
    filterTriangle.style.transformOrigin = '50% 50%'
    filterTriangle.style.transition = 'rotate 150ms var(--easing)'
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
  }

  /* ---------- Filtrage ---------- */

  // Les attributs des .index-item (type, année, services, clients, nom) sont copiés sur le .dots-item
  // et le .grid-item du même projet (data-index ou slug du lien = data-dots = data-grid).
  const COPIED = ['index', 'type', 'year', 'services', 'client']
  const dotBySlug = new Map(dots.map((d) => [slugify(d.dataset.dots), d]))
  const gridBySlug = new Map(grids.map((g) => [slugify(g.dataset.grid), g]))
  sortItems.forEach((item) => {
    const linkSlug = item.querySelector('.index-link')?.getAttribute('href')?.split('/').filter(Boolean).pop()
    const keys = [item.dataset.index, linkSlug].map(slugify).filter(Boolean)
    const targets = [
      keys.map((k) => dotBySlug.get(k)).find(Boolean),
      keys.map((k) => gridBySlug.get(k)).find(Boolean),
    ]
    targets.forEach((target) => {
      if (!target) return
      COPIED.forEach((attr) => {
        if (item.dataset[attr] && !target.dataset[attr]) target.dataset[attr] = item.dataset[attr]
      })
    })
  })

  // Boutons [data-service] / [data-type] de .filters ; "all" = aucun filtre sur ce groupe.
  // Plusieurs filtres d'un même groupe : OU ; services ET type : les deux doivent correspondre.
  const filterButtons = [...container.querySelectorAll('.filters [data-service], .filters [data-type]')]
  const groupOf = (b) => ('service' in b.dataset ? 'service' : 'type')
  const valueOf = (b) => slugify(b.dataset[groupOf(b)])
  const selected = { service: new Set(), type: new Set() }
  const filterLabel = filterButton?.querySelector('p')
  const filterLabelText = filterLabel?.textContent.trim() ?? ''

  function matches(el) {
    const services = (el.dataset.services ?? '').split(',').map(slugify).filter(Boolean)
    const type = slugify(el.dataset.type)
    return (
      (!selected.service.size || services.some((s) => selected.service.has(s))) &&
      (!selected.type.size || selected.type.has(type))
    )
  }

  function isDotActive(dot) {
    return matches(dot)
  }
  function isGridActive(grid) {
    return matches(grid)
  }
  function isIndexActive(item) {
    return matches(item)
  }

  function applyFilters({ animate = true } = {}) {
    filterButtons.forEach((b) => {
      const group = groupOf(b)
      const value = valueOf(b)
      b.classList.toggle('active', value === 'all' ? !selected[group].size : selected[group].has(value))
    })
    const count = selected.service.size + selected.type.size
    if (filterLabel) filterLabel.textContent = count ? `${filterLabelText} (${count})` : filterLabelText

    clear()

    // Grille : actifs en haut (dans leur ordre d'origine), les autres en dessous à 0.1
    const gridParent = grids[0]?.parentElement
    if (gridParent) {
      ;[...grids.filter(isGridActive), ...grids.filter((g) => !isGridActive(g))].forEach((g) => gridParent.append(g))
    }
    grids.forEach((grid) => styleGrid(grid, false))

    // Index : même principe, en gardant le tri en cours
    indexItems.forEach((item) => styleIndex(item, false))
    sortIndex(caption)

    // Nuage : points écartés masqués, les autres redistribués (disposition d'origine si aucun filtre)
    const visible = dots.filter(isDotActive)
    dots.forEach((dot) => (dot.style.display = isDotActive(dot) ? '' : 'none'))
    points = visible.length === dots.length ? new Map(original) : new Map(scatter(visible.length).map((p, i) => [visible[i], p]))
    layout({ animate })
  }

  function toggleFilter(button) {
    const group = groupOf(button)
    const value = valueOf(button)
    if (value === 'all') selected[group].clear()
    else if (selected[group].has(value)) selected[group].delete(value)
    else selected[group].add(value)
    applyFilters()
  }

  /* ---------- Vue grid / list ---------- */

  // [data-view="grid|list"] : .grid (display grid) ou .index (display flex). L'ancienne vue fait un
  // fondu sortant avant display none, la nouvelle un fondu entrant ; retour en haut entre les deux.
  // La vue est dans l'URL : ?view=list (pas de paramètre = grid).
  const views = { grid: container.querySelector('.grid'), list: container.querySelector('.index') }
  const DISPLAY = { grid: 'grid', list: 'flex' }
  let view = new URLSearchParams(location.search).get('view') === 'list' ? 'list' : 'grid'
  let viewTimer = null
  // Durée totale du changement de vue (ms) : moitié fondu sortant, moitié fondu entrant
  const VIEW_DURATION = 150
  const VIEW_TRANSITION = `opacity ${VIEW_DURATION / 2}ms var(--easing)`

  function syncViewButtons() {
    document.querySelectorAll('[data-view]').forEach((b) => b.classList.toggle('active', b.dataset.view === view))
  }

  function showView(key) {
    const el = views[key]
    if (!el) return
    el.style.display = DISPLAY[key]
    // Le nuage a pu être caché jusqu'ici (arrivée en vue list) : on le (re)place maintenant qu'il est visible
    layout()
    el.style.opacity = '0'
    el.style.transition = VIEW_TRANSITION
    el.getBoundingClientRect() // le navigateur prend en compte opacity 0 avant de lancer le fondu
    el.style.opacity = '1'
  }

  function setView(key) {
    if (!views[key] || key === view) return
    const previous = views[view]
    view = key
    syncViewButtons()
    clear()

    const url = new URL(location.href)
    if (key === 'list') url.searchParams.set('view', 'list')
    else url.searchParams.delete('view')
    history.replaceState(history.state, '', url.href)

    clearTimeout(viewTimer)
    Object.values(views).forEach((el) => el && el !== previous && (el.style.display = 'none'))
    if (previous) {
      previous.style.transition = VIEW_TRANSITION
      previous.style.opacity = '0'
    }
    viewTimer = setTimeout(() => {
      if (previous) previous.style.display = 'none'
      scrollTo(0, 0)
      showView(key)
    }, previous ? VIEW_DURATION / 2 : 0)
  }

  // État initial, sans animation
  Object.entries(views).forEach(([key, el]) => {
    if (!el) return
    el.style.display = key === view ? DISPLAY[key] : 'none'
    el.style.opacity = key === view ? '1' : '0'
  })
  syncViewButtons()
  applyFilters({ animate: false })

  /* ---------- Événements ---------- */

  const onViewClick = (e) => {
    const button = e.target.closest('[data-view]')
    if (button) setView(button.dataset.view)
  }
  document.addEventListener('click', onViewClick)

  const listeners = []
  const on = (el, type, fn) => {
    el.addEventListener(type, fn)
    listeners.push(() => el.removeEventListener(type, fn))
  }

  dots.forEach((dot) => {
    on(dot, 'pointerenter', () => highlight(dot.dataset.dots, { scroll: true }))
    on(dot, 'pointerleave', clear)

    // Titres : visibles uniquement au survol du .dots-link
    const link = dot.querySelector('.dots-link')
    const titles = titlesOf(dot)
    if (link && titles) {
      on(link, 'pointerenter', () => (titles.style.opacity = '1'))
      on(link, 'pointerleave', () => (titles.style.opacity = '0'))
    }
  })

  indexItems.forEach((item) => {
    on(item, 'pointerenter', () => onIndexEnter(item))
    on(item, 'pointerleave', () => onIndexLeave(item))
  })
  on(window, 'pointermove', onIndexMove)
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

  grids.forEach((grid) => {
    on(grid, 'pointerenter', () => highlight(grid.dataset.grid, { title: true }))
    on(grid, 'pointerleave', clear)
  })

  let resizeFrame = null
  const onResize = () => {
    cancelAnimationFrame(resizeFrame)
    resizeFrame = requestAnimationFrame(() => {
      layout()
      if (wired) drawWires(wired)
    })
  }
  addEventListener('resize', onResize)

  cleanup = () => {
    clearTimeout(viewTimer)
    document.removeEventListener('click', onViewClick)
    cancelAnimationFrame(resizeFrame)
    removeEventListener('resize', onResize)
    listeners.forEach((off) => off())
    svg.remove()
  }
}

export function destroy() {
  cleanup?.()
  cleanup = null
}
