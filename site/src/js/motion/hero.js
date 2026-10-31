/* Couverture : la photo se pose en se resserrant, les lettres d'ICONIC montent l'une après
   l'autre, puis le texte. Au défilement, la photo glisse dans son cadre. */
import { gsap, ScrollTrigger, reduit, pointeurFin } from './core.js';

export function lettres(texte) {
  return [...texte].map((c) => `<span class="lettre" aria-hidden="true">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
}

export function couverture(racine, { delai = 0 } = {}) {
  const sec = racine.querySelector('.couverture');
  if (!sec || reduit()) return;
  const plein = !sec.classList.contains('couverture--page');
  const img = sec.querySelector('.couverture__media img');
  const ls = sec.querySelectorAll('.couverture__titre .lettre');
  const texte = sec.querySelectorAll('.couverture__meta, .couverture__texte > *, .couverture__defiler');
  gsap.timeline({ delay: delai, defaults: { ease: 'expo.out' } })
    .from(sec.querySelector('.couverture__media'), { opacity: 0, duration: 0.9, ease: 'none' }, 0)
    .from(img, { scale: plein ? 1.32 : 1.14, duration: 2.4 }, 0)
    .from(ls, { yPercent: 112, duration: 1.3, stagger: 0.065 }, 0.3)
    .from(texte, { y: 18, opacity: 0, duration: 1, stagger: 0.08 }, 0.75);

  /* Sur pointeur fin, la photo glisse dans son cadre (marge prévue en CSS). */
  if (pointeurFin() && img) {
    gsap.fromTo(img, { yPercent: 0 }, {
      yPercent: plein ? 14 : 5, ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom top', scrub: true },
    });
  }
  ScrollTrigger.refresh();
}
