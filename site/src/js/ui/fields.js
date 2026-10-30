/* Champs de formulaire (E.5) : libellé toujours visible, aide, message d'erreur relié. */
import { esc } from '../util/dom.js';
import { icone } from './icons.js';

export function champ({ id, libelle, type = 'text', requis = false, aide = '', facultatif = false, attrs = '', prefixe = '', valeur = '', zone = false, options = null }) {
  const decrit = [aide && `${id}-aide`, `${id}-erreur`].filter(Boolean).join(' ');
  const commun = `class="champ__saisie" id="${id}" name="${id}" aria-describedby="${decrit}" ${requis ? 'required aria-required="true"' : ''} ${attrs}`;
  let saisie;
  if (zone) saisie = `<textarea ${commun} rows="3">${esc(valeur)}</textarea>`;
  else if (options) saisie = `<select ${commun}><option value="">Choisir…</option>${options.map((o) => `<option${o === valeur ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select>`;
  else saisie = `<input ${commun} type="${type}" value="${esc(valeur)}">`;
  return `<div class="champ" data-champ="${id}">
    <label class="champ__libelle" for="${id}">${libelle}${facultatif ? ' <span class="t-doux">(facultatif)</span>' : ''}</label>
    ${prefixe ? `<div class="champ__groupe"><span class="champ__prefixe" aria-hidden="true">${prefixe}</span>${saisie}</div>` : saisie}
    ${aide ? `<p class="champ__aide" id="${id}-aide">${aide}</p>` : ''}
    <p class="champ__erreur" id="${id}-erreur" aria-live="polite"></p>
  </div>`;
}

export function poserErreur(input, message) {
  const err = document.getElementById(`${input.id}-erreur`);
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  if (err) err.innerHTML = message ? `${icone('alerte')}<span>${message}</span>` : '';
}

export const coche = ({ id, libelle, coche: c = false }) => `<label class="coche" for="${id}">
  <input type="checkbox" id="${id}" name="${id}" ${c ? 'checked' : ''}>
  <span class="coche__case" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3 8.5l3.2 3L13 4.5"/></svg></span>
  <span>${libelle}</span></label>`;

export const option = ({ nom, valeur, libelle, detail = '', prix = '', coche: c = false }) => `<label class="option">
  <input type="radio" name="${nom}" value="${valeur}" ${c ? 'checked' : ''}>
  <span class="option__repere" aria-hidden="true"></span>
  <span class="option__libelle"><span>${libelle}</span>${detail ? `<span class="t-petit t-doux">${detail}</span>` : ''}</span>
  ${prix ? `<span class="option__prix">${prix}</span>` : ''}</label>`;
