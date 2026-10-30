/* Ouverture (une fois par session, page d'accueil seulement, passable).
   1. le monogramme se trace en Rose Fil ; 2. l'aplat Encre se pose ; 3. le mot monte ;
   4. le rideau Ivoire se lève et laisse place à la couverture. */
import { gsap, reduit } from './core.js';
import { fragment } from '../util/dom.js';
import { monogrammeTrace, motSvg } from '../ui/logo.js';

const CLE = 'lacouture.ouverture';
const dejaVue = () => { try { return sessionStorage.getItem(CLE) === '1'; } catch { return false; } };
const marquer = () => { try { sessionStorage.setItem(CLE, '1'); } catch { /* rien */ } };

export function ouverture() {
  return new Promise((fin) => {
    if (reduit() || dejaVue()) { fin(); return; }
    marquer();
    const el = fragment(`<div class="ouverture" aria-hidden="true">
      <div class="ouverture__centre">
        <div class="ouverture__mono">${monogrammeTrace()}</div>
        <div class="ouverture__mot">${motSvg('')}</div>
      </div>
      <button type="button" class="ouverture__passer" tabindex="-1">Passer</button>
    </div>`);
    document.body.append(el);
    const traits = el.querySelectorAll('.trait path');
    const plein = el.querySelector('.plein');
    const mot = el.querySelector('.ouverture__mot svg');
    let fini = false;
    const terminer = () => {
      if (fini) return; fini = true;
      tl.kill();
      gsap.timeline({ onComplete: () => { el.remove(); } })
        .to(el.querySelector('.ouverture__centre'), { y: -40, opacity: 0, duration: 0.45, ease: 'couture-sortie' }, 0)
        .to(el, { yPercent: -100, duration: 0.9, ease: 'couture' }, 0.15);
      setTimeout(fin, 350);
    };
    const tl = gsap.timeline({ onComplete: terminer })
      .from(el.querySelector('.ouverture__passer'), { opacity: 0, duration: 0.4 }, 0.2)
      .fromTo(traits, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.3, stagger: 0.04, ease: 'power2.inOut' }, 0.1)
      .to(plein, { opacity: 1, duration: 0.5, ease: 'couture' }, '-=0.3')
      .to(traits, { opacity: 0, duration: 0.4 }, '<0.15')
      .fromTo(mot, { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: 'couture' }, '<-0.1')
      .to({}, { duration: 0.35 });
    el.querySelector('.ouverture__passer').addEventListener('click', terminer);
    window.addEventListener('keydown', terminer, { once: true });
  });
}
