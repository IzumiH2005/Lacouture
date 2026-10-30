/* Apparitions au défilement. L'état caché n'est posé qu'en JavaScript : sans script
   ou en mouvement réduit, tout reste visible. */
import { gsap, ScrollTrigger, SplitText, reduit } from './core.js';
import { $$ } from '../util/dom.js';

export function reveler(racine) {
  if (reduit()) return;
  const blocs = $$('[data-reveler]', racine);
  const images = $$('[data-image]', racine);

  images.forEach((m) => {
    if (m.querySelector(':scope > .media__voile')) return;
    const v = document.createElement('span');
    v.className = 'media__voile'; v.setAttribute('aria-hidden', 'true');
    m.append(v);
  });

  gsap.set(blocs, { opacity: 0, y: 28 });
  ScrollTrigger.batch(blocs, {
    start: 'top 92%', once: true,
    onEnter: (lot) => gsap.to(lot, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'couture', overwrite: true }),
  });

  /* Le voile Ivoire se retire vers le haut pendant que la photo se pose (scale 1,08 → 1). */
  images.forEach((m) => {
    const voile = m.querySelector(':scope > .media__voile');
    const img = m.querySelector('img:not(.carte__dos)');
    gsap.set(voile, { scaleY: 1 });
    if (img) gsap.set(img, { scale: 1.08 });
    ScrollTrigger.create({
      trigger: m, start: 'top 90%', once: true,
      onEnter: () => {
        gsap.to(voile, { scaleY: 0, duration: 1, ease: 'couture', delay: 0.05 });
        if (img) gsap.to(img, { scale: 1, duration: 1.4, ease: 'couture', clearProps: 'transform' });
      },
    });
  });
}

/* Titre en lignes masquées (SplitText). Renvoie la fonction de nettoyage. */
export function titreEnLignes(el, { delai = 0 } = {}) {
  if (!el || reduit()) return () => {};
  const s = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'ligne-titre' });
  gsap.from(s.lines, { yPercent: 105, duration: 1, stagger: 0.09, ease: 'couture', delay: delai });
  return () => s.revert();
}

/* Titres de page : le h1 se dévoile tout de suite, les autres [data-titre] à leur arrivée. */
export function titresAuDefilement(racine) {
  const nettoyages = [];
  if (reduit()) return () => {};
  const h1 = racine.querySelector('h1[data-titre]');
  if (h1) nettoyages.push(titreEnLignes(h1, { delai: 0.1 }));
  $$('[data-titre]:not(h1)', racine).forEach((t) => {
    ScrollTrigger.create({ trigger: t, start: 'top 88%', once: true, onEnter: () => nettoyages.push(titreEnLignes(t)) });
  });
  return () => nettoyages.forEach((f) => f());
}
