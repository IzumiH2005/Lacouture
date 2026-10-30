/* Page de collection : la couverture en grand, puis les pièces. Seuls les faits connus sont affichés. */
import { collections, dansFamille } from '../data/catalogue.js';
import { carte } from '../ui/card.js';
import { lettres, couverture } from '../motion/hero.js';
import { demoPromo } from '../data/demo.js';
import { esc } from '../util/dom.js';
import introuvable from './introuvable.js';

export default {
  cle: 'collection',
  titre: (id) => (collections[id] ? `Collection ${collections[id].nom}` : introuvable.titre()),
  rendu: (id) => {
    const c = collections[id];
    if (!c) return introuvable.rendu();
    const liste = dansFamille(id);
    return `<section class="couverture couverture--page" aria-labelledby="titre-coll">
      <div class="couverture__media"><img src="${c.image}" alt="${esc(c.alt)}"></div>
      <h1 class="couverture__titre t-couverture" id="titre-coll"><span class="visuellement-cache">Collection ${c.nom}</span>${lettres(c.nom.toUpperCase())}</h1>
      <div class="couverture__texte">
        <p class="surtitre t-surtitre">Collection · ${c.periode}</p>
        <p class="couverture__faits">${liste.length} pièces confectionnées à l’atelier de Cocody, en taille standard ou sur vos mesures.</p>
        ${demoPromo.active ? `<p class="couverture__offre t-petit">${demoPromo.libelle} sur toute la collection, offre de lancement ${demoPromo.jusqua}.</p>` : ''}
      </div>
    </section>
    <div class="conteneur"><ul class="catalogue">${liste.map((m) => `<li>${carte(m, { niveau: 2 })}</li>`).join('')}</ul></div>`;
  },
  monter(racine) { couverture(racine); },
};
