/* Informations RÉELLES sur Lacouture, relevées dans les captures et documents fournis.
   Rien ici n'est inventé. Tout ce qui manque est dans demo.js. */
export const marque = {
  nom: 'Lacouture',
  activite: 'Boutique de confection de vêtements sur mesure',
  slogan: 'Élégance taillée sur mesure pour chaque femme, à chaque instant.',
  lieu: 'Atelier à Cocody, Abidjan',
  ville: 'Abidjan',
  commune: 'Cocody',
  whatsapp: {
    lien: 'https://wa.me/message/WWDSTU5H4N22I1',
    /* Numéro au format international sans « + » (ex. « 225XXXXXXXXXX »). Inconnu à ce jour.
       Une fois renseigné, les messages WhatsApp partent préremplis. */
    numero: '',
  },
  reseaux: [
    { nom: 'Instagram', compte: 'maison.lacouturee', lien: 'https://www.instagram.com/maison.lacouturee/' },
    { nom: 'Threads', compte: 'maison.lacouturee', lien: 'https://www.threads.net/@maison.lacouturee' },
    { nom: 'Facebook', compte: 'Lacouture Abidjan', lien: 'https://www.facebook.com/search/top?q=Lacouture%20Abidjan' },
  ],
  tailles: 'XS à 2XL ou plus',
  /* Règle annoncée par Lacouture sur Instagram, citée telle quelle. */
  substitution: 'Les imprimés sont dans la plupart du temps indisponibles. On prend donc des tissus ou des matières semblables.',
  box: { accroche: 'Faites-leur plaisir autrement. Offrez-leur une box.' },
  collection: { nom: 'Iconic', periode: 'Décembre 2025' },
};
