/* Panneau modal : feuille du bas sur mobile, volet de droite sur desktop (D.6).
   Focus piégé, Échap ferme, le focus revient à l'élément d'origine. */
import { gsap, duree } from '../motion/core.js';
import { fragment, $$ } from '../util/dom.js';
import { icone } from './icons.js';

const mqLarge = window.matchMedia('(min-width: 1024px)');
const FOCUSABLES = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';
const ouverts = [];

export function piegerFocus(conteneur, e) {
  if (e.key !== 'Tab') return;
  const f = $$(FOCUSABLES, conteneur).filter((x) => x.offsetParent !== null || x === document.activeElement);
  if (!f.length) return;
  const premier = f[0]; const dernier = f[f.length - 1];
  if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
  else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
}

export function verrouiller(oui) {
  document.body.classList.toggle('verrou', oui);
  const app = document.getElementById('app');
  if (app) app.inert = oui;
}

export function creerPanneau({ id, titre, large = false }) {
  const voile = fragment('<div class="voile" aria-hidden="true"></div>');
  const el = fragment(`<div class="panneau${large ? ' panneau--large' : ''}" id="${id}" role="dialog" aria-modal="true" aria-labelledby="${id}-titre" tabindex="-1">
    <span class="panneau__poignee" aria-hidden="true"></span>
    <div class="panneau__entete"><h2 class="panneau__titre" id="${id}-titre">${titre}</h2>
      <button type="button" class="bouton-icone" data-fermer aria-label="Fermer">${icone('fermer')}</button></div>
    <div class="panneau__corps"></div>
    <div class="panneau__pied" hidden></div>
  </div>`);
  document.body.append(voile, el);
  const corps = el.querySelector('.panneau__corps');
  const pied = el.querySelector('.panneau__pied');
  let origine = null; let tl = null; let ouvert = false;

  const axe = () => (mqLarge.matches ? { xPercent: 101, yPercent: 0 } : { yPercent: 101, xPercent: 0 });

  function ouvrir(depuis) {
    if (ouvert) return;
    ouvert = true; ouverts.push(api);
    origine = depuis || document.activeElement;
    verrouiller(true);
    tl?.kill();
    corps.scrollTop = 0;
    const contenu = [...corps.children, ...(pied.hidden ? [] : [pied])];
    gsap.set(el, { ...axe(), x: 0, y: 0, visibility: 'visible' });
    tl = gsap.timeline()
      .to(voile, { autoAlpha: 1, duration: duree(0.3), ease: 'none' }, 0)
      .to(el, { xPercent: 0, yPercent: 0, duration: duree(0.55), ease: 'couture' }, 0)
      /* Le contenu arrive juste après le panneau : traîne (follow-through). */
      .from(contenu, { y: 18, opacity: 0, duration: duree(0.45), stagger: 0.04, ease: 'couture', clearProps: 'transform,opacity' }, 0.12);
    requestAnimationFrame(() => el.focus({ preventScroll: true }));
  }

  function fermer() {
    if (!ouvert) return Promise.resolve();
    ouvert = false; ouverts.splice(ouverts.indexOf(api), 1);
    tl?.kill();
    return new Promise((fin) => {
      tl = gsap.timeline({ onComplete: () => {
        gsap.set(el, { visibility: 'hidden' });
        if (!ouverts.length) verrouiller(false);
        if (origine && document.contains(origine)) origine.focus({ preventScroll: true });
        fin();
      } })
        .to(el, { ...axe(), duration: duree(0.32), ease: 'couture-sortie' }, 0)
        .to(voile, { autoAlpha: 0, duration: duree(0.3), ease: 'none' }, 0.05);
    });
  }

  el.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.stopPropagation(); fermer(); }
    piegerFocus(el, e);
  });
  el.addEventListener('click', (e) => { if (e.target.closest('[data-fermer]')) fermer(); });
  voile.addEventListener('click', fermer);

  const api = { el, corps, pied, ouvrir, fermer, estOuvert: () => ouvert };
  return api;
}

export const fermerTout = () => Promise.all(ouverts.slice().map((p) => p.fermer()));
