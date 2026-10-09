// Comportements globaux de la nav, initialisés une seule fois (la nav est hors de #swup).
import { initClock, startClock, stopClock } from './clock.js'

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

  document.querySelectorAll('#aboutButton').forEach((b) => b.setAttribute('aria-expanded', open))

  const accordion = document.querySelector('[data-accordion="about"]')
  const inner = accordion?.querySelector('.accordion-inner')
  if (accordion) {
    // scrollHeight : hauteur réelle du contenu, même si l'inner est écrasé par le max-height du parent
    accordion.style.maxHeight = open && inner ? `${inner.scrollHeight}px` : '0px'
  }

  // Horloge : apparaît / disparaît avec l'accordéon ; elle ne calcule rien quand elle est cachée
  document.querySelector('.nav .clock')?.classList.toggle('visible', open)
  open ? startClock() : stopClock()

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

export function initNav() {
  initAboutButton()
  initClock()
  if (location.hash === '#about') setAbout(true)
}
