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

  document.querySelector('.nav .clock')?.classList.toggle('visible', open)
  // L'horloge ne calcule rien quand elle est cachée
  open ? startClock() : stopClock()

  const wrapper = document.querySelector('.main-wrapper')
  if (wrapper) {
    wrapper.style.opacity = open ? '0.25' : ''
    wrapper.style.filter = open ? 'blur(var(--blur))' : ''
    wrapper.style.pointerEvents = open ? 'none' : ''
  }

  // Scroll bloqué ; la classe about-open sert aussi aux pages (ex. la roue de la home ignore molette / clavier)
  document.documentElement.classList.toggle('about-open', open)
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
