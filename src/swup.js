import Swup from 'swup'
import { setAbout, setCurrentLinks } from './nav.js'
import { syncModeButtons } from './theme.js'

// Swup ne remplace que #swup : on resynchronise l'id de page Webflow
// et on relance webflow.js + les interactions (IX2) sur le nouveau contenu.
function resetWebflow(doc) {
  const pageId = doc?.documentElement.getAttribute('data-wf-page')
  if (pageId) document.documentElement.setAttribute('data-wf-page', pageId)

  const wf = window.Webflow
  if (!wf) return
  wf.destroy()
  wf.ready()
  wf.require('ix2')?.init()
}

export function initSwup({ onStart, onLeave, onEnter }) {
  const swup = new Swup({
    containers: ['#swup'],
  })

  // Déclenché dès le clic (et sur précédent/suivant du navigateur)
  swup.hooks.on('visit:start', (visit) => {
    setCurrentLinks(visit.to.url)
    setAbout(false)
    onStart?.(visit.to.url)
  })
  swup.hooks.before('content:replace', () => onLeave())
  swup.hooks.on('content:replace', (visit) => {
    resetWebflow(visit.to.document)
    syncModeButtons()
    onEnter()
  })

  return swup
}
