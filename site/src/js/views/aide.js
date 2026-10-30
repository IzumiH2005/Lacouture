/* Aide (D.9) : une seule page en sections ancrées. Ce qui relève de la démonstration
   est signalé comme tel ; le reste cite Lacouture. */
import { marque } from '../data/marque.js';
import { boutique } from '../data/catalogue.js';
import { demoLivraison, demoCommunes, demoRetouche, demoDelaiBox } from '../data/demo.js';
import { tableauGuide, commentMesurer } from '../ui/guide.js';
import { lienFleche } from '../ui/button.js';
import { glypheWhatsApp } from '../ui/icons.js';
import { esc } from '../util/dom.js';
import { prix, prixTexte, delai } from '../util/format.js';
import { titresAuDefilement } from '../motion/reveal.js';
import { gsap, reduit } from '../motion/core.js';

const sections = [
  ['tailles', 'Tailles'], ['delais', 'Délais'], ['livraison', 'Livraison'], ['paiement', 'Paiement'],
  ['tissus', 'Tissus'], ['retouches', 'Retouches'], ['contact', 'Contact'],
];
const demo = '<span class="badge badge--demo">Démo</span>';

const corps = {
  tailles: () => `<p>Lacouture coud du ${esc(marque.tailles)}. Chaque fiche propose aussi l’option « Sur mes mesures » : vous saisissez vos mesures, ou vous demandez à l’atelier de les prendre avec vous sur WhatsApp.</p>
    ${tableauGuide()}<h3 class="t-h3">Comment se mesurer</h3>${commentMesurer()}`,
  delais: () => `<p>Chaque pièce est confectionnée après la commande. Le délai s’affiche sur chaque fiche ; l’atelier le confirme en validant la commande. Si vous avez une date, indiquez-la : l’atelier vérifie qu’elle est tenable avant de lancer la confection.</p>
    <div class="tableau-defile"><table class="tableau"><caption>Délais de confection par modèle ${demo}</caption>
      <thead><tr><th scope="col">Modèle</th><th scope="col">Réf.</th><th scope="col">Délai</th></tr></thead>
      <tbody>${boutique.map((m) => `<tr><th scope="row"><a href="#/modele/${m.id}">${esc(m.nom)}</a></th><td>${m.ref}</td><td>${delai(m.delai)}</td></tr>`).join('')}
      <tr><th scope="row"><a href="#/modele/box-cadeau">La box Lacouture</a></th><td>BOX-01</td><td>${esc(demoDelaiBox)}</td></tr></tbody></table></div>`,
  livraison: () => `<div class="tableau-defile"><table class="tableau"><caption>Modes de livraison ${demo}</caption>
      <thead><tr><th scope="col">Mode</th><th scope="col">Délai après confection</th><th scope="col">Frais</th></tr></thead>
      <tbody>${demoLivraison.map((l) => `<tr><th scope="row">${esc(l.libelle)}</th><td>${esc(l.detail)}</td><td>${l.prix ? prix(l.prix) : 'Offert'}</td></tr>`).join('')}</tbody></table></div>
    <details class="details-communes"><summary>Frais par commune d’Abidjan</summary>
      <ul class="regles">${Object.entries(demoCommunes).map(([c, f]) => `<li><span>${esc(c)} : ${prixTexte(f)}</span></li>`).join('')}</ul></details>`,
  paiement: () => `<p>Ce site ne demande aucun paiement. Votre commande y est préparée, puis envoyée à l’atelier sur WhatsApp. L’atelier confirme le montant exact, la faisabilité et les moyens de paiement acceptés avant le début de la confection.</p>
    <p class="encart-demo">Les moyens de paiement en ligne et la règle d’acompte restent à définir avec Lacouture.</p>`,
  tissus: () => `<blockquote class="citation"><p>« ${esc(marque.substitution)} »</p><footer class="t-petit t-doux">Lacouture, sur Instagram</footer></blockquote>
    <p>Le modèle reste le même ; le tissu peut différer légèrement de la photo. Si vous avez déjà votre tissu, précisez-le dans la note de commande.</p>`,
  retouches: () => `<p>${esc(demoRetouche)} ${demo}</p><p>Signalez toute retouche sur WhatsApp avec une photo de la pièce portée.</p>`,
  contact: () => `<p>L’atelier répond sur WhatsApp. Il se trouve à ${esc(marque.commune)}, ${esc(marque.ville)}.</p>
    <p><a class="bouton bouton--principal" href="${marque.whatsapp.lien}" target="_blank" rel="noopener"><span class="bouton__icone" aria-hidden="true">${glypheWhatsApp}</span><span>Écrire à l’atelier</span></a></p>
    <ul class="regles">${marque.reseaux.map((r) => `<li><a href="${r.lien}" target="_blank" rel="noopener">${r.nom} · ${esc(r.compte)}</a></li>`).join('')}</ul>
    <p>${lienFleche('#/sur-mesure', 'Demander un modèle sur mesure')}</p>`,
};

function defiler(main, id, immediat) {
  const cible = main.querySelector(`#aide-${id}`);
  if (!cible) return;
  cible.scrollIntoView({ block: 'start', behavior: immediat || reduit() ? 'auto' : 'smooth' });
  const titre = cible.querySelector('h2');
  titre?.focus({ preventScroll: true });
}

export default {
  cle: 'aide',
  titre: (s) => (s && sections.find(([id]) => id === s) ? `Aide · ${sections.find(([id]) => id === s)[1]}` : 'Aide'),
  rendu: () => `<div class="conteneur">
    <header class="page-tete">
      <p class="surtitre t-surtitre">Aide</p>
      <h1 class="t-h1" data-titre>Avant de commander, tout ce qu’il faut savoir.</h1>
      <nav aria-label="Sommaire de l’aide"><ul class="sommaire">${sections.map(([id, t]) => `<li><a href="#/aide/${id}">${t}</a></li>`).join('')}</ul></nav>
    </header>
    <div class="mesure" style="padding-bottom:var(--s-section)">
      ${sections.map(([id, t]) => `<section class="aide-section" id="aide-${id}" aria-labelledby="titre-${id}">
        <h2 class="t-h2" id="titre-${id}" tabindex="-1">${t}</h2>${corps[id]()}</section>`).join('')}
    </div>
  </div>`,
  memePage: () => true,
  ancre(main, [s], { immediat = false } = {}) { if (s) defiler(main, s, immediat); },
  monter(racine) {
    const fin = titresAuDefilement(racine);
    if (!reduit()) gsap.from(racine.querySelectorAll('.sommaire li'), { y: 10, opacity: 0, duration: 0.6, stagger: 0.04, ease: 'couture', delay: 0.3, clearProps: 'all' });
    return fin;
  },
};
