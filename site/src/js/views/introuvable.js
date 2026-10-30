import { roule } from '../ui/button.js';

export default {
  cle: null,
  titre: () => 'Page introuvable',
  rendu: () => `<div class="conteneur introuvable">
    <p class="surtitre t-surtitre">Erreur 404</p>
    <h1 class="t-h1">Cette page n’existe pas, ou plus.</h1>
    <p class="t-doux mesure">Le lien est peut-être ancien. Les pièces disponibles sont toutes dans la boutique.</p>
    <a class="bouton bouton--principal" href="#/boutique">${roule('Voir la boutique')}</a>
    <a class="lien t-petit" href="#/">Revenir à l’accueil</a>
  </div>`,
};
