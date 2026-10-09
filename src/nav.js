// Comportements globaux de la nav, initialisés une seule fois (la nav est hors de #swup).
import { initClock, startClock, stopClock } from './clock.js'
import { initGraph, setGraphOpen } from './graph.js'

// Bascule w--current sur les liens pointant vers la page de destination
export function setCurrentLinks(url) {
  const path = new URL(url, location.origin).pathname

  document.querySelectorAll('a.w--current').forEach((a) => {
    a.classList.remove('w--current')
    a.removeAttribute('aria-current')
  })

  document.querySelectorAll('a[href]').forEach((a) => {
    if (a.origin === location.origin && a.pathname === path) {
      a.classList.add('w--current')
      a.setAttribute('aria-current', 'page')
    }
  })
}

// #headline : masqué sur certaines pages (data-page-hidden, posé par main.js) via la classe
// html.hide-headline, mais toujours visible quand about est ouvert (html.about-open).
// La même règle est posée dans le <head> Webflow avec un petit script : en arrivant directement sur une
// page concernée, #headline est masqué avant le premier affichage (pas de clignotement).
// Changement de page : immédiat ; ouverture / fermeture d'about : fondu (animate).
const headlineStyle = document.createElement('style')
headlineStyle.textContent = `
  html.hide-headline:not(.about-open) #headline { opacity: 0 !important; pointer-events: none !important; }
  html.about-open #headline { opacity: 1 !important; pointer-events: auto !important; }
`
document.head.append(headlineStyle)

export function updateHeadline({ animate = false } = {}) {
  const headline = document.querySelector('#headline')
  if (headline) headline.style.transition = animate ? 'opacity 300ms var(--easing)' : 'none'
  document.documentElement.classList.toggle('hide-headline', headline?.dataset.pageHidden === 'true')
}

// Panneau about : #aboutButton ouvre/ferme [data-accordion="about"]
let aboutOpen = false

export function setAbout(open) {
  aboutOpen = open

  // Libellé du bouton : "Close" quand about est ouvert, "About" sinon
  document.querySelectorAll('#aboutButton').forEach((b) => {
    b.setAttribute('aria-expanded', open)
    b.textContent = open ? 'Close' : 'About'
  })

  const accordion = document.querySelector('[data-accordion="about"]')
  const inner = accordion?.querySelector('.accordion-inner')
  if (accordion) {
    // scrollHeight : hauteur réelle du contenu, même si l'inner est écrasé par le max-height du parent
    accordion.style.maxHeight = open && inner ? `${inner.scrollHeight}px` : '0px'
  }

  // .nav-right (horloge + graph) : apparaît / disparaît avec l'accordéon ; rien ne tourne quand il est caché
  document.querySelector('.nav-right')?.classList.toggle('visible', open)
  open ? startClock() : stopClock()
  setGraphOpen(open)

  const wrapper = document.querySelector('.main-wrapper')
  if (wrapper) {
    wrapper.style.opacity = open ? '0.25' : ''
    wrapper.style.filter = open ? 'blur(var(--blur))' : ''
    wrapper.style.pointerEvents = open ? 'none' : ''
  }

  // Scroll bloqué ; la classe about-open sert aussi aux pages (ex. la roue de la home ignore molette / clavier)
  document.documentElement.classList.toggle('about-open', open)
  updateHeadline({ animate: true })
  document.documentElement.style.overflow = open ? 'hidden' : ''
  document.body.style.overflow = open ? 'hidden' : ''

  // #about dans l'URL (replaceState : pas d'entrée d'historique, et on garde l'état de swup)
  const url = new URL(location.href)
  url.hash = open ? 'about' : ''
  history.replaceState(history.state, '', url.href.replace(/#$/, ''))
}

function initAboutButton() {
  // Délégation : fonctionne même si le bouton est dans #swup et remplacé à chaque page
  document.addEventListener('click', (e) => {
    if (e.target.closest('#aboutButton')) setAbout(!aboutOpen)
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && aboutOpen) setAbout(false)
  })
}

// .nav-selection : chaque bouton [data-select] fait défiler .nav-right jusqu'à sa section.
// Le bouton de la section affichée prend .active, y compris quand on fait défiler à la main.
const SECTIONS = { top: '.graph', center: '.headline', bottom: '.clock' }
function initNavSelection() {
  const navRight = document.querySelector('.nav-right')
  const buttons = [...(navRight?.querySelectorAll('[data-select]') ?? [])]
  // Bouton -> section de .nav-right ; les sections absentes de la page sont ignorées
  const targets = Object.fromEntries(
    Object.entries(SECTIONS)
      .map(([key, selector]) => [key, navRight?.querySelector(selector)])
      .filter(([, el]) => el)
  )
  const keys = Object.keys(targets)
  if (!buttons.length || !keys.length) return

  // Conteneur qui défile (scroll snap) : le premier parent des sections en overflow auto / scroll
  let scroller = targets[keys[0]].parentElement
  while (scroller && scroller !== navRight && !/(auto|scroll)/.test(getComputedStyle(scroller).overflowY)) {
    scroller = scroller.parentElement
  }
  if (!scroller) return

  const offsetIn = (el) => el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop

  const setActive = (key) => buttons.forEach((b) => b.classList.toggle('active', b.dataset.select === key))

  // Pendant le défilement lancé par un clic, le bouton cliqué reste actif (pas d'aller-retour de classe)
  let clicked = null
  let clickTimer = null

  buttons.forEach((button) =>
    button.addEventListener('click', () => {
      const key = button.dataset.select
      if (!targets[key]) return
      setActive(key)
      clicked = key
      clearTimeout(clickTimer)
      clickTimer = setTimeout(() => (clicked = null), 1000)
      scroller.scrollTo({ top: offsetIn(targets[key]), behavior: 'smooth' })
    })
  )

  // Défilement à la main : la section la plus proche du haut du conteneur devient active
  scroller.addEventListener(
    'scroll',
    () => {
      if (clicked) return
      const top = scroller.scrollTop
      const distance = (key) => Math.abs(offsetIn(targets[key]) - top)
      setActive(keys.reduce((best, key) => (distance(key) < distance(best) ? key : best)))
    },
    { passive: true }
  )
}

export function initNav() {
  initAboutButton()
  initClock()
  initGraph()
  initNavSelection()
  if (location.hash === '#about') setAbout(true)
}
