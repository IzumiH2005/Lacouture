/* Commande préparée dans le navigateur : numéro provisoire, frais, message pour l'atelier.
   Aucune commande n'est enregistrée ailleurs que chez la cliente tant qu'elle ne l'envoie pas. */
import { demoLivraison, demoCommunes } from '../data/demo.js';
import { prixTexte, dateLongue } from './format.js';

export const modeLivraison = (id) => demoLivraison.find((l) => l.id === id);

export function fraisLivraison(mode, commune) {
  if (mode === 'abidjan') return commune && demoCommunes[commune] != null ? demoCommunes[commune] : null;
  return modeLivraison(mode)?.prix ?? null;
}

export const fraisMinAbidjan = () => Math.min(...Object.values(demoCommunes));

/* LC + date (AAMMJJ) + 4 caractères : lisible au téléphone, sans 0/O ni 1/I. */
export function numeroProvisoire(d = new Date()) {
  const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const alea = Array.from({ length: 4 }, () => A[Math.floor(Math.random() * A.length)]).join('');
  const date = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  return `LC-${date}-${alea}`;
}

export function messageCommande(c) {
  const l = [];
  l.push(`Bonjour Lacouture, je souhaite passer cette commande (n° provisoire ${c.numero}).`);
  l.push('');
  c.lignes.forEach((x) => l.push(`• ${x.nom}${x.version ? ` (${x.version})` : ''}, réf. ${x.ref}, ${x.detail || 'sans taille'}, ×${x.quantite} : ${prixTexte(x.prix * x.quantite)}`));
  l.push('');
  l.push(`Sous-total : ${prixTexte(c.sousTotal)}`);
  l.push(`Livraison : ${c.livraison.libelle}${c.livraison.frais != null ? `, ${c.livraison.frais ? prixTexte(c.livraison.frais) : 'gratuit'}` : ''}`);
  l.push(`Total indiqué par le site : ${prixTexte(c.total)} (à confirmer par l’atelier)`);
  l.push('');
  l.push(`Nom : ${c.client.nom}`);
  l.push(`Téléphone : ${c.client.telephone}${c.client.whatsapp ? ' (WhatsApp)' : ''}`);
  if (c.client.email) l.push(`E-mail : ${c.client.email}`);
  if (c.livraison.mode !== 'atelier') {
    l.push(`Adresse : ${[c.livraison.commune, c.livraison.quartier].filter(Boolean).join(', ')}`);
    if (c.livraison.repere) l.push(`Repère : ${c.livraison.repere}`);
  }
  if (c.date) l.push(`Souhaitée pour le ${dateLongue(new Date(c.date))}`);
  if (c.cadeau) {
    l.push('');
    l.push(`C’est un cadeau pour ${c.cadeau.nom}${c.cadeau.telephone ? ` (${c.cadeau.telephone})` : ''}.`);
    if (c.cadeau.message) l.push(`Message à joindre : « ${c.cadeau.message} »`);
    if (c.cadeau.masquerPrix) l.push('Merci de ne pas indiquer le prix dans le colis.');
  }
  if (c.note) { l.push(''); l.push(`Note : ${c.note}`); }
  return l.join('\n');
}
