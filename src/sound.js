// Petit "clic" sonore partagé par les pages (nouvel item actif de la roue, survol de l'index…).
// Clic synthétisé (Web Audio, aucun fichier) : bruit très court filtré dans les aigus, qui s'éteint
// en ~25 ms. Les navigateurs n'autorisent le son qu'après une interaction (clic, touche, toucher) :
// le contexte audio est créé / réveillé à la première interaction, les clics d'avant sont muets.

// Volume par défaut (0 = muet)
const CLICK_VOLUME = 0.025

let audio = null
let noise = null

function unlockAudio() {
  if (!CLICK_VOLUME) return
  try {
    audio ??= new AudioContext()
    if (audio.state === 'suspended') audio.resume()
    if (!noise) {
      noise = audio.createBuffer(1, Math.round(audio.sampleRate * 0.03), audio.sampleRate)
      const data = noise.getChannelData(0)
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
    }
  } catch {}
}

export function playClick(volume = CLICK_VOLUME) {
  if (!volume || !audio || audio.state !== 'running') return
  const t = audio.currentTime
  const source = audio.createBufferSource()
  source.buffer = noise
  const filter = audio.createBiquadFilter()
  filter.type = 'highpass'
  filter.frequency.value = 2500
  const gain = audio.createGain()
  gain.gain.setValueAtTime(volume, t)
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.025)
  source.connect(filter).connect(gain).connect(audio.destination)
  source.start(t)
  source.stop(t + 0.03)
}

;['pointerdown', 'keydown', 'touchend'].forEach((type) => addEventListener(type, unlockAudio, { passive: true }))
