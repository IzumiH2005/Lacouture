/* Catalogue : assemble les faits visibles sur les photos (marque réelle) et les
   valeurs de démonstration (demo.js). Les noms sont provisoires et descriptifs. */
import { img } from './images.js';
import { demoModeles, demoPromo } from './demo.js';

export const familles = [
  { id: 'iconic', libelle: 'Iconic', collection: true },
  { id: 'soiree', libelle: 'Soirée' },
  { id: 'boubous', libelle: 'Boubous et kaftans' },
  { id: 'ensembles', libelle: 'Ensembles' },
  { id: 'vestes', libelle: 'Vestes' },
];

export const collections = {
  iconic: {
    id: 'iconic', nom: 'Iconic', periode: 'Décembre 2025', image: img.couverture,
    alt: 'Couverture de la collection Iconic : une femme accroupie dans un salon, robe claire à dos nu, photographie en noir et blanc',
    /* Texte d'inspiration non fourni : la page affiche seulement les faits connus. */
  },
};

const base = [
  {
    id: 'robe-drapee-chocolat', nom: 'Robe drapée chocolat', famille: 'soiree', collection: 'iconic', nouveau: true,
    coupe: 'Robe courte ajustée, encolure asymétrique qui dégage une épaule, manches longues, drapé sur le buste.',
    images: [{ src: img.iconicMarron, alt: 'Robe drapée chocolat portée de face, en pied : robe courte ajustée, une épaule dénudée, manches longues' }],
  },
  {
    id: 'robe-licou-volants', nom: 'Robe licou à volants', famille: 'soiree', collection: 'iconic',
    coupe: 'Robe courte à encolure licou nouée, dos dégagé, jupe à volants superposés.',
    images: [
      { src: img.jauneFace, alt: 'Robe licou à volants jaune pâle portée de face, en pied' },
      { src: img.jauneProfil, alt: 'Robe licou à volants jaune pâle portée de profil : dos dégagé, lien du licou qui tombe' },
    ],
  },
  {
    id: 'robe-rouge-plissee', nom: 'Robe rouge plissée', famille: 'soiree',
    coupe: 'Robe courte à décolleté en V, taille marquée, jupe plissée évasée, manches longues terminées en cloche.',
    images: [{ src: img.robeRouge, alt: 'Robe rouge plissée présentée sur buste à l’atelier : décolleté en V, manches cloche, jupe évasée' }],
  },
  {
    id: 'ensemble-leopard', nom: 'Ensemble imprimé léopard', famille: 'ensembles',
    coupe: 'Ensemble deux pièces : haut à manches longues noué devant et jupe longue, en imprimé léopard.',
    images: [{ src: img.leopard, alt: 'Ensemble imprimé léopard porté, assise devant un miroir : haut noué à manches longues et jupe longue' }],
  },
  {
    id: 'veste-volants', nom: 'Veste imprimée à volants', famille: 'vestes',
    coupe: 'Veste légère à grands volants sur le devant, fermée par un lien noué à l’encolure.',
    images: [{ src: img.veste, alt: 'Veste imprimée à volants présentée sur buste noir à l’atelier, lien noué à l’encolure' }],
  },
  {
    id: 'boubou-medaillons', nom: 'Boubou à médaillons', famille: 'boubous',
    coupe: 'Boubou ample à manches larges, orné d’une colonne de médaillons rayés appliqués sur le devant.',
    versions: [
      { id: 'ivoire', libelle: 'Ivoire', images: [{ src: img.boubouBlanc, alt: 'Boubou à médaillons ivoire porté, détail des médaillons beiges rayés sur le devant' }] },
      { id: 'rouille', libelle: 'Rouille', images: [{ src: img.kaftanRouille, alt: 'Boubou à médaillons rouille porté, médaillons rayés de blanc sur le devant' }] },
    ],
  },
  {
    id: 'kaftan-bandes', nom: 'Kaftan à bandes', famille: 'boubous',
    coupe: 'Kaftan ample vert sauge, bande verticale contrastée vert, jaune et orange sur le devant.',
    images: [{ src: img.kaftanSauge, alt: 'Kaftan vert sauge porté, bande verticale verte, jaune et orange sur le devant' }],
  },
  {
    id: 'box-cadeau', nom: 'La box Lacouture', famille: 'offrir',
    coupe: 'Coffret noir rigide au nom de Lacouture. Son contenu exact reste à confirmer par la maison.',
    images: [
      { src: img.boxOuverture, alt: 'Deux mains posées sur la box Lacouture, coffret noir au logo rose' },
      { src: img.boxTable, alt: 'La box Lacouture posée sur une table en bois sombre' },
      { src: img.boxMains, alt: 'La box Lacouture tenue contre soi' },
    ],
  },
];

export const modeles = base.map((m) => {
  const d = demoModeles[m.id];
  const versions = m.versions || [{ id: 'unique', libelle: null, images: m.images }];
  const promo = demoPromo.active && m.collection === demoPromo.collection ? demoPromo : null;
  return {
    ...m, ...d, versions,
    images: versions[0].images,
    prixFinal: promo ? Math.round((d.prix * (1 - promo.taux)) / 500) * 500 : d.prix,
    promo,
  };
});

export const parId = (id) => modeles.find((m) => m.id === id);
export const boutique = modeles.filter((m) => m.famille !== 'offrir');
export const dansFamille = (f) => (f === 'tout' ? boutique : boutique.filter((m) => m.famille === f || m.collection === f));
export const imageDe = (m, versionId) => (m.versions.find((v) => v.id === versionId) || m.versions[0]).images[0];
