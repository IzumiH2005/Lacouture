/* Routeur par ancre (#/…) : le fichier HTML fonctionne seul, ouvert localement ou en ligne.
   Chaque vue vit dans un gsap.context révoqué à la sortie : aucune animation ni
   ScrollTrigger ne survit à la page qui l'a créé. */
import { gsap, ScrollTrigger } from './motion/core.js';
import { sortie, entree } from './motion/page.js';
import { reveler } from './motion/reveal.js';
import { marquerNavigation } from './ui/menu.js';
import { fermerTout } from './ui/panel.js';

const routes = [];
export const route = (motif, vue) => routes.push({ motif, vue });

let actuelle = null; let ctx = null; let nettoyer = null; let premiere = true; let jeton = 0;

function resoudre(hash) {
  const chemin = hash.replace(/^#\/?/, '').replace(/\/$/, '');
  for (const r of routes) {
    const m = chemin.match(r.motif);
    if (m) return { vue: r.vue, params: m.slice(1).map((p) => (p ? decodeURIComponent(p) : p)), chemin };
  }
  return null;
}

export async function naviguer() {
  if (actuelle && !location.hash.startsWith('#/')) return; /* ancre ordinaire (#contenu…) */
  const n = ++jeton;
  const main = document.getElementById('contenu');
  const cible = resoudre(location.hash) || resoudre('#/introuvable');
  const { vue, params } = cible;

  /* Même vue, simple ancre interne (aide/section) : on défile sans tout reconstruire. */
  if (actuelle && actuelle.vue === vue && vue.ancre && actuelle.params[0] !== params[0] && vue.memePage?.(actuelle.params, params)) {
    actuelle = cible; vue.ancre(main, params); return;
  }

  await fermerTout();
  if (!premiere) await sortie(main);
  if (n !== jeton) return;

  nettoyer?.(); nettoyer = null;
  ctx?.revert(); ctx = null;
  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.set(main, { clearProps: 'all' });

  main.className = `vue${vue.inverse ? ' inverse' : ''}`;
  document.documentElement.classList.toggle('page-inverse', Boolean(vue.inverse));
  main.innerHTML = vue.rendu(...params);
  window.scrollTo(0, 0);
  document.title = `${vue.titre(...params)} · Lacouture`;
  marquerNavigation(vue.cle);
  actuelle = cible;

  ctx = gsap.context(() => {
    nettoyer = vue.monter?.(main, ...params, { premiere }) || null;
    reveler(main);
  }, main);

  entree(main);
  ScrollTrigger.refresh();
  if (!premiere) {
    const h1 = main.querySelector('h1');
    if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
  }
  vue.ancre?.(main, params, { immediat: true });
  premiere = false;
}

export function demarrer() {
  window.addEventListener('hashchange', naviguer);
  if (!location.hash) history.replaceState(null, '', '#/');
  return naviguer();
}

export const aller = (hash) => { if (location.hash === hash) naviguer(); else location.hash = hash; };
