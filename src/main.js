import { initNav, updateHeadline } from './nav.js'
import { initSwup } from './swup.js'
import { initTheme } from './theme.js'

// Chaque fichier de src/pages/ correspond à une valeur de data-swup (home.js -> data-swup="home")
const pages = import.meta.glob('./pages/*.js', { eager: true })

let current = null

// Pages où .nav et .footer sont masqués (opacity 0, non cliquables, fondu 300ms)
const HIDE_CHROME = ['work-details', 'journal-details']
// Pages où #headline est masqué (opacity 0, non cliquable, immédiatement)
const HIDE_HEADLINE = ['work']

// Page d'arrivée devinée d'après l'URL, pour agir dès le clic (avant le chargement de la page) ;
// corrigé ensuite par le data-swup réel à l'arrivée
function pageFromUrl(url) {
  const path = new URL(url, location.origin).pathname
  if (/^\/work\/[^/]+\/?$/.test(path)) return 'work-details'
  if (/^\/work\/?$/.test(path)) return 'work'
  if (/^\/journal\/[^/]+\/?$/.test(path)) return 'journal-details'
  if (/^\/journal\/?$/.test(path)) return 'journal'
  if (path === '/') return 'home'
  return null
}

function syncChrome(name) {
  const hidden = HIDE_CHROME.includes(name)
  document.querySelectorAll('.nav, .footer').forEach((el) => {
    el.style.transition = 'opacity 300ms var(--easing)'
    el.style.opacity = hidden ? '0' : ''
    el.style.pointerEvents = hidden ? 'none' : ''
  })

  // #headline : masqué sur ces pages, sauf quand about est ouvert (géré par nav.js)
  const headline = document.querySelector('#headline')
  if (headline) headline.dataset.pageHidden = HIDE_HEADLINE.includes(name)
  updateHeadline()
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
    onStart: (url) => syncChrome(pageFromUrl(url)),
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
