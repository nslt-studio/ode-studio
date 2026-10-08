# ode-studio

JS du site Webflow, servi par un seul point d'entrée : `src/main.js`.

## Structure

```
src/
  main.js        point d'entrée : lance swup et monte/démonte la page courante
  swup.js        navigation (swup) + réinit Webflow/IX2 après chaque transition
  pages/
    home.js      chargé quand #swup a data-swup="home"
    work.js      chargé quand #swup a data-swup="work"
scripts/dev.js   Vite + tunnel Cloudflare
```

Dans Webflow, chaque page contient `<div class="main-wrapper" id="swup" data-swup="home">`.

Une page = un fichier `src/pages/<nom>.js` exportant `init(container)` et éventuellement `destroy()`.
Pas d'enregistrement à faire : il suffit de créer le fichier.

## Dev (live)

```
npm install
npm run dev
```

Le terminal affiche la balise à coller dans Webflow (Site settings → Custom code → Footer) :

```html
<script type="module" src="https://xxxx.trycloudflare.com/src/main.js"></script>
```

Chaque sauvegarde recharge automatiquement la page Webflow.

L'URL `trycloudflare.com` change à chaque `npm run dev`. Pour une URL fixe, créer un tunnel nommé
sur Cloudflare (Zero Trust → Networks → Tunnels, hostname public → `http://127.0.0.1:5173`)
et renseigner `.env` (voir `.env.example`).

## Prod

```
npm run build   # -> dist/main.js (swup inclus)
```

Après push sur GitHub :

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/nslt-studio/ode-studio@main/dist/main.js"></script>
```

## Transitions

swup anime les éléments ayant une classe `transition-*`. Ajouter la classe `transition-fade`
au `.main-wrapper` dans Webflow, et ce CSS :

```css
html.is-changing .transition-fade { transition: opacity .3s; opacity: 1; }
html.is-animating .transition-fade { opacity: 0; }
```
