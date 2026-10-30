/* Finalisation (D.7, E.5) : une seule page, quatre sections reliées par le Fil.
   Aucun paiement : la commande est préparée ici puis transmise à l'atelier sur WhatsApp. */
import { panier, brouillon, commande } from '../store.js';
import { demoLivraison, demoCommunes, demoRetouche } from '../data/demo.js';
import { marque } from '../data/marque.js';
import { champ, coche, option, poserErreur } from '../ui/fields.js';
import { detailLigne } from '../ui/cart-panel.js';
import { icone } from '../ui/icons.js';
import { roule } from '../ui/button.js';
import { imageDe } from '../data/catalogue.js';
import { esc, sur, $, $$ } from '../util/dom.js';
import { prix, prixTexte, dateLongue, ajouterJours, iso } from '../util/format.js';
import { fraisLivraison, fraisMinAbidjan, modeLivraison, numeroProvisoire } from '../util/commande.js';
import { aller } from '../router.js';
import { gsap, ScrollTrigger, reduit, duree } from '../motion/core.js';
import { refuser, presser } from '../motion/micro.js';

const communes = Object.keys(demoCommunes);

/* Délai le plus long de la sélection + un jour de livraison. */
const delaiMax = () => Math.max(...panier.lignes().map((l) => l.modele.delai[1]));
const datePossible = () => ajouterJours(new Date(), delaiMax() + 1);

const recapLignes = () => panier.lignes().map((l) => {
  const m = l.modele; const v = m.versions.find((x) => x.id === l.version);
  return `<li class="ligne"><div class="ligne__media"><img src="${imageDe(m, l.version).src}" alt=""></div>
    <div class="ligne__info"><p class="ligne__nom">${esc(m.nom)}${l.quantite > 1 ? ` <span class="t-doux">×${l.quantite}</span>` : ''}</p>
    <p class="t-petit t-doux">${v?.libelle ? `${esc(v.libelle)} · ` : ''}${esc(detailLigne(l))}</p>
    <span class="prix t-petit">${prix(m.prixFinal * l.quantite)}</span></div></li>`;
}).join('');

const vide = () => `<div class="conteneur introuvable">
  <p class="surtitre t-surtitre">Finaliser ma commande</p>
  <h1 class="t-h1">Votre sélection est vide.</h1>
  <p class="t-doux mesure">Choisissez un modèle et sa taille dans la boutique ; vous reviendrez ici pour transmettre la commande à l’atelier.</p>
  <a class="bouton bouton--principal" href="#/boutique">${roule('Voir la boutique')}</a>
</div>`;

export default {
  cle: null,
  titre: () => 'Finaliser ma commande',
  rendu: () => {
    if (!panier.nombre()) return vide();
    const b = brouillon.lire();
    const mode = b.mode || 'abidjan';
    return `<div class="conteneur commande">
      <header class="page-tete"><p class="surtitre t-surtitre">Dernière étape</p><h1 class="t-h1">Finaliser ma commande</h1>
        <p class="t-doux mesure">Quatre rubriques, une seule page. Vos saisies restent enregistrées sur ce téléphone si vous partez et revenez.</p></header>
      <div class="commande__grille">
        <aside class="commande__cote" aria-label="Récapitulatif">
          <div class="recap-replie">
            <button type="button" class="recap-replie__bouton" aria-expanded="false" aria-controls="recap-corps" data-recap>
              <span>Votre commande · <span data-total-haut>${prixTexte(panier.sousTotal())}</span></span>${icone('chevron')}</button>
            <div class="recap-replie__corps" id="recap-corps" hidden><ul class="recap" style="padding-bottom:var(--s-4)">${recapLignes()}</ul></div>
          </div>
        </aside>

        <form class="commande__form" novalidate data-form>
          <div class="erreurs-resume" data-erreurs tabindex="-1" role="alert" hidden></div>
          <div class="sections">
            <div class="sections__fil" aria-hidden="true"><span class="fil" data-fil></span></div>

            <fieldset class="etape-form" data-etape="1">
              <legend class="etape-form__titre"><span class="etape-form__num" aria-hidden="true">1</span>Vos coordonnées</legend>
              ${champ({ id: 'nom', libelle: 'Nom complet', requis: true, valeur: b.nom || '', attrs: 'autocomplete="name"' })}
              ${champ({ id: 'telephone', libelle: 'Téléphone', type: 'tel', requis: true, prefixe: '+225', valeur: b.telephone || '', aide: 'Dix chiffres, par exemple 07 00 00 00 00.', attrs: 'autocomplete="tel-national" inputmode="tel"' })}
              ${coche({ id: 'whatsapp', libelle: 'Ce numéro est sur WhatsApp', coche: b.whatsapp !== false })}
              ${champ({ id: 'email', libelle: 'E-mail', type: 'email', facultatif: true, valeur: b.email || '', attrs: 'autocomplete="email" inputmode="email"' })}
            </fieldset>

            <fieldset class="etape-form" data-etape="2">
              <legend class="etape-form__titre"><span class="etape-form__num" aria-hidden="true">2</span>Livraison</legend>
              <div class="options" role="radiogroup" aria-label="Mode de livraison">
                ${demoLivraison.map((l) => option({ nom: 'mode', valeur: l.id, libelle: l.libelle, detail: l.detail, prix: l.id === 'abidjan' ? `dès ${prixTexte(fraisMinAbidjan())}` : l.prix ? prixTexte(l.prix) : 'Gratuit', coche: l.id === mode })).join('')}
              </div>
              <div data-adresse style="display:grid;gap:var(--s-5)">
                <div data-si="abidjan">${champ({ id: 'commune', libelle: 'Commune', requis: true, options: communes, valeur: b.commune || '' })}</div>
                <div data-si="hors">${champ({ id: 'ville', libelle: 'Ville', requis: true, valeur: b.ville || '', attrs: 'autocomplete="address-level2"' })}</div>
                ${champ({ id: 'quartier', libelle: 'Quartier', requis: true, valeur: b.quartier || '' })}
                ${champ({ id: 'repere', libelle: 'Point de repère', facultatif: true, valeur: b.repere || '', aide: 'Ex. : après la pharmacie, portail bleu.' })}
              </div>
              <p class="t-petit t-doux" data-si="atelier">Retrait à l’atelier de ${marque.commune}, sur rendez-vous. L’atelier vous indique l’adresse sur WhatsApp.</p>
              ${coche({ id: 'cadeau', libelle: 'C’est un cadeau', coche: Boolean(b.cadeau) })}
              <div class="cadeau" data-bloc-cadeau ${b.cadeau ? '' : 'hidden'}>
                ${champ({ id: 'dest-nom', libelle: 'Nom de la personne', requis: true, valeur: b['dest-nom'] || '' })}
                ${champ({ id: 'dest-tel', libelle: 'Son téléphone', type: 'tel', facultatif: true, prefixe: '+225', valeur: b['dest-tel'] || '', attrs: 'inputmode="tel"' })}
                ${champ({ id: 'dest-message', libelle: 'Message à joindre', facultatif: true, zone: true, valeur: b['dest-message'] || '' })}
                ${coche({ id: 'masquer-prix', libelle: 'Ne pas indiquer le prix dans le colis', coche: b['masquer-prix'] !== false })}
              </div>
            </fieldset>

            <fieldset class="etape-form" data-etape="3">
              <legend class="etape-form__titre"><span class="etape-form__num" aria-hidden="true">3</span>Votre date</legend>
              ${champ({ id: 'date', libelle: 'Pour quand en avez-vous besoin ?', type: 'date', facultatif: true, valeur: b.date || '', attrs: `min="${iso(new Date())}"` })}
              <p class="verdict" data-verdict aria-live="polite"></p>
            </fieldset>

            <fieldset class="etape-form" data-etape="4">
              <legend class="etape-form__titre"><span class="etape-form__num" aria-hidden="true">4</span>Récapitulatif</legend>
              <ul class="recap">${recapLignes()}</ul>
              <div class="recap">
                <div class="total"><span>Sous-total</span><span class="prix">${prix(panier.sousTotal())}</span></div>
                <div class="total"><span>Livraison</span><span class="prix" data-frais></span></div>
                <div class="total total--fort"><span>Total</span><span class="prix" data-total></span></div>
              </div>
              ${champ({ id: 'note', libelle: 'Une précision pour l’atelier', facultatif: true, zone: true, valeur: b.note || '' })}
              <ul class="regles" aria-label="À savoir avant de transmettre">
                <li><span>Chaque pièce est confectionnée après confirmation : comptez ${delaiMax() > 7 ? 'jusqu’à ' : ''}${delaiMax()} jours avant l’envoi.</span></li>
                <li><span>Si l’imprimé de la photo n’est plus disponible, l’atelier vous propose un tissu semblable avant de couper.</span></li>
                <li><span>${esc(demoRetouche)}</span></li>
              </ul>
              <div class="note-paiement">
                <p><strong>Aucun paiement n’est demandé ici.</strong></p>
                <p>En validant, vous préparez un message pour l’atelier. Vous l’envoyez sur WhatsApp ; l’atelier vérifie le délai et le tissu, puis vous indique comment régler.</p>
              </div>
              <button type="submit" class="bouton bouton--principal bouton--plein" data-envoyer>${roule('Préparer ma commande')}</button>
              <p class="t-petit t-doux" style="text-align:center">Total indicatif : <span data-total-bas></span></p>
            </fieldset>
          </div>
        </form>
      </div>
    </div>`;
  },

  monter(racine) {
    const form = $('[data-form]', racine);
    if (!form) return null;
    const off = [];
    const champVal = (id) => ($(`#${id}`, form)?.value || '').trim();
    const mode = () => $('input[name="mode"]:checked', form)?.value || 'abidjan';
    const estCadeau = () => $('#cadeau', form).checked;

    /* Règles de validation : message qui explique comment corriger (E.5). */
    const regles = {
      nom: (v) => (v.length < 2 ? 'Indiquez votre nom et votre prénom.' : ''),
      telephone: (v) => (v.replace(/\D/g, '').length !== 10 ? 'Le numéro doit compter 10 chiffres, sans l’indicatif +225.' : ''),
      email: (v) => (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Vérifiez l’adresse e-mail, par exemple nom@exemple.com.' : ''),
      commune: (v) => (mode() === 'abidjan' && !v ? 'Choisissez votre commune pour calculer la livraison.' : ''),
      ville: (v) => (mode() === 'hors' && !v ? 'Indiquez la ville de livraison.' : ''),
      quartier: (v) => (mode() !== 'atelier' && !v ? 'Indiquez votre quartier.' : ''),
      'dest-nom': (v) => (estCadeau() && !v ? 'Indiquez le nom de la personne qui recevra le cadeau.' : ''),
      'dest-tel': (v) => (v && v.replace(/\D/g, '').length !== 10 ? 'Le numéro doit compter 10 chiffres.' : ''),
    };
    const verifier = (id) => { const input = $(`#${id}`, form); const err = regles[id](champVal(id)); poserErreur(input, err); return err; };

    /* Sections visibles selon le mode de livraison. */
    const appliquerMode = () => {
      const m = mode();
      $$('[data-si]', form).forEach((el) => { el.hidden = el.dataset.si !== m; });
      $('[data-adresse]', form).hidden = m === 'atelier';
      majTotaux();
    };

    const majTotaux = () => {
      const frais = fraisLivraison(mode(), champVal('commune'));
      const st = panier.sousTotal();
      $('[data-frais]', form).innerHTML = frais == null ? '<span class="t-doux">selon la commune</span>' : frais ? prix(frais) : 'Gratuit';
      const total = st + (frais || 0);
      $('[data-total]', form).innerHTML = prix(total);
      $('[data-total-bas]', form).textContent = prixTexte(total);
      $('[data-total-haut]', racine).textContent = prixTexte(total);
    };

    /* Date : la réponse s'affiche en direct, la commande n'est jamais bloquée. */
    const majVerdict = () => {
      const el = $('[data-verdict]', form); const v = champVal('date');
      if (!v) { el.removeAttribute('data-etat'); el.innerHTML = `<span>Sans date, l’atelier compte au plus tôt : livraison vers le ${dateLongue(datePossible())}.</span>`; return; }
      const voulue = new Date(`${v}T12:00`);
      const ok = voulue >= datePossible();
      el.dataset.etat = ok ? 'ok' : 'serre';
      el.innerHTML = ok
        ? `${icone('coche')}<span>C’est faisable : livraison prévue avant le ${dateLongue(voulue)}, sous réserve de confirmation par l’atelier.</span>`
        : `${icone('alerte')}<span>Délai serré : l’atelier vous contacte avant de commencer pour voir ce qui est possible.</span>`;
    };

    /* Le Fil vertical se colore à mesure que les sections sont complètes. */
    const fil = $('[data-fil]', form);
    const majFil = () => {
      const completes = [
        !regles.nom(champVal('nom')) && !regles.telephone(champVal('telephone')) && !regles.email(champVal('email')),
        ['commune', 'ville', 'quartier', 'dest-nom', 'dest-tel'].every((id) => !regles[id](champVal(id))),
        true,
        false,
      ];
      completes[2] = completes[0] && completes[1];
      $$('.etape-form', form).forEach((f, i) => f.setAttribute('data-complete', String(completes[i])));
      let n = 0; while (n < completes.length && completes[n]) n++;
      gsap.to(fil, { scaleY: Math.min(1, n / 3), duration: duree(0.7), ease: 'couture', overwrite: true });
    };

    /* Brouillon conservé à chaque saisie (E.5). */
    const sauver = () => {
      const d = {};
      $$('input, select, textarea', form).forEach((i) => {
        if (i.type === 'radio') { if (i.checked) d[i.name] = i.value; } else if (i.type === 'checkbox') d[i.id] = i.checked; else d[i.id] = i.value;
      });
      brouillon.ecrire(d);
    };

    off.push(sur(form, 'focusout', 'input, select, textarea', (e, i) => { if (regles[i.id]) verifier(i.id); majFil(); }));
    off.push(sur(form, 'input', 'input, select, textarea', (e, i) => {
      if (i.getAttribute('aria-invalid') === 'true' && regles[i.id] && !regles[i.id](champVal(i.id))) poserErreur(i, '');
      sauver();
    }));
    off.push(sur(form, 'change', 'input, select', (e, i) => {
      if (i.name === 'mode') { appliquerMode(); presser(i.closest('.option')); }
      if (i.id === 'commune') majTotaux();
      if (i.id === 'date') majVerdict();
      if (i.id === 'cadeau') {
        const bloc = $('[data-bloc-cadeau]', form);
        bloc.hidden = !i.checked;
        if (i.checked && !reduit()) gsap.from(bloc.children, { y: -8, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'couture', clearProps: 'all' });
        ScrollTrigger.refresh();
      }
      sauver(); majFil();
    }));

    /* Récapitulatif replié (mobile). */
    off.push(sur(racine, 'click', '[data-recap]', (e, b) => {
      const corps = $('#recap-corps', racine); const ouvrir = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', String(ouvrir)); corps.hidden = !ouvrir;
      if (ouvrir && !reduit()) gsap.from(corps.querySelectorAll('.ligne'), { y: -8, opacity: 0, duration: 0.35, stagger: 0.04, ease: 'couture', clearProps: 'all' });
    }));
    /* Sur grand écran le récapitulatif reste ouvert. */
    const mqLarge = window.matchMedia('(min-width: 1024px)');
    const ouvrirLarge = () => { if (mqLarge.matches) { $('[data-recap]', racine).setAttribute('aria-expanded', 'true'); $('#recap-corps', racine).hidden = false; } };
    ouvrirLarge();
    mqLarge.addEventListener('change', ouvrirLarge);
    off.push(() => mqLarge.removeEventListener('change', ouvrirLarge));

    /* Lien du résumé d'erreurs : place le focus sur le champ. */
    off.push(sur(racine, 'click', '[data-aller-champ]', (e, a) => {
      e.preventDefault();
      const input = $(`#${a.dataset.allerChamp}`, form);
      input.focus(); input.scrollIntoView({ block: 'center', behavior: reduit() ? 'auto' : 'smooth' });
    }));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const ids = Object.keys(regles);
      const fautes = ids.map((id) => [id, verifier(id)]).filter(([, err]) => err);
      const resume = $('[data-erreurs]', form);
      majFil();
      if (fautes.length) {
        resume.hidden = false;
        resume.innerHTML = `<p><strong>${fautes.length > 1 ? `${fautes.length} informations manquent` : 'Une information manque'} pour préparer la commande.</strong></p>
          <ul>${fautes.map(([id, err]) => `<li><a href="#${id}" data-aller-champ="${id}">${esc(err)}</a></li>`).join('')}</ul>`;
        resume.focus({ preventScroll: true });
        resume.scrollIntoView({ block: 'center', behavior: reduit() ? 'auto' : 'smooth' });
        refuser(resume);
        return;
      }
      resume.hidden = true;
      const m = mode();
      const frais = fraisLivraison(m, champVal('commune'));
      const lignes = panier.lignes().map((l) => ({
        id: l.id, nom: l.modele.nom, ref: l.modele.ref, quantite: l.quantite, prix: l.modele.prixFinal,
        version: l.modele.versions.find((v) => v.id === l.version)?.libelle || null, detail: detailLigne(l),
      }));
      const sousTotal = panier.sousTotal();
      commande.ecrire({
        numero: numeroProvisoire(), creeLe: new Date().toISOString(), lignes, sousTotal, total: sousTotal + (frais || 0),
        client: { nom: champVal('nom'), telephone: `+225 ${champVal('telephone')}`, whatsapp: $('#whatsapp', form).checked, email: champVal('email') },
        livraison: { mode: m, libelle: modeLivraison(m).libelle, frais, commune: m === 'abidjan' ? champVal('commune') : champVal('ville'), quartier: m === 'atelier' ? '' : champVal('quartier'), repere: m === 'atelier' ? '' : champVal('repere') },
        date: champVal('date') || null,
        cadeau: estCadeau() ? { nom: champVal('dest-nom'), telephone: champVal('dest-tel') ? `+225 ${champVal('dest-tel')}` : '', message: champVal('dest-message'), masquerPrix: $('#masquer-prix', form).checked } : null,
        note: champVal('note'),
      });
      presser($('[data-envoyer]', form));
      panier.vider();
      brouillon.effacer();
      aller('#/confirmation');
    });

    appliquerMode(); majVerdict(); majFil();
    gsap.set(fil, { scaleY: 0 });
    majFil();
    return () => off.forEach((f) => f());
  },
};
