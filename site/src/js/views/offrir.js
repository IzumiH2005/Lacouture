/* Offrir (D.9) : le Noir de la Box. Seul ce qui est connu est affiché ; le contenu
   de la box reste à confirmer par la maison (dossier, section 9). */
import { parId } from '../data/catalogue.js';
import { img } from '../data/images.js';
import { marque } from '../data/marque.js';
import { demoDelaiBox } from '../data/demo.js';
import { blocPrix } from '../ui/card.js';
import { roule } from '../ui/button.js';
import { esc } from '../util/dom.js';
import { titresAuDefilement } from '../motion/reveal.js';
import { gsap, reduit, pointeurFin } from '../motion/core.js';

export default {
  cle: 'offrir',
  titre: () => 'Offrir une box',
  rendu: () => {
    const box = parId('box-cadeau');
    const [phrase1, phrase2] = marque.box.accroche.split('. ');
    return `<section class="noir inverse" aria-labelledby="titre-offrir" style="padding-top:var(--s-7)">
      <div class="conteneur noir__grille">
        <div class="noir__media"><div class="media media--34" data-image data-box-media><img src="${img.boxOuverture}" alt="${esc(box.images[0].alt)}" fetchpriority="high"></div></div>
        <div class="noir__texte">
          <p class="surtitre t-surtitre">Offrir</p>
          <h1 class="noir__titre" id="titre-offrir" data-titre>${esc(phrase1)}.</h1>
          <p style="color:#D9CDBF">${esc(phrase2)}</p>
          ${blocPrix(box)}
          <p class="t-petit" style="color:#B8AA9B">${demoDelaiBox}, à confirmer par l’atelier.</p>
          <a class="bouton bouton--principal bouton--inverse" href="#/modele/box-cadeau">${roule('Voir la box')}</a>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="titre-offrir-comment">
      <div class="conteneur edito edito--inverse">
        <div class="edito__media"><div class="media media--34" data-image><img src="${img.boxMains}" alt="${esc(box.images[2].alt)}" loading="lazy"></div></div>
        <div class="edito__texte prose">
          <p class="surtitre t-surtitre">Comment offrir</p>
          <h2 class="t-h1" id="titre-offrir-comment" data-titre>Une pièce, <em>un message.</em></h2>
          <p>À la commande, cochez « C’est un cadeau » et écrivez le message à glisser dans le colis.</p>
          <p class="encart-demo">Le contenu exact de la box et la possibilité de l’ajouter à une tenue restent à confirmer par Lacouture.</p>
        </div>
      </div>
    </section>

    <section class="section fond-doux" aria-labelledby="titre-offrir-voir">
      <div class="conteneur">
        <div class="tete"><p class="surtitre t-surtitre">Le coffret</p><h2 class="t-h1" id="titre-offrir-voir" data-titre>La box <em>noire.</em></h2></div>
        <div class="bande" style="grid-template-columns:repeat(2,1fr)">
          <figure data-reveler><div class="media" data-image><img src="${img.boxTable}" alt="${esc(box.images[1].alt)}" loading="lazy"></div><figcaption>Avant l’ouverture.</figcaption></figure>
          <figure data-reveler><div class="media" data-image><img src="${img.boxOuverture}" alt="${esc(box.images[0].alt)}" loading="lazy"></div><figcaption>Lacouture Abidjan, en rose sur le couvercle.</figcaption></figure>
        </div>
      </div>
    </section>`;
  },
  monter(racine) {
    const fin = titresAuDefilement(racine);
    /* Sur grand écran, la photo de la box glisse très légèrement au défilement. */
    const media = racine.querySelector('[data-box-media] img');
    if (media && pointeurFin() && !reduit()) {
      gsap.fromTo(media, { yPercent: -3 }, { yPercent: 3, ease: 'none', scrollTrigger: { trigger: '[data-box-media]', start: 'top bottom', end: 'bottom top', scrub: true } });
    }
    return fin;
  },
};
