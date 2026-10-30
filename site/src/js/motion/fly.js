/* La vignette de la pièce s'envole vers « Commande » en suivant un arc :
   x avance régulièrement, y monte puis retombe (deux courbes différentes). */
import { gsap, reduit } from './core.js';

export function envoler(source, cible) {
  return new Promise((fin) => {
    if (reduit() || !source || !cible) { fin(); return; }
    const a = source.getBoundingClientRect();
    const b = cible.getBoundingClientRect();
    if (!a.width || !b.width) { fin(); return; }
    const l = Math.min(a.width, 160);
    const h = l * (a.height / a.width);
    const clone = document.createElement('img');
    clone.src = source.currentSrc || source.src; clone.alt = '';
    Object.assign(clone.style, { position: 'fixed', left: '0', top: '0', width: `${l}px`, height: `${h}px`, objectFit: 'cover', zIndex: 90, pointerEvents: 'none' });
    document.body.append(clone);
    const x0 = a.left + a.width / 2 - l / 2; const y0 = a.top + a.height / 2 - h / 2;
    const x1 = b.left + b.width / 2 - l / 2; const y1 = b.top + b.height / 2 - h / 2;
    gsap.set(clone, { x: x0, y: y0, transformOrigin: '50% 50%' });
    gsap.timeline({ onComplete: () => { clone.remove(); fin(); } })
      .to(clone, { scale: 0.92, duration: 0.12, ease: 'power2.out' })
      .to(clone, { x: x1, duration: 0.75, ease: 'power1.inOut' }, '>')
      .to(clone, { y: Math.min(y0, y1) - 80, duration: 0.3, ease: 'power2.out' }, '<')
      .to(clone, { y: y1, duration: 0.45, ease: 'power2.in' }, '>')
      .to(clone, { scale: 0.12, duration: 0.75, ease: 'power2.in' }, '<-0.3')
      .to(clone, { opacity: 0, duration: 0.15 }, '>-0.12');
  });
}
