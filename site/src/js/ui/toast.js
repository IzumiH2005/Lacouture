import { gsap, duree } from '../motion/core.js';
import { fragment } from '../util/dom.js';

let el; let minuterie; let tl;
export function monterToast() {
  el = fragment('<div class="toast" role="status" aria-live="polite"></div>');
  document.body.append(el);
  gsap.set(el, { xPercent: -50, x: 0, y: 24 });
}
export function annoncer(message, ms = 3200) {
  if (!el) return;
  clearTimeout(minuterie);
  tl?.kill();
  el.textContent = message;
  tl = gsap.timeline()
    .to(el, { autoAlpha: 1, y: 0, duration: duree(0.4), ease: 'couture' });
  minuterie = setTimeout(() => {
    tl = gsap.to(el, { autoAlpha: 0, y: 16, duration: duree(0.25), ease: 'couture-sortie' });
  }, ms);
}
