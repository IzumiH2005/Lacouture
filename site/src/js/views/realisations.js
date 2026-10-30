/* Réalisations (D.9) : preuves, sans bouton d'achat. Les légendes décrivent ce que
   montrent les photos ; aucun prénom ni occasion n'est inventé. */
import { img } from '../data/images.js';
import { lienFleche } from '../ui/button.js';
import { esc } from '../util/dom.js';
import { titresAuDefilement } from '../motion/reveal.js';

const pieces = [
  { src: img.robeRouge, alt: 'Robe rouge plissée sur buste à l’atelier', legende: 'Robe rouge plissée, sur buste à l’atelier de Cocody.' },
  { src: img.leopard, alt: 'Ensemble léopard porté devant un miroir', legende: 'Ensemble imprimé léopard, haut noué et jupe longue.' },
  { src: img.portraitNb, alt: 'Portrait en noir et blanc d’une femme en robe Lacouture', legende: 'Portrait en noir et blanc, publié par la maison.' },
  { src: img.veste, alt: 'Veste imprimée à volants sur buste noir', legende: 'Veste imprimée à volants, lien noué à l’encolure.' },
  { src: img.boubouBlanc, alt: 'Boubou à médaillons ivoire porté', legende: 'Boubou à médaillons, version ivoire.' },
  { src: img.jauneProfil, alt: 'Robe licou jaune pâle de profil', legende: 'Robe licou à volants, vue de profil.' },
  { src: img.kaftanRouille, alt: 'Boubou à médaillons rouille porté', legende: 'Boubou à médaillons, version rouille.' },
  { src: img.couverture, alt: 'Couverture de la collection Iconic en noir et blanc', legende: 'Couverture de la collection Iconic, décembre 2025.' },
  { src: img.kaftanSauge, alt: 'Kaftan vert sauge porté', legende: 'Kaftan sauge à bande verticale.' },
];

export default {
  cle: null,
  titre: () => 'Réalisations',
  rendu: () => `<div class="conteneur">
    <header class="page-tete">
      <p class="surtitre t-surtitre">Réalisations</p>
      <h1 class="t-h1" data-titre>Ce qui est sorti de l’atelier.</h1>
      <p class="mesure t-doux">Ces pièces ne sont pas toutes encore en boutique. Si l’une d’elles vous plaît, l’atelier peut réaliser un modèle proche à vos mesures.</p>
      <p>${lienFleche('#/sur-mesure', 'Faire réaliser un modèle similaire')}</p>
    </header>
    <div class="galerie-real" style="padding-bottom:var(--s-section)">
      ${pieces.map((p) => `<figure data-reveler><div class="media" data-image><img src="${p.src}" alt="${esc(p.alt)}" loading="lazy"></div><figcaption>${esc(p.legende)}</figcaption></figure>`).join('')}
    </div>
    <p class="encart-demo" style="margin-bottom:var(--s-section)">Les photos de clientes réelles, avec leur prénom et l’occasion, seront ajoutées avec leur accord. Celles-ci proviennent des publications de Lacouture.</p>
  </div>`,
  monter: (racine) => titresAuDefilement(racine),
};
