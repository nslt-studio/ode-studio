// Mode dark / light : <html data-theme="light"> + boutons [data-mode="dark|light"], choix mémorisé.
// Les couleurs sont redéfinies en CSS dans Webflow (html[data-theme="light"] { --white: … }).

const KEY = 'ode-theme'
// Durée pendant laquelle html.theme-transition est présent (doit couvrir la transition CSS)
const TRANSITION = 300
let transitionTimer = null

function getSaved() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

// Remet .active sur le bon bouton (à rappeler après une navigation si les boutons sont dans #swup)
export function syncModeButtons() {
  const mode = document.documentElement.dataset.theme || 'dark'
  document.querySelectorAll('[data-mode]').forEach((b) => {
    b.classList.toggle('active', b.dataset.mode === mode)
  })
}

function setMode(mode, animate = false) {
  if (mode !== 'dark' && mode !== 'light') return
  const html = document.documentElement

  // Transition des couleurs uniquement le temps du changement (pas au chargement,
  // et sans interférer avec les autres transitions du site le reste du temps)
  if (animate && html.dataset.theme !== mode) {
    html.classList.add('theme-transition')
    clearTimeout(transitionTimer)
    transitionTimer = setTimeout(() => html.classList.remove('theme-transition'), TRANSITION)
  }

  html.dataset.theme = mode
  try {
    localStorage.setItem(KEY, mode)
  } catch {}
  syncModeButtons()
}

export function initTheme() {
  // Normalement déjà appliqué par le petit script du <head> (évite le flash), ceci sert de filet
  setMode(getSaved() || document.documentElement.dataset.theme || 'dark')

  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-mode]')
    if (button) setMode(button.dataset.mode, true)
  })
}
