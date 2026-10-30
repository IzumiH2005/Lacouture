export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

/* Écoute déléguée, retirée par la fonction renvoyée. */
export function sur(racine, type, selecteur, fn, opts) {
  const h = (e) => {
    const cible = e.target.closest(selecteur);
    if (cible && racine.contains(cible)) fn(e, cible);
  };
  racine.addEventListener(type, h, opts);
  return () => racine.removeEventListener(type, h, opts);
}

export function fragment(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

export const prochainImage = () => new Promise((r) => requestAnimationFrame(() => r()));
