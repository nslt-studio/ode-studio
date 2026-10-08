import { initNav } from './nav.js'
import { initSwup } from './swup.js'
import { initTheme } from './theme.js'

// Chaque fichier de src/pages/ correspond à une valeur de data-swup (home.js -> data-swup="home")
const pages = import.meta.glob('./pages/*.js', { eager: true })

let current = null

// Pages où .nav et .footer sont masqués (opacity 0, non cliquables)
const HIDE_CHROME = ['details']
// URL des pages details, pour masquer .nav / .footer dès le clic (avant le chargement de la page)
const DETAILS_URL = /^\/work\/[^/]+\/?$/

function syncChrome(name) {
  setChrome(HIDE_CHROME.includes(name))
}

function setChrome(hidden) {
  document.querySelectorAll('.nav, .footer').forEach((el) => {
    el.style.transition = 'opacity 150ms var(--easing)'
    el.style.opacity = hidden ? '0' : ''
    el.style.pointerEvents = hidden ? 'none' : ''
  })
}

function mountPage() {
  const container = document.querySelector('#swup')
  const name = container?.dataset.swup
  syncChrome(name)
  const page = pages[`./pages/${name}.js`]
  if (!page) return
  current = page
  page.init?.(container)
}

function unmountPage() {
  current?.destroy?.()
  current = null
}

// Garde-fou : si le script est inclus deux fois dans Webflow, les clics seraient traités en double
if (window.__odeStudio) {
  console.warn('[ode-studio] main.js chargé plusieurs fois, instance ignorée')
} else {
  window.__odeStudio = true
  initTheme()
  initNav()
  initSwup({
    // Dès le clic : on devine la page d'arrivée d'après l'URL ; corrigé par data-swup à l'arrivée
    onStart: (url) => setChrome(DETAILS_URL.test(new URL(url, location.origin).pathname)),
    onLeave: unmountPage,
    onEnter: mountPage,
  })
  mountPage()
}

// Dev : sans ce bloc, le client HMR de Vite n'est pas chargé (pas de index.html).
// Toute modif remonte jusqu'ici sans être acceptée -> rechargement complet de la page Webflow.
if (import.meta.hot) {
  import.meta.hot.on('vite:beforeFullReload', unmountPage)
}
