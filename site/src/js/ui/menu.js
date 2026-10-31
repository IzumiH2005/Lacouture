/* Menu plein écran (mobile). Le panneau descend, son contenu monte en sens inverse
   puis les entrées arrivent une à une ; la fermeture est plus rapide que l'ouverture. */
import { gsap, duree } from '../motion/core.js';
import { fragment, $$ } from '../util/dom.js';
import { icone } from './icons.js';
import { motSvg } from './logo.js';
import { navigation } from './header.js';
import { piegerFocus, verrouiller } from './panel.js';
import { marque } from '../data/marque.js';

let el; let bouton; let tl; let ouvert = false;

export function monterMenu() {
  el = fragment(`<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="menu__haut">
      <button type="button" class="bouton-icone" data-fermer-menu aria-label="Fermer le menu">${icone('fermer')}</button>
      <a class="entete__marque" href="#/" aria-label="Lacouture, accueil">${motSvg('Lacouture')}</a>
      <span style="width:48px" aria-hidden="true"></span>
    </div>
    <div class="menu__contenu">
      <nav aria-label="Navigation principale"><ul class="menu__liste">
        ${navigation.map((n, i) => `<li class="menu__ligne"><a class="menu__lien" href="${n.href}" data-nav="${n.cle}"><span class="menu__index">0${i + 1}</span>${n.libelle}<span class="fil" aria-hidden="true"></span></a></li>`).join('')}
      </ul></nav>
      <div class="menu__secondaire">
        <a class="lien t-petit" href="#/realisations">Réalisations</a>
        <a class="lien t-petit" href="#/aide">Aide et guide des tailles</a>
        <a class="lien t-petit" href="${marque.whatsapp.lien}" target="_blank" rel="noopener">Écrire à l’atelier sur WhatsApp</a>
        <p class="t-petit t-doux">${marque.lieu}</p>
      </div>
    </div>
  </div>`);
  document.body.append(el);
  /* La position de départ est posée par GSAP : une translation CSS s'ajouterait à yPercent. */
  gsap.set(el, { yPercent: -100 });
  bouton = document.querySelector('[data-ouvrir-menu]');
  el.addEventListener('keydown', (e) => { if (e.key === 'Escape') fermerMenu(); piegerFocus(el, e); });
  el.addEventListener('click', (e) => {
    if (e.target.closest('[data-fermer-menu]')) fermerMenu();
    else if (e.target.closest('a[href^="#"]')) fermerMenu({ rendreFocus: false });
  });
  matchMedia('(min-width: 1024px)').addEventListener('change', (m) => { if (m.matches && ouvert) fermerMenu({ rendreFocus: false }); });
}

export function ouvrirMenu() {
  if (ouvert) return;
  ouvert = true;
  bouton?.setAttribute('aria-expanded', 'true');
  verrouiller(true);
  tl?.kill();
  const liens = $$('.menu__lien', el);
  const secondaire = el.querySelector('.menu__secondaire');
  tl = gsap.timeline()
    .set(el, { visibility: 'visible' })
    .fromTo(el, { yPercent: -100 }, { yPercent: 0, duration: duree(0.7), ease: 'couture' }, 0)
    .fromTo(el.querySelector('.menu__contenu'), { yPercent: 25 }, { yPercent: 0, duration: duree(0.9), ease: 'couture' }, 0)
    .fromTo(liens, { yPercent: 110 }, { yPercent: 0, duration: duree(0.8), stagger: 0.06, ease: 'couture' }, 0.18)
    .fromTo(secondaire, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: duree(0.5) }, 0.45);
  requestAnimationFrame(() => el.querySelector('[data-fermer-menu]').focus());
}

export function fermerMenu({ rendreFocus = true } = {}) {
  if (!ouvert) return;
  ouvert = false;
  bouton?.setAttribute('aria-expanded', 'false');
  tl?.kill();
  tl = gsap.timeline({ onComplete: () => { gsap.set(el, { visibility: 'hidden' }); verrouiller(false); if (rendreFocus) bouton?.focus(); } })
    .to(el.querySelector('.menu__contenu'), { yPercent: -10, opacity: 0, duration: duree(0.3), ease: 'couture-sortie' }, 0)
    .to(el, { yPercent: -100, duration: duree(0.45), ease: 'couture-sortie' }, 0.05)
    .set(el.querySelector('.menu__contenu'), { opacity: 1 });
}

export function marquerNavigation(cle) {
  $$('[data-nav]').forEach((a) => {
    if (a.dataset.nav === cle) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}
