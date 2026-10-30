/* Boutique (C.5, commerce aligné) : filtres par famille, le Fil glisse sous le filtre actif,
   la grille se réorganise avec Flip. */
import { familles, dansFamille } from '../data/catalogue.js';
import { carte } from '../ui/card.js';
import { roule } from '../ui/button.js';
import { gsap, Flip, reduit } from '../motion/core.js';
import { sur, $$ } from '../util/dom.js';

const filtres = [{ id: 'tout', libelle: 'Tout' }, ...familles];
const valide = (f) => (filtres.some((x) => x.id === f) ? f : 'tout');

const grille = (f) => {
  const liste = dansFamille(f);
  if (!liste.length) {
    return `<div class="catalogue__vide"><p class="t-h3">Aucune pièce dans cette famille pour le moment.</p>
      <p class="t-doux">L’atelier peut confectionner une pièce sur vos mesures à partir d’une photo ou d’une idée.</p>
      <a class="bouton" href="#/sur-mesure">${roule('Commander sur mesure')}</a></div>`;
  }
  return liste.map((m) => `<li data-flip-id="${m.id}">${carte(m)}</li>`).join('');
};

export default {
  cle: 'boutique',
  titre: (f) => (valide(f) === 'tout' ? 'Boutique' : `Boutique · ${filtres.find((x) => x.id === f).libelle}`),
  rendu: (f) => {
    const actif = valide(f);
    return `<div class="conteneur page-tete">
      <p class="surtitre t-surtitre">Boutique</p>
      <h1 class="t-h1">Toutes les pièces</h1>
      <p class="t-doux" data-compte aria-live="polite">${dansFamille(actif).length} pièces, confectionnées à la commande.</p>
    </div>
    <div class="filtres"><div class="filtres__piste" role="group" aria-label="Filtrer par famille">
      ${filtres.map((x) => `<button type="button" class="filtre" data-filtre="${x.id}" aria-pressed="${x.id === actif}">${x.libelle}<span class="filtre__nb">${dansFamille(x.id).length}</span></button>`).join('')}
      <span class="filtres__fil" aria-hidden="true"></span>
    </div></div>
    <div class="conteneur"><ul class="catalogue" data-catalogue>${grille(actif)}</ul></div>`;
  },
  monter(racine) {
    const piste = racine.querySelector('.filtres__piste');
    const fil = racine.querySelector('.filtres__fil');
    const cat = racine.querySelector('[data-catalogue]');

    /* Le Fil se place sous le filtre actif : translation + mise à l'échelle, jamais de largeur animée. */
    const placerFil = (instant) => {
      const b = piste.querySelector('[aria-pressed="true"]');
      if (!b) return;
      const l = b.offsetWidth;
      gsap.to(fil, { x: b.offsetLeft, scaleX: l, duration: instant || reduit() ? 0 : 0.5, ease: 'couture' });
    };
    placerFil(true);
    const ro = new ResizeObserver(() => placerFil(true));
    ro.observe(piste);

    const off = sur(piste, 'click', '[data-filtre]', (e, b) => {
      if (b.getAttribute('aria-pressed') === 'true') return;
      $$('[data-filtre]', piste).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      placerFil();
      const f = b.dataset.filtre;
      history.replaceState(null, '', f === 'tout' ? '#/boutique' : `#/boutique/${f}`);
      document.title = `${f === 'tout' ? 'Boutique' : `Boutique · ${b.firstChild.textContent}`} · Lacouture`;
      racine.querySelector('[data-compte]').textContent = `${dansFamille(f).length} pièces, confectionnées à la commande.`;

      const etat = Flip.getState(cat.children);
      cat.innerHTML = grille(f);
      if (reduit()) return;
      Flip.from(etat, {
        targets: cat.children, duration: 0.6, ease: 'couture', absolute: true, nested: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.1, stagger: 0.04, ease: 'couture' }),
        onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.2 }),
      });
    });
    return () => { off(); ro.disconnect(); };
  },
};
