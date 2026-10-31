/* Pied de page noir : deux colonnes de liens, puis le mot « Lacouture. » en très grand,
   dont les lettres montent quand le pied entre dans l'écran (voir main.js). */
import { marque } from '../data/marque.js';
import { lettres } from '../motion/hero.js';
import { esc } from '../util/dom.js';

export const pied = () => `<footer class="pied inverse" data-pied>
  <div class="conteneur">
    <div class="pied__colonnes">
      <div><p class="t-surtitre pied__titre">Maison</p><ul class="pied__liste">
        <li><a href="#/boutique">Boutique</a></li><li><a href="#/collection/iconic">Collection Iconic</a></li>
        <li><a href="#/sur-mesure">Votre modèle</a></li><li><a href="#/offrir">La Box</a></li>
        <li><a href="#/realisations">Réalisations</a></li><li><a href="#/maison">La Maison</a></li></ul></div>
      <div><p class="t-surtitre pied__titre">Aide</p><ul class="pied__liste">
        <li><a href="#/aide/tailles">Guide des tailles</a></li><li><a href="#/aide/delais">Délais</a></li>
        <li><a href="#/aide/livraison">Livraison</a></li><li><a href="#/aide/paiement">Paiement</a></li>
        <li><a href="#/aide/tissus">Tissus</a></li></ul></div>
      <div><p class="t-surtitre pied__titre">Contact</p><ul class="pied__liste">
        <li><a href="${marque.whatsapp.lien}" target="_blank" rel="noopener">WhatsApp</a></li>
        ${marque.reseaux.map((r) => `<li><a href="${r.lien}" target="_blank" rel="noopener">${r.nom}<span class="visuellement-cache"> (${esc(r.compte)})</span></a></li>`).join('')}
        <li class="pied__doux">${esc(marque.commune)}, ${esc(marque.ville)}</li></ul></div>
    </div>
    <p class="pied__signature" aria-label="Lacouture, Abidjan">
      <span class="pied__mot" aria-hidden="true">${lettres('Lacouture.')}</span>
      <span class="pied__lieu" aria-hidden="true">Abidjan</span>
    </p>
    <div class="pied__bas">
      <p>Paiement convenu avec l’atelier après confirmation de la commande.</p>
      <p>© ${new Date().getFullYear()} Lacouture · ${esc(marque.slogan)}</p>
    </div>
  </div>
</footer>`;
