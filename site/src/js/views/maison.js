/* La maison (D.9) : uniquement les faits connus. Les photos de l'atelier et de la
   créatrice restent à fournir. */
import { marque } from '../data/marque.js';
import { img } from '../data/images.js';
import { lienFleche } from '../ui/button.js';
import { esc } from '../util/dom.js';
import { titresAuDefilement } from '../motion/reveal.js';

export default {
  cle: 'maison',
  titre: () => 'La maison',
  rendu: () => `<div class="conteneur">
    <header class="page-tete">
      <p class="surtitre t-surtitre">La maison</p>
      <h1 class="t-h1" data-titre>${esc(marque.slogan)}</h1>
    </header>
    <div class="edito">
      <div class="edito__media"><div class="media media--34" data-image><img src="${img.portraitNb}" alt="Portrait en noir et blanc publié par Lacouture" loading="lazy"></div></div>
      <div class="edito__texte prose">
        <p>Lacouture est une boutique de confection de vêtements sur mesure. Les pièces sont coupées et cousues dans son atelier de Cocody, à Abidjan, pour des tailles qui vont du XS au 2XL et au-delà.</p>
        <p>Chaque modèle se commande à la taille ou aux mesures de la cliente. Quand elle arrive avec une idée, une photo ou une occasion, l’atelier part de là : « le client nous contacte avec le modèle qu’il souhaite faire ».</p>
        <h2 data-titre>Le tissu, dit franchement.</h2>
        <p>Lacouture l’annonce sans détour : « ${esc(marque.substitution)} » Le site le rappelle avant chaque commande, pour que personne ne le découvre à la livraison.</p>
        <h2 data-titre>Iconic, ${esc(marque.collection.periode.toLowerCase())}.</h2>
        <p>La première collection de la maison s’appelle Iconic. Elle a été présentée sur Instagram en décembre 2025 et réunit des robes et des ensembles.</p>
        <p>${lienFleche('#/collection/iconic', 'Voir Iconic')}</p>
      </div>
    </div>
    <div class="edito edito--inverse section">
      <div class="edito__media"><div class="bande" style="grid-template-columns:1fr 1fr">
        <figure data-reveler><div class="media" data-image><img src="${img.veste}" alt="Veste imprimée à volants sur buste à l’atelier" loading="lazy"></div><figcaption>Sur buste, à l’atelier.</figcaption></figure>
        <figure data-reveler><div class="media" data-image><img src="${img.robeRouge}" alt="Robe rouge plissée sur buste à l’atelier" loading="lazy"></div><figcaption>Robe rouge plissée, sur buste.</figcaption></figure>
      </div></div>
      <div class="edito__texte prose">
        <h2 data-titre>Suivre l’atelier.</h2>
        <p>Les nouveautés, les réalisations et les coulisses passent d’abord par Instagram et WhatsApp.</p>
        <ul class="regles">${marque.reseaux.map((r) => `<li><a href="${r.lien}" target="_blank" rel="noopener">${r.nom} · ${esc(r.compte)}</a></li>`).join('')}
          <li><a href="${marque.whatsapp.lien}" target="_blank" rel="noopener">WhatsApp de l’atelier</a></li></ul>
        <p class="encart-demo">Les photos de l’atelier et de la créatrice seront ajoutées dès que Lacouture les fournira.</p>
      </div>
    </div>
  </div>`,
  monter: (racine) => titresAuDefilement(racine),
};
