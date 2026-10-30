import { esc } from '../util/dom.js';
import { prix, delai } from '../util/format.js';

export const blocPrix = (m) => (m.promo
  ? `<p class="prix"><span class="visuellement-cache">Prix réduit :</span><span class="prix__promo">${prix(m.prixFinal)}</span><del class="prix__barre"><span class="visuellement-cache">au lieu de</span> ${prix(m.prix)}</del></p>`
  : `<p class="prix">${prix(m.prix)}</p>`);

export const badgeDe = (m) => (m.promo ? `<span class="badge" style="color:var(--rose-fil)">${m.promo.libelle}</span>` : m.nouveau ? '<span class="badge">Nouveau</span>' : '');

export function carte(m, { niveau = 3 } = {}) {
  const [a, b] = m.images;
  return `<a class="carte" href="#/modele/${m.id}" data-id="${m.id}" data-reveler>
    <div class="media carte__media" data-image>
      ${badgeDe(m)}
      <img src="${a.src}" alt="${esc(a.alt)}" loading="lazy" decoding="async">
      ${b ? `<img class="carte__dos" src="${b.src}" alt="" loading="lazy" decoding="async">` : ''}
    </div>
    <div class="carte__texte">
      <h${niveau} class="carte__nom">${esc(m.nom)}</h${niveau}>
      ${blocPrix(m)}
      <p class="carte__delai">${m.tailleUnique ? 'Taille unique · ' : ''}Confection ${delai(m.delai)}</p>
    </div>
  </a>`;
}
