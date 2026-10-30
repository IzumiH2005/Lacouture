import { marque } from '../data/marque.js';
import { monogrammeSvg } from './logo.js';
import { esc } from '../util/dom.js';

export const pied = () => `<footer class="pied inverse" data-pied>
  <div class="conteneur">
    <div class="pied__haut">
      <div class="pied__identite">
        <div class="pied__marque">${monogrammeSvg('Monogramme Lacouture')}</div>
        <p class="pied__slogan">${esc(marque.slogan)}</p>
      </div>
      <div class="pied__colonnes">
        <div><p class="t-surtitre pied__titre">La maison</p><ul class="pied__liste">
          <li><a href="#/boutique">Boutique</a></li><li><a href="#/collection/iconic">Collection Iconic</a></li>
          <li><a href="#/offrir">Offrir une box</a></li><li><a href="#/sur-mesure">Sur mesure</a></li>
          <li><a href="#/realisations">Réalisations</a></li><li><a href="#/maison">La Maison</a></li></ul></div>
        <div><p class="t-surtitre pied__titre">Aide</p><ul class="pied__liste">
          <li><a href="#/aide/tailles">Guide des tailles</a></li><li><a href="#/aide/delais">Délais</a></li>
          <li><a href="#/aide/livraison">Livraison</a></li><li><a href="#/aide/paiement">Paiement</a></li>
          <li><a href="#/aide/tissus">Tissus</a></li><li><a href="#/aide/contact">Contact</a></li></ul></div>
        <div><p class="t-surtitre pied__titre">Nous suivre</p><ul class="pied__liste">
          <li><a href="${marque.whatsapp.lien}" target="_blank" rel="noopener">WhatsApp</a></li>
          ${marque.reseaux.map((r) => `<li><a href="${r.lien}" target="_blank" rel="noopener">${r.nom}<span class="visuellement-cache"> (${esc(r.compte)})</span></a></li>`).join('')}
        </ul></div>
      </div>
    </div>
    <div class="pied__bas"><p>${esc(marque.lieu)}</p><p>Paiement convenu avec l’atelier après confirmation de la commande.</p><p>© Lacouture</p></div>
  </div>
</footer>`;
