import { esc } from '../util/dom.js';

/* Libellé qui roule au survol : deux copies du texte, la seconde est en ::after (CSS). */
export const roule = (texte) => `<span class="roule" data-texte="${esc(texte)}"><span>${esc(texte)}</span></span>`;

export const lienFleche = (href, texte, attrs = '') =>
  `<a class="lien-fleche" href="${href}" ${attrs}>${roule(texte)}<span class="lien-fleche__trait" aria-hidden="true"></span></a>`;
