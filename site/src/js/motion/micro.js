/* Micro-interactions (principes de l'animation : anticipation, compression, rebond léger). */
import { gsap, reduit } from './core.js';

/* Une case pressée se tasse un instant puis reprend sa place. */
export function presser(el) {
  if (reduit()) return;
  gsap.timeline()
    .to(el, { scale: 0.94, duration: 0.09, ease: 'power2.out' })
    .to(el, { scale: 1, duration: 0.5, ease: 'back.out(3)', clearProps: 'transform' });
}

/* Le fond de la taille choisie monte depuis le bas ; l'ancienne se vide vers le bas. */
export function choisirTaille(nouvelle, ancienne) {
  const fond = (b) => b?.querySelector('.taille__fond');
  if (reduit()) return;
  if (ancienne) gsap.fromTo(fond(ancienne), { scaleY: 1, transformOrigin: 'top center' }, { scaleY: 0, duration: 0.25, ease: 'couture', clearProps: 'all' });
  if (nouvelle) gsap.fromTo(fond(nouvelle), { scaleY: 0, transformOrigin: 'bottom center' }, { scaleY: 1, duration: 0.35, ease: 'couture', clearProps: 'all' });
}

/* Refus : le bloc fautif dit « non » de la tête, sans brutalité. */
export function refuser(el) {
  if (reduit() || !el) return;
  gsap.fromTo(el, { x: 0 }, { keyframes: { x: [0, -7, 6, -4, 2, 0] }, duration: 0.45, ease: 'none', clearProps: 'transform' });
}

/* Le compteur de commande saute légèrement quand une pièce arrive. */
export function rebondir(el) {
  if (reduit() || !el) return;
  gsap.timeline()
    .to(el, { y: 2, scaleX: 1.15, scaleY: 0.85, duration: 0.08, ease: 'power1.out' })
    .to(el, { y: -6, scaleX: 0.92, scaleY: 1.1, duration: 0.16, ease: 'power2.out' })
    .to(el, { y: 0, scaleX: 1, scaleY: 1, duration: 0.45, ease: 'back.out(2.5)', clearProps: 'transform' });
}
