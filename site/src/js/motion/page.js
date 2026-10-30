/* Transitions entre pages : la page sortante s'efface vite, la ligne de progression
   (le Fil) court en haut de l'écran, la page entrante monte doucement. */
import { gsap, duree, reduit } from './core.js';
import { fragment } from '../util/dom.js';

let barre;
export function monterProgression() {
  barre = fragment('<div class="progression" aria-hidden="true"></div>');
  document.body.append(barre);
  gsap.set(barre, { scaleX: 0, autoAlpha: 0 });
}

export function sortie(main) {
  if (reduit()) return Promise.resolve();
  gsap.killTweensOf(barre);
  gsap.fromTo(barre, { scaleX: 0, autoAlpha: 1 }, { scaleX: 0.6, duration: 0.35, ease: 'couture' });
  return gsap.to(main, { opacity: 0, y: -10, duration: 0.22, ease: 'couture-sortie' }).then();
}

export function entree(main) {
  gsap.to(barre, { scaleX: 1, duration: duree(0.3), ease: 'couture', onComplete: () => gsap.to(barre, { autoAlpha: 0, duration: duree(0.3) }) });
  if (reduit()) { gsap.set(main, { clearProps: 'opacity,transform' }); return; }
  gsap.fromTo(main, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'couture', clearProps: 'transform,opacity' });
}
