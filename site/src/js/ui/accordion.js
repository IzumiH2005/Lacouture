/* Accordéons : bouton aria-expanded + région. L'ouverture change la mise en page sans
   l'animer (règle transform/opacity) ; seul le contenu glisse et apparaît. */
import { gsap, duree } from '../motion/core.js';
import { esc } from '../util/dom.js';

let n = 0;
export function accordeon(items) {
  return `<div class="accordeon">${items.map(({ titre, contenu }) => {
    const id = `acc-${++n}`;
    return `<div class="accordeon__item"><h3 class="accordeon__titre">
      <button type="button" class="accordeon__bouton" aria-expanded="false" aria-controls="${id}">${esc(titre)}<span class="accordeon__signe" aria-hidden="true"></span></button></h3>
      <div class="accordeon__panneau" id="${id}" role="region" aria-label="${esc(titre)}" hidden><div class="accordeon__contenu">${contenu}</div></div></div>`;
  }).join('')}</div>`;
}

export function basculer(bouton) {
  const panneau = document.getElementById(bouton.getAttribute('aria-controls'));
  const ouvrir = bouton.getAttribute('aria-expanded') !== 'true';
  bouton.setAttribute('aria-expanded', String(ouvrir));
  panneau.hidden = !ouvrir;
  if (ouvrir) {
    gsap.fromTo(panneau.firstElementChild.children, { y: -8, opacity: 0 }, { y: 0, opacity: 1, duration: duree(0.35), stagger: 0.03, ease: 'couture', clearProps: 'transform,opacity' });
  }
}
