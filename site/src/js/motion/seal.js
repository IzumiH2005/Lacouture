/* Le sceau : le monogramme se trace d'un fil continu, puis l'aplat se pose. */
import { gsap, reduit } from './core.js';

export function sceller(svg, { delai = 0 } = {}) {
  const traits = svg.querySelectorAll('.trait path');
  const plein = svg.querySelector('.plein');
  if (reduit()) { gsap.set(traits, { opacity: 0 }); gsap.set(plein, { opacity: 1 }); return gsap.timeline(); }
  return gsap.timeline({ delay: delai })
    .set(plein, { opacity: 0 })
    .fromTo(traits, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.1, stagger: 0.035, ease: 'power2.inOut' })
    .to(plein, { opacity: 1, duration: 0.6, ease: 'couture' }, '-=0.25')
    .to(traits, { opacity: 0, duration: 0.4 }, '<0.2');
}
