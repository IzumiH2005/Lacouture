/* État partagé : la sélection (panier), le brouillon du formulaire et la dernière commande préparée.
   Tout est conservé dans le navigateur ; un stockage indisponible ne bloque rien. */
import { parId } from './data/catalogue.js';

const CLE = { panier: 'lacouture.selection', brouillon: 'lacouture.brouillon', commande: 'lacouture.commande' };
/* Copie en mémoire : si le navigateur refuse le stockage (aperçu de fichier, navigation privée),
   la commande reste disponible jusqu'à la fermeture de la page. */
const memoire = new Map();
const lire = (k, defaut) => {
  try { const v = localStorage.getItem(k); if (v) return JSON.parse(v); } catch { /* stockage indisponible */ }
  return memoire.has(k) ? JSON.parse(memoire.get(k)) : defaut;
};
const ecrire = (k, v) => {
  memoire.set(k, JSON.stringify(v));
  try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* la copie en mémoire suffit */ }
};

const ecouteurs = new Set();
let lignes = lire(CLE.panier, []).filter((l) => parId(l.id));

const signaler = (raison) => { ecrire(CLE.panier, lignes); ecouteurs.forEach((f) => f(raison)); };
const cleDe = (l) => [l.id, l.version, l.taille || '', JSON.stringify(l.mesures || null)].join('|');

export const panier = {
  lignes: () => lignes.map((l) => ({ ...l, modele: parId(l.id) })),
  nombre: () => lignes.reduce((s, l) => s + l.quantite, 0),
  sousTotal: () => lignes.reduce((s, l) => s + parId(l.id).prixFinal * l.quantite, 0),
  ajouter(ligne) {
    const cle = cleDe(ligne);
    const existante = lignes.find((l) => l.cle === cle);
    if (existante) existante.quantite = Math.min(existante.quantite + 1, 9);
    else lignes.push({ ...ligne, cle, quantite: 1 });
    signaler('ajout');
  },
  quantite(cle, q) {
    const l = lignes.find((x) => x.cle === cle);
    if (!l) return;
    l.quantite = Math.max(1, Math.min(9, q));
    signaler('quantite');
  },
  retirer(cle) { lignes = lignes.filter((l) => l.cle !== cle); signaler('retrait'); },
  vider() { lignes = []; signaler('vide'); },
  ecouter(f) { ecouteurs.add(f); return () => ecouteurs.delete(f); },
};

export const brouillon = {
  lire: () => lire(CLE.brouillon, {}),
  ecrire: (v) => ecrire(CLE.brouillon, v),
  effacer: () => { memoire.delete(CLE.brouillon); try { localStorage.removeItem(CLE.brouillon); } catch { /* rien */ } },
};

export const commande = {
  lire: () => lire(CLE.commande, null),
  ecrire: (v) => ecrire(CLE.commande, v),
};
