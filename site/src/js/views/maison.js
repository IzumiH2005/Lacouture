/* La maison (D.9) : la story « About us » et la bio, citées sans ajout. Les photos de
   l'atelier et de la créatrice restent à fournir. */
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
        <p>${esc(marque.aPropos.reponse)} ${esc(marque.lieu)}.</p>
        ${marque.aPropos.points.map((p) => `<h2 data-titre>${esc(p.titre)}</h2><p>${esc(p.texte)}</p>`).join('')}
        <blockquote class="citation"><p>« ${esc(marque.substitution)} »</p><footer class="t-petit t-doux">Lacouture, sur Instagram</footer></blockquote>
        <h2 data-titre>Iconic</h2>
        <p>${esc(marque.collection.annonce)}.</p>
        <p>${lienFleche('#/collection/iconic', 'Voir Iconic')}</p>
      </div>
    </div>
    <div class="edito edito--inverse section">
      <div class="edito__media"><div class="bande" style="grid-template-columns:1fr 1fr">
        <figure data-reveler><div class="media" data-image><img src="${img.veste}" alt="Veste imprimée à volants sur buste à l’atelier" loading="lazy"></div><figcaption>Sur buste, à l’atelier.</figcaption></figure>
        <figure data-reveler><div class="media" data-image><img src="${img.robeRouge}" alt="Robe rouge plissée sur buste à l’atelier" loading="lazy"></div><figcaption>Robe rouge plissée, sur buste.</figcaption></figure>
      </div></div>
      <div class="edito__texte prose">
        <h2 data-titre>Suivre l’atelier</h2>
        <ul class="regles">${marque.reseaux.map((r) => `<li><a href="${r.lien}" target="_blank" rel="noopener">${r.nom} · ${esc(r.compte)}</a></li>`).join('')}
          <li><a href="${marque.whatsapp.lien}" target="_blank" rel="noopener">WhatsApp de l’atelier</a></li></ul>
        <p class="encart-demo">Photos de l’atelier et de la créatrice : à fournir.</p>
      </div>
    </div>
  </div>`,
  monter: (racine) => titresAuDefilement(racine),
};
