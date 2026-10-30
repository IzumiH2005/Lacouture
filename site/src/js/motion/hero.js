/* Couverture : les lettres du titre montent l'une après l'autre (traîne), la photo se pose,
   le Fil se dessine. Au défilement, la photo glisse de quelques pour cent seulement. */
import { gsap, ScrollTrigger, reduit, pointeurFin } from './core.js';

export function lettres(texte) {
  return [...texte].map((c) => `<span class="lettre" aria-hidden="true">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
}

export function couverture(racine, { delai = 0 } = {}) {
  const sec = racine.querySelector('.couverture');
  if (!sec || reduit()) return;
  const img = sec.querySelector('.couverture__media img');
  const ls = sec.querySelectorAll('.couverture__titre .lettre');
  const texte = sec.querySelectorAll('.couverture__texte > *');
  gsap.timeline({ delay: delai })
    .from(sec.querySelector('.couverture__media'), { opacity: 0, duration: 0.8, ease: 'none' }, 0)
    .from(img, { scale: 1.14, duration: 2, ease: 'couture' }, 0)
    .from(ls, { yPercent: 105, opacity: 0, duration: 1.1, stagger: 0.055, ease: 'couture' }, 0.25)
    .from(texte, { y: 18, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'couture' }, 0.6);

  /* Glissement léger de la photo dans son cadre (6 % de marge prévus en CSS). */
  if (pointeurFin() && img) {
    gsap.fromTo(img, { yPercent: 0 }, {
      yPercent: 5, ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom top', scrub: 0.6 },
    });
  }
  ScrollTrigger.refresh();
}
