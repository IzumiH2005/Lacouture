/* ==========================================================================
   DONNÉES DE DÉMONSTRATION
   Aucune de ces valeurs n'a été fournie par Lacouture. Elles existent pour que
   le parcours d'achat fonctionne et doivent toutes être remplacées.
   ========================================================================== */
export const DEMO = true;

/* Prix en FCFA, références, délais de confection, tailles proposées. */
export const demoModeles = {
  'robe-drapee-chocolat': { ref: 'ICO-01', prix: 45000, delai: [7, 10], tailles: ['XS', 'S', 'M', 'L', 'XL', '2XL'] },
  'robe-licou-volants': { ref: 'ICO-02', prix: 42000, delai: [7, 10], tailles: ['XS', 'S', 'M', 'L', 'XL'] },
  'ensemble-leopard': { ref: 'ENS-01', prix: 38000, delai: [7, 10], tailles: ['S', 'M', 'L', 'XL', '2XL', '3XL'] },
  'veste-volants': { ref: 'VES-01', prix: 35000, delai: [5, 7], tailles: ['XS', 'S', 'M', 'L', 'XL', '2XL'] },
  'robe-rouge-plissee': { ref: 'SOI-01', prix: 40000, delai: [7, 10], tailles: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'] },
  'boubou-medaillons': { ref: 'BOU-01', prix: 32000, delai: [5, 7], tailleUnique: true },
  'kaftan-bandes': { ref: 'BOU-02', prix: 30000, delai: [5, 7], tailleUnique: true },
  'box-cadeau': { ref: 'BOX-01', prix: 15000, delai: [2, 3], sansTaille: true },
};

/* Promotion de lancement d'ICONIC : « -35 % sur toute la collection » a été annoncée
   sur Instagram en décembre 2025. Sa validité actuelle est inconnue : à reconfirmer.
   Passer `active` à false pour la retirer partout. */
export const demoPromo = { collection: 'iconic', taux: 0.35, libelle: '−35 %', jusqua: 'à reconfirmer', active: true };

export const demoLivraison = [
  { id: 'abidjan', libelle: 'Livraison à Abidjan', detail: 'Selon la commune, sous 24 à 48 h après confection', prix: 2000 },
  { id: 'hors', libelle: 'Livraison hors Abidjan', detail: 'Par transporteur, sous 2 à 4 jours', prix: 5000 },
  { id: 'atelier', libelle: 'Retrait à l’atelier', detail: 'Cocody, sur rendez-vous', prix: 0 },
];
/* Frais par commune (Abidjan). Valeurs fictives. */
export const demoCommunes = {
  Cocody: 1500, Plateau: 2000, Marcory: 2000, Treichville: 2000, Adjamé: 2000, Koumassi: 2500, 'Port-Bouët': 2500,
  Yopougon: 3000, Abobo: 3000, Attécoubé: 2500, Bingerville: 3000, Anyama: 3500, Songon: 3500,
};

/* Guide des tailles en cm : grille courante, non validée par l'atelier. */
export const demoGuide = [
  { taille: 'XS', poitrine: '78–82', taille_: '60–64', hanches: '86–90' },
  { taille: 'S', poitrine: '83–87', taille_: '65–69', hanches: '91–95' },
  { taille: 'M', poitrine: '88–93', taille_: '70–75', hanches: '96–101' },
  { taille: 'L', poitrine: '94–100', taille_: '76–82', hanches: '102–108' },
  { taille: 'XL', poitrine: '101–107', taille_: '83–89', hanches: '109–115' },
  { taille: '2XL', poitrine: '108–115', taille_: '90–97', hanches: '116–123' },
  { taille: '3XL', poitrine: '116–124', taille_: '98–106', hanches: '124–132' },
];

export const demoSurMesure = { supplement: 0, note: 'Sans supplément (à confirmer par l’atelier).' };
export const demoRetouche = 'Retouche offerte sous 7 jours (engagement à confirmer).';
export const demoDelaiBox = 'Préparée en 2 à 3 jours';
