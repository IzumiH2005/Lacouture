/* Confirmation (D.8), sur fond Encre. Rien n'a été payé ni envoyé : la page le dit,
   donne le numéro provisoire et propose d'envoyer la commande à l'atelier sur WhatsApp. */
import { commande } from '../store.js';
import { marque } from '../data/marque.js';
import { monogrammeTrace } from '../ui/logo.js';
import { roule } from '../ui/button.js';
import { icone, glypheWhatsApp } from '../ui/icons.js';
import { annoncer } from '../ui/toast.js';
import { esc, sur, $ } from '../util/dom.js';
import { prix, dateLongue } from '../util/format.js';
import { lienWhatsApp, messagePrerempli, copier } from '../util/whatsapp.js';
import { messageCommande } from '../util/commande.js';
import { gsap, reduit } from '../motion/core.js';
import { sceller } from '../motion/seal.js';

const etapes = [
  ['Commande préparée', 'Sur ce téléphone, à l’instant.'],
  ['Envoyée à l’atelier', 'Quand vous transmettez le message sur WhatsApp.'],
  ['Confirmée par l’atelier', 'Délai, tissu et moyen de paiement validés avec vous.'],
  ['En confection', 'Coupe et couture à Cocody.'],
  ['Prête', 'Livraison ou retrait à l’atelier.'],
];

export default {
  cle: null,
  inverse: true,
  titre: () => 'Votre commande est prête à être envoyée',
  rendu: () => {
    const c = commande.lire();
    if (!c) {
      return `<div class="conteneur introuvable">
        <p class="surtitre t-surtitre">Confirmation</p>
        <h1 class="t-h1">Aucune commande en cours.</h1>
        <p class="mesure" style="color:#D9CDBF">Les commandes préparées sur ce téléphone apparaissent ici. Celle que vous cherchez a peut-être été préparée sur un autre appareil.</p>
        <a class="bouton bouton--principal bouton--inverse" href="#/boutique">${roule('Voir la boutique')}</a>
      </div>`;
    }
    const prenom = c.client.nom.split(/\s+/)[0];
    const msg = messageCommande(c);
    return `<div class="conteneur merci">
      <div class="merci__haut">
        <div class="sceau" data-sceau>${monogrammeTrace()}</div>
        <p class="surtitre t-surtitre" style="color:var(--rose-poudre)">Commande préparée</p>
        <h1 class="merci__titre" data-titre-merci>Merci, ${esc(prenom)}.</h1>
        <p class="merci__phrase">Il reste un geste : envoyer la commande à l’atelier sur WhatsApp. Rien n’a été payé. L’atelier vous répond pour confirmer le délai, le tissu et le moyen de paiement.</p>
      </div>

      <div class="merci__grille">
        <section class="ticket" aria-labelledby="titre-ticket">
          <div class="ticket__num">
            <h2 class="t-surtitre" id="titre-ticket" style="color:#B8AA9B">N° provisoire</h2>
            <p class="ticket__valeur" aria-label="${c.numero}" data-numero>${[...c.numero].map((ch) => `<span aria-hidden="true">${ch}</span>`).join('')}</p>
          </div>
          <dl class="etiquette">
            ${c.lignes.map((l) => `<div class="etiquette__ligne"><dt>${esc(l.nom)}${l.quantite > 1 ? ` ×${l.quantite}` : ''}</dt><dd>${esc([l.version, l.detail].filter(Boolean).join(' · ') || 'Sans taille')}</dd></div>`).join('')}
            <div class="etiquette__ligne"><dt>Livraison</dt><dd>${esc(c.livraison.libelle)}${c.livraison.commune ? `, ${esc(c.livraison.commune)}` : ''}</dd></div>
            <div class="etiquette__ligne"><dt>Date souhaitée</dt><dd>${c.date ? dateLongue(new Date(`${c.date}T12:00`)) : 'Au plus tôt'}</dd></div>
            ${c.cadeau ? `<div class="etiquette__ligne"><dt>Cadeau pour</dt><dd>${esc(c.cadeau.nom)}</dd></div>` : ''}
            <div class="etiquette__ligne"><dt>Montant à régler</dt><dd><span class="prix">${prix(c.total)}</span><br><span class="t-petit" style="color:#B8AA9B">après confirmation de l’atelier</span></dd></div>
          </dl>
        </section>

        <div class="merci__suite">
          <div class="merci__actions">
            <a class="bouton bouton--principal bouton--inverse bouton--plein" href="${lienWhatsApp(msg)}" target="_blank" rel="noopener" data-envoyer-wa>
              <span class="bouton__icone" aria-hidden="true">${glypheWhatsApp}</span>${roule('Envoyer à l’atelier sur WhatsApp')}</a>
            <button type="button" class="bouton bouton--inverse bouton--plein" data-copier>${icone('copier', 'bouton__icone')}${roule('Copier le message')}</button>
            ${messagePrerempli() ? '' : '<p class="t-petit" style="color:#B8AA9B">Le lien ouvre la conversation de l’atelier. Le message est copié en même temps : collez-le, puis envoyez.</p>'}
            <details><summary class="lien t-petit" style="min-height:44px;display:inline-flex;align-items:center;cursor:pointer">Voir le message</summary>
              <pre class="message-wa" data-message>${esc(msg)}</pre></details>
          </div>

          <section aria-labelledby="titre-suivi" style="display:grid;gap:var(--s-5)">
            <h2 class="t-h3" id="titre-suivi">La suite</h2>
            <ol class="suivi" data-suivi>
              <li class="suivi__fil" aria-hidden="true"><span class="fil" data-suivi-fil></span></li>
              ${etapes.map(([t, d], i) => `<li data-fait="${i === 0}"><span>${t}${i === 0 ? '<span class="visuellement-cache"> (fait)</span>' : ''}</span><span class="t-petit" style="color:#B8AA9B">${d}</span></li>`).join('')}
            </ol>
          </section>

          <p class="t-petit" style="color:#B8AA9B">Une question ? <a href="${marque.whatsapp.lien}" target="_blank" rel="noopener">Écrire à l’atelier</a> en rappelant le numéro ${c.numero}. <a href="#/boutique">Retour à la boutique</a></p>
        </div>
      </div>
    </div>`;
  },

  monter(racine) {
    const c = commande.lire();
    if (!c) return null;
    const msg = messageCommande(c);
    const off = [];
    const tl = gsap.timeline();
    tl.add(sceller($('[data-sceau] svg', racine), { delai: 0.2 }));
    if (!reduit()) {
      tl.from($('[data-titre-merci]', racine), { yPercent: 40, opacity: 0, duration: 0.9, ease: 'couture' }, 0.5)
        .from($('.merci__phrase', racine), { opacity: 0, y: 12, duration: 0.7, ease: 'couture' }, 0.7)
        .from(racine.querySelectorAll('[data-numero] span'), { yPercent: 110, duration: 0.7, stagger: 0.03, ease: 'couture' }, 0.9)
        .fromTo($('[data-suivi-fil]', racine), { scaleY: 0 }, { scaleY: 0.12, duration: 0.9, ease: 'couture' }, 1.2);
    } else {
      gsap.set($('[data-suivi-fil]', racine), { scaleY: 0.12 });
    }

    const copierMessage = async (b) => {
      const ok = await copier(msg);
      annoncer(ok ? 'Message copié. Collez-le dans la conversation WhatsApp.' : 'La copie a échoué. Ouvrez « Voir le message » et sélectionnez le texte.');
      return b;
    };
    off.push(sur(racine, 'click', '[data-copier]', (e, b) => copierMessage(b)));
    /* Sans numéro configuré, le lien court ne préremplit rien : on copie en même temps. */
    off.push(sur(racine, 'click', '[data-envoyer-wa]', (e, b) => { if (!messagePrerempli()) copierMessage(b); }));
    return () => { off.forEach((f) => f()); tl.kill(); };
  },
};
