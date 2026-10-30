/* Guide des tailles : tableau (démonstration) et manière de prendre ses mesures. */
import { creerPanneau } from './panel.js';
import { demoGuide } from '../data/demo.js';
import { marque } from '../data/marque.js';

export const tableauGuide = () => `<div class="tableau-defile"><table class="tableau">
  <caption>Mesures du corps en centimètres. Grille indicative, à valider par l’atelier.</caption>
  <thead><tr><th scope="col">Taille</th><th scope="col">Poitrine</th><th scope="col">Taille</th><th scope="col">Hanches</th></tr></thead>
  <tbody>${demoGuide.map((l) => `<tr><th scope="row">${l.taille}</th><td>${l.poitrine}</td><td>${l.taille_}</td><td>${l.hanches}</td></tr>`).join('')}</tbody>
</table></div>`;

export const commentMesurer = () => `<ul class="regles">
  <li><span><strong>Poitrine</strong> : le mètre ruban passe sur la partie la plus forte, bien horizontal.</span></li>
  <li><span><strong>Taille</strong> : au creux de la taille, sans serrer.</span></li>
  <li><span><strong>Hanches</strong> : sur la partie la plus large, pieds joints.</span></li>
  <li><span><strong>Hauteur</strong> : du sommet de la tête au sol, sans chaussures.</span></li>
</ul>`;

let p;
export function ouvrirGuide(depuis) {
  if (!p) {
    p = creerPanneau({ id: 'panneau-guide', titre: 'Guide des tailles', large: true });
    p.corps.innerHTML = `<div style="display:grid;gap:var(--s-6)">
      <p>Lacouture habille du ${marque.tailles}. Entre deux tailles, choisissez la plus grande ou indiquez vos mesures : l’atelier ajuste.</p>
      ${tableauGuide()}
      <div style="display:grid;gap:var(--s-3)"><h3 class="t-h3">Prendre ses mesures</h3>${commentMesurer()}</div>
      <p class="encart-demo">Les valeurs de ce tableau sont une grille courante, pas encore celle de l’atelier.</p>
    </div>`;
  }
  p.ouvrir(depuis);
}
