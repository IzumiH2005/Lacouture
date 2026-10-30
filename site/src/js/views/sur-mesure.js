/* Sur mesure (D.9) : la cliente décrit le modèle qu'elle souhaite. Le formulaire
   prépare un message WhatsApp ; aucun envoi, aucun paiement n'a lieu sur le site. */
import { marque } from '../data/marque.js';
import { img } from '../data/images.js';
import { champ, poserErreur } from '../ui/fields.js';
import { roule } from '../ui/button.js';
import { icone, glypheWhatsApp } from '../ui/icons.js';
import { annoncer } from '../ui/toast.js';
import { sur, $ } from '../util/dom.js';
import { dateLongue, iso } from '../util/format.js';
import { lienWhatsApp, messagePrerempli, copier } from '../util/whatsapp.js';
import { titresAuDefilement } from '../motion/reveal.js';
import { gsap, reduit } from '../motion/core.js';
import { refuser } from '../motion/micro.js';

const occasions = ['Mariage', 'Dot', 'Soirée', 'Anniversaire', 'Cérémonie religieuse', 'Travail', 'Autre'];

export default {
  cle: 'sur-mesure',
  titre: () => 'Commander sur mesure',
  rendu: () => `<div class="conteneur">
    <header class="page-tete">
      <p class="surtitre t-surtitre">Sur mesure</p>
      <h1 class="t-h1" data-titre>Le modèle que vous avez en tête, à vos mesures.</h1>
    </header>
    <div class="edito" style="padding-bottom:var(--s-section)">
      <div class="edito__media"><div class="media media--34" data-image><img src="${img.robeRouge}" alt="Robe rouge plissée sur buste à l’atelier de Cocody" loading="lazy"></div>
        <p class="t-petit t-doux" style="margin-top:var(--s-3)">Lacouture le dit ainsi : « le client nous contacte avec le modèle qu’il souhaite faire ».</p></div>
      <div class="edito__texte" style="display:grid;gap:var(--s-6)">
        <p class="mesure">Décrivez la pièce, l’occasion et la date. Ce formulaire prépare un message pour l’atelier : vous l’envoyez sur WhatsApp, avec votre photo d’inspiration, et l’atelier vous répond avec un devis. Rien n’est payé à ce stade.</p>
        <form class="sections" style="padding-left:0" novalidate data-form-mesure>
          ${champ({ id: 'sm-modele', libelle: 'Le modèle souhaité', requis: true, zone: true, aide: 'Coupe, longueur, manches, couleur, tissu si vous en avez un. Vous joindrez la photo dans WhatsApp.' })}
          ${champ({ id: 'sm-occasion', libelle: 'L’occasion', facultatif: true, options: occasions })}
          <div class="champs-2">
            ${champ({ id: 'sm-date', libelle: 'Pour quand ?', type: 'date', facultatif: true, attrs: `min="${iso(new Date())}"` })}
            ${champ({ id: 'sm-budget', libelle: 'Budget indicatif en FCFA', type: 'text', facultatif: true, attrs: 'inputmode="numeric"' })}
          </div>
          ${champ({ id: 'sm-nom', libelle: 'Votre nom', requis: true, attrs: 'autocomplete="name"' })}
          ${champ({ id: 'sm-tel', libelle: 'Téléphone', type: 'tel', requis: true, prefixe: '+225', aide: 'Dix chiffres.', attrs: 'autocomplete="tel-national" inputmode="tel"' })}
          <button type="submit" class="bouton bouton--principal bouton--plein">${roule('Préparer ma demande')}</button>
        </form>
        <section class="cadeau" data-resultat hidden aria-labelledby="titre-demande" tabindex="-1">
          <h2 class="t-h3" id="titre-demande">Votre demande est prête.</h2>
          <p class="t-petit">Envoyez-la à l’atelier sur WhatsApp et joignez votre photo d’inspiration dans la conversation.</p>
          <pre class="message-wa" data-message></pre>
          <a class="bouton bouton--principal bouton--plein" data-wa href="${marque.whatsapp.lien}" target="_blank" rel="noopener"><span class="bouton__icone" aria-hidden="true">${glypheWhatsApp}</span>${roule('Envoyer sur WhatsApp')}</a>
          <button type="button" class="bouton bouton--plein" data-copier>${icone('copier', 'bouton__icone')}${roule('Copier le message')}</button>
          ${messagePrerempli() ? '' : '<p class="t-petit t-doux">Le lien ouvre la conversation de l’atelier ; le message est copié en même temps pour que vous le colliez.</p>'}
        </section>
      </div>
    </div>
  </div>`,
  monter(racine) {
    const fin = titresAuDefilement(racine);
    const form = $('[data-form-mesure]', racine);
    const res = $('[data-resultat]', racine);
    const v = (id) => $(`#${id}`, form).value.trim();
    const regles = {
      'sm-modele': (x) => (x.length < 10 ? 'Décrivez la pièce en quelques mots (au moins une phrase).' : ''),
      'sm-nom': (x) => (x.length < 2 ? 'Indiquez votre nom.' : ''),
      'sm-tel': (x) => (x.replace(/\D/g, '').length !== 10 ? 'Le numéro doit compter 10 chiffres, sans l’indicatif +225.' : ''),
    };
    const verifier = (id) => { const e = regles[id](v(id)); poserErreur($(`#${id}`, form), e); return e; };
    let message = '';
    const off = [
      sur(form, 'focusout', 'input, textarea', (e, i) => { if (regles[i.id]) verifier(i.id); }),
      sur(res, 'click', '[data-copier]', async () => { annoncer((await copier(message)) ? 'Message copié.' : 'La copie a échoué : sélectionnez le texte du message.'); }),
      sur(res, 'click', '[data-wa]', () => { if (!messagePrerempli()) copier(message); }),
    ];
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fautes = Object.keys(regles).filter((id) => verifier(id));
      if (fautes.length) { $(`#${fautes[0]}`, form).focus(); refuser(form); return; }
      const lignes = ['Bonjour Lacouture, je souhaite faire réaliser un modèle sur mesure.', '', `Modèle : ${v('sm-modele')}`];
      if (v('sm-occasion')) lignes.push(`Occasion : ${v('sm-occasion')}`);
      if (v('sm-date')) lignes.push(`Pour le ${dateLongue(new Date(`${v('sm-date')}T12:00`))}`);
      if (v('sm-budget')) lignes.push(`Budget indicatif : ${v('sm-budget')} FCFA`);
      lignes.push('', `Nom : ${v('sm-nom')}`, `Téléphone : +225 ${v('sm-tel')}`, '', 'Je joins ma photo d’inspiration.');
      message = lignes.join('\n');
      $('[data-message]', res).textContent = message;
      $('[data-wa]', res).href = lienWhatsApp(message);
      res.hidden = false;
      res.focus({ preventScroll: true });
      res.scrollIntoView({ block: 'start', behavior: reduit() ? 'auto' : 'smooth' });
      if (!reduit()) gsap.from(res.children, { y: 16, opacity: 0, duration: 0.6, stagger: 0.06, ease: 'couture', clearProps: 'all' });
    });
    return () => { fin(); off.forEach((f) => f()); };
  },
};
