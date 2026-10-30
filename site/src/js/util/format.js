const nbsp = ' ';
export const nombre = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, nbsp);
/* « 45 000 FCFA » : espace fine insécable entre milliers, devise plus petite. */
export const prix = (n) => `${nombre(n)}<span class="devise">${nbsp}FCFA</span>`;
export const prixTexte = (n) => `${nombre(n)} FCFA`;
export const delai = ([a, b]) => `${a} à ${b} jours`;

const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
export const dateLongue = (d) => `${d.getDate() === 1 ? '1er' : d.getDate()} ${MOIS[d.getMonth()]}`;
export const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const ajouterJours = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };
