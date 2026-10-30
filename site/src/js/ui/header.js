import { motSvg } from './logo.js';
import { icone } from './icons.js';

export const navigation = [
  { href: '#/boutique', libelle: 'Boutique', cle: 'boutique' },
  { href: '#/collection/iconic', libelle: 'Collections', cle: 'collection' },
  { href: '#/offrir', libelle: 'Offrir', cle: 'offrir' },
  { href: '#/sur-mesure', libelle: 'Sur mesure', cle: 'sur-mesure' },
  { href: '#/maison', libelle: 'La Maison', cle: 'maison' },
];

export const entete = () => `<header class="entete" data-entete>
  <div class="entete__barre">
    <div class="entete__gauche">
      <button type="button" class="bouton-icone entete__menu" aria-expanded="false" aria-controls="menu" data-ouvrir-menu>${icone('menu')}<span class="visuellement-cache">Menu</span></button>
      <nav class="entete__nav" aria-label="Navigation principale">
        ${navigation.map((n) => `<a href="${n.href}" data-nav="${n.cle}">${n.libelle}<span class="fil" aria-hidden="true"></span></a>`).join('')}
      </nav>
    </div>
    <a class="entete__marque" href="#/" aria-label="Lacouture, accueil">${motSvg('Lacouture')}</a>
    <div class="entete__droite">
      <a class="entete__lien entete__secondaire" href="#/aide" data-nav="aide">Aide<span class="fil" aria-hidden="true"></span></a>
      <button type="button" class="bouton-icone sac" data-ouvrir-panier aria-haspopup="dialog" aria-controls="panneau-commande">
        ${icone('sac')}<span class="sac__libelle">Commande</span>
        <span class="sac__nombre" data-nombre data-vide="true" aria-hidden="true">0</span>
        <span class="visuellement-cache" data-nombre-lu>Votre commande, vide</span>
      </button>
    </div>
  </div>
</header>`;
