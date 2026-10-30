/* Panneau « Votre commande » (D.6) : pas de page panier, un panneau suffit. */
import { creerPanneau } from './panel.js';
import { panier } from '../store.js';
import { esc, sur } from '../util/dom.js';
import { prix } from '../util/format.js';
import { icone } from './icons.js';
import { imageDe } from '../data/catalogue.js';
import { roule } from './button.js';
import { annoncer } from './toast.js';

let p;

export function detailLigne(l) {
  if (l.mesures) {
    const m = l.mesures;
    if (m.rappel) return 'Sur mes mesures · l’atelier vous appelle';
    const parts = [m.poitrine && `poitrine ${m.poitrine}`, m.taille && `taille ${m.taille}`, m.hanches && `hanches ${m.hanches}`, m.hauteur && `hauteur ${m.hauteur}`].filter(Boolean);
    return `Sur mes mesures · ${parts.join(', ')} cm`;
  }
  if (l.hauteur) return `Taille unique · hauteur ${l.hauteur} cm`;
  return l.taille ? `Taille ${l.taille}` : '';
}

function rendu() {
  const lignes = panier.lignes();
  if (!lignes.length) {
    p.corps.innerHTML = `<div class="catalogue__vide" style="padding-top:var(--s-6)">
      <p class="t-h3">Votre sélection est vide.</p>
      <p class="t-doux">Choisissez un modèle et sa taille : il apparaîtra ici.</p>
      <a class="bouton bouton--secondaire" href="#/boutique" data-fermer>${roule('Voir la boutique')}</a></div>`;
    p.pied.hidden = true;
    return;
  }
  p.corps.innerHTML = `<ul aria-label="Pièces choisies">${lignes.map((l) => {
    const m = l.modele; const v = m.versions.find((x) => x.id === l.version);
    return `<li class="ligne" data-cle="${esc(l.cle)}">
      <a class="ligne__media" href="#/modele/${m.id}" data-fermer tabindex="-1"><img src="${imageDe(m, l.version).src}" alt=""></a>
      <div class="ligne__info">
        <a class="ligne__nom" href="#/modele/${m.id}" data-fermer style="text-decoration:none">${esc(m.nom)}</a>
        <p class="t-petit t-doux">${v?.libelle ? `${esc(v.libelle)} · ` : ''}${esc(detailLigne(l))}</p>
        <p class="t-petit t-doux">Réf. ${m.ref}</p>
        <div class="ligne__actions">
          <div class="quantite" role="group" aria-label="Quantité de ${esc(m.nom)}">
            <button type="button" data-moins aria-label="Retirer une pièce" ${l.quantite <= 1 ? 'disabled' : ''}>${icone('moins')}</button>
            <output aria-live="polite">${l.quantite}</output>
            <button type="button" data-plus aria-label="Ajouter une pièce" ${l.quantite >= 9 ? 'disabled' : ''}>${icone('plus')}</button>
          </div>
          <span class="prix">${prix(m.prixFinal * l.quantite)}</span>
        </div>
        <button type="button" class="lien t-petit" data-retirer style="justify-self:start;min-height:40px">Retirer</button>
      </div></li>`;
  }).join('')}</ul>`;
  p.pied.hidden = false;
  p.pied.innerHTML = `<div class="total total--fort"><span>Sous-total</span><span class="prix">${prix(panier.sousTotal())}</span></div>
    <p class="t-petit t-doux">Livraison calculée à l’étape suivante. Aucun paiement n’est demandé en ligne.</p>
    <a class="bouton bouton--principal bouton--plein" href="#/commande" data-fermer>${roule('Finaliser ma commande')}</a>
    <button type="button" class="lien t-petit" data-fermer style="justify-self:center;min-height:44px">Continuer à découvrir</button>`;
}

export function monterPanier() {
  p = creerPanneau({ id: 'panneau-commande', titre: 'Votre commande' });
  rendu();
  panier.ecouter(() => rendu());
  sur(p.el, 'click', '[data-plus],[data-moins],[data-retirer]', (e, b) => {
    const cle = b.closest('[data-cle]').dataset.cle;
    const l = panier.lignes().find((x) => x.cle === cle);
    if (b.matches('[data-retirer]')) { panier.retirer(cle); annoncer(`${l.modele.nom} retiré de votre commande.`); p.el.focus(); return; }
    panier.quantite(cle, l.quantite + (b.matches('[data-plus]') ? 1 : -1));
    const nb = p.el.querySelector(`[data-cle="${CSS.escape(cle)}"] ${b.matches('[data-plus]') ? '[data-plus]' : '[data-moins]'}`);
    (nb && !nb.disabled ? nb : p.el.querySelector(`[data-cle="${CSS.escape(cle)}"] output`))?.focus?.();
  });
  return p;
}

export const ouvrirPanier = (depuis) => p.ouvrir(depuis);
export const panneauPanier = () => p;
