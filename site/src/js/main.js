/* Point d'entrée : coquille commune, vues, routeur. */
import './motion/core.js';
import { entete } from './ui/header.js';
import { pied } from './ui/footer.js';
import { monterMenu, ouvrirMenu } from './ui/menu.js';
import { monterPanier, ouvrirPanier } from './ui/cart-panel.js';
import { monterToast } from './ui/toast.js';
import { monterProgression } from './motion/page.js';
import { panier } from './store.js';
import { $ } from './util/dom.js';
import { icone } from './ui/icons.js';
import { DEMO } from './data/demo.js';
import { route, demarrer } from './router.js';
import { rebondir } from './motion/micro.js';

import accueil from './views/accueil.js';
import boutique from './views/boutique.js';
import collection from './views/collection.js';
import produit from './views/produit.js';
import offrir from './views/offrir.js';
import surMesure from './views/sur-mesure.js';
import realisations from './views/realisations.js';
import maison from './views/maison.js';
import aide from './views/aide.js';
import commandeVue from './views/commande.js';
import confirmation from './views/confirmation.js';
import introuvable from './views/introuvable.js';

route(/^$/, accueil);
route(/^boutique(?:\/([a-z-]+))?$/, boutique);
route(/^collection\/([a-z-]+)$/, collection);
route(/^modele\/([a-z0-9-]+)$/, produit);
route(/^offrir$/, offrir);
route(/^sur-mesure$/, surMesure);
route(/^realisations$/, realisations);
route(/^maison$/, maison);
route(/^aide(?:\/([a-z-]+))?$/, aide);
route(/^commande$/, commandeVue);
route(/^confirmation$/, confirmation);
route(/^introuvable$/, introuvable);

const CLE_DEMO = 'lacouture.demo-ferme';
function bandeauDemo() {
  let ferme = false;
  try { ferme = sessionStorage.getItem(CLE_DEMO) === '1'; } catch { /* rien */ }
  if (!DEMO || ferme) return '';
  return `<div class="demo" role="note">
    <p><strong>Version de démonstration.</strong> Prix, délais, tailles et frais de livraison sont provisoires. Aucun paiement en ligne.</p>
    <button type="button" class="demo__fermer" data-fermer-demo aria-label="Masquer ce bandeau">${icone('fermer')}</button></div>`;
}

function coquille() {
  const app = document.getElementById('app');
  app.innerHTML = `${bandeauDemo()}${entete()}<main id="contenu" class="vue" tabindex="-1"></main>${pied()}`;
  monterToast(); monterMenu(); monterPanier(); monterProgression();

  app.addEventListener('click', (e) => {
    if (e.target.closest('[data-ouvrir-menu]')) ouvrirMenu();
    else if (e.target.closest('[data-ouvrir-panier]')) ouvrirPanier(e.target.closest('[data-ouvrir-panier]'));
    else if (e.target.closest('[data-fermer-demo]')) {
      $('.demo')?.remove();
      try { sessionStorage.setItem(CLE_DEMO, '1'); } catch { /* rien */ }
    }
  });

  /* Compteur de la commande. */
  const maj = (raison) => {
    const n = panier.nombre();
    const el = $('[data-nombre]');
    el.textContent = n; el.dataset.vide = String(n === 0);
    $('[data-nombre-lu]').textContent = n ? `Votre commande, ${n} pièce${n > 1 ? 's' : ''}` : 'Votre commande, vide';
    if (raison === 'ajout') rebondir(el);
  };
  maj(); panier.ecouter(maj);

  /* L'en-tête se retire quand on descend, revient dès qu'on remonte. */
  const html = document.documentElement; const ent = $('[data-entete]');
  let dernier = 0; let attente = false;
  window.addEventListener('scroll', () => {
    if (attente) return; attente = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      ent.classList.toggle('a-defile', y > 8);
      if (!document.body.classList.contains('verrou') && Math.abs(y - dernier) > 6) {
        html.classList.toggle('entete-cache', y > dernier && y > 240);
        dernier = y;
      }
      attente = false;
    });
  }, { passive: true });
  ent.addEventListener('focusin', () => html.classList.remove('entete-cache'));
}

function lancer() {
  coquille();
  /* Lien d'évitement : déplace le focus sans toucher à la route. */
  $('.evitement').addEventListener('click', (e) => { e.preventDefault(); $('#contenu').focus(); });
  demarrer();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', lancer);
else lancer();
