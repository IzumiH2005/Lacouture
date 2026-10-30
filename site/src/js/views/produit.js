/* Fiche modèle (D.4, E.4). Ordre : galerie, nom et prix, délai, couleur, taille ou mesures,
   action principale, WhatsApp, engagements, étiquette, détails, suggestions. */
import { parId, boutique, familles } from '../data/catalogue.js';
import { demoLivraison } from '../data/demo.js';
import { marque } from '../data/marque.js';
import { blocPrix, badgeDe } from '../ui/card.js';
import { roule } from '../ui/button.js';
import { icone, glypheWhatsApp } from '../ui/icons.js';
import { accordeon, basculer } from '../ui/accordion.js';
import { champ, coche, poserErreur } from '../ui/fields.js';
import { ouvrirGuide } from '../ui/guide.js';
import { ouvrirPanier } from '../ui/cart-panel.js';
import { annoncer } from '../ui/toast.js';
import { piegerFocus } from '../ui/panel.js';
import { panier } from '../store.js';
import { esc, sur, $, $$ } from '../util/dom.js';
import { delai, prixTexte, dateLongue, ajouterJours } from '../util/format.js';
import { lienWhatsApp } from '../util/whatsapp.js';
import { gsap, ScrollTrigger, reduit } from '../motion/core.js';
import { presser, choisirTaille, refuser } from '../motion/micro.js';
import { envoler } from '../motion/fly.js';
import { titreEnLignes } from '../motion/reveal.js';
import { railHtml, monterRail } from './accueil.js';
import introuvable from './introuvable.js';

const vues = (m, v) => (m.versions.find((x) => x.id === v) || m.versions[0]).images;

const galerie = (m, v) => {
  const imgs = vues(m, v);
  return `<div class="galerie" data-galerie>
    <ul class="galerie__piste" data-galerie-piste aria-label="Photos de ${esc(m.nom)}">
      ${imgs.map((im, i) => `<li class="galerie__vue"><button type="button" data-agrandir="${i}" aria-label="Agrandir la photo ${i + 1} sur ${imgs.length}">
        <div class="media" ${i ? 'data-image' : ''}><img src="${im.src}" alt="${esc(im.alt)}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}></div></button></li>`).join('')}
    </ul>
    ${imgs.length > 1 ? `<div class="galerie__indicateur" aria-hidden="true"><div class="galerie__rail"><span class="galerie__progres" data-progres></span></div><span class="galerie__compteur" data-compteur>1 / ${imgs.length}</span></div>` : ''}
  </div>`;
};

const blocTaille = (m) => {
  if (m.sansTaille) return '';
  if (m.tailleUnique) {
    return `<div class="bloc">
      <div class="bloc__tete"><p class="t-h3">Taille unique</p></div>
      <p class="t-petit t-doux">Coupe ample qui convient du ${marque.tailles}. Indiquez votre hauteur si vous souhaitez une longueur ajustée.</p>
      ${champ({ id: 'hauteur-unique', libelle: 'Votre hauteur en cm', type: 'number', facultatif: true, attrs: 'inputmode="numeric" min="120" max="210"' })}
    </div>`;
  }
  return `<fieldset class="bloc" data-bloc-taille>
    <div class="bloc__tete"><legend class="t-h3">Taille</legend><button type="button" class="lien" data-guide>Guide des tailles</button></div>
    <div class="tailles" role="group" aria-label="Choisir une taille">
      ${m.tailles.map((t) => `<button type="button" class="taille" data-taille="${t}" aria-pressed="false"><span class="taille__fond" aria-hidden="true"></span><span>${t}</span></button>`).join('')}
      <button type="button" class="taille" data-taille="mesures" aria-pressed="false" aria-controls="bloc-mesures"><span class="taille__fond" aria-hidden="true"></span><span>Sur mes mesures</span></button>
    </div>
    <p class="aide-taille" data-aide-taille aria-live="polite">Toutes les tailles sont confectionnées à la commande.</p>
    <div class="mesures" id="bloc-mesures" hidden>
      <p class="t-petit">Mesures du corps, en centimètres. L’atelier les vérifie avec vous avant de couper.</p>
      <div class="mesures__grille">
        ${champ({ id: 'm-poitrine', libelle: 'Poitrine', type: 'number', attrs: 'inputmode="numeric" min="60" max="180"' })}
        ${champ({ id: 'm-taille', libelle: 'Taille', type: 'number', attrs: 'inputmode="numeric" min="45" max="170"' })}
        ${champ({ id: 'm-hanches', libelle: 'Hanches', type: 'number', attrs: 'inputmode="numeric" min="60" max="190"' })}
        ${champ({ id: 'm-hauteur', libelle: 'Hauteur', type: 'number', facultatif: true, attrs: 'inputmode="numeric" min="120" max="210"' })}
      </div>
      ${coche({ id: 'm-rappel', libelle: 'Je préfère que l’atelier m’appelle pour prendre mes mesures.' })}
    </div>
  </fieldset>`;
};

const etiquette = (m) => `<dl class="etiquette" aria-label="Étiquette">
  <div class="etiquette__ligne"><dt>Référence</dt><dd>${m.ref}</dd></div>
  <div class="etiquette__ligne"><dt>Coupe</dt><dd>${esc(m.coupe)}</dd></div>
  <div class="etiquette__ligne"><dt>Matière</dt><dd class="t-doux">À confirmer par l’atelier</dd></div>
  ${m.sansTaille ? '' : `<div class="etiquette__ligne"><dt>Tailles</dt><dd>${m.tailleUnique ? 'Taille unique' : `${m.tailles[0]} à ${m.tailles.at(-1)}, ou sur mesures`}</dd></div>`}
  <div class="etiquette__ligne"><dt>Confection</dt><dd>${delai(m.delai)}, à Cocody</dd></div>
  <div class="etiquette__ligne"><dt>Entretien</dt><dd class="t-doux">À confirmer par l’atelier</dd></div>
</dl>`;

export default {
  cle: 'boutique',
  titre: (id) => parId(id)?.nom || introuvable.titre(),
  rendu: (id) => {
    const m = parId(id);
    if (!m) return introuvable.rendu();
    const fam = familles.find((f) => f.id === m.famille);
    const v0 = m.versions[0];
    const autres = boutique.filter((x) => x.id !== m.id).sort((a, b) => (b.famille === m.famille) - (a.famille === m.famille)).slice(0, 6);
    const livraisonDes = dateLongue(ajouterJours(new Date(), m.delai[1] + 1));
    return `<nav aria-label="Fil d’Ariane"><ol class="fil-ariane">
      <li><a href="#/boutique">Boutique</a></li>
      ${fam ? `<li><a href="#/boutique/${fam.id}">${fam.libelle}</a></li>` : '<li><a href="#/offrir">Offrir</a></li>'}
      <li aria-current="page"><span>${esc(m.nom)}</span></li></ol></nav>
    <article class="fiche" data-id="${m.id}">
      <div class="fiche__corps">
        <div data-zone-galerie>${galerie(m, v0.id)}</div>
        <div class="fiche__info">
          <header class="fiche__entete">
            ${badgeDe(m) ? `<div>${badgeDe(m)}</div>` : ''}
            <h1 class="t-produit" data-titre-fiche>${esc(m.nom)}</h1>
            ${blocPrix(m)}
            ${m.promo ? `<p class="t-petit t-doux">Offre de lancement Iconic, ${m.promo.jusqua}.</p>` : ''}
            <p class="fiche__ref">Réf. ${m.ref}</p>
          </header>
          <p class="fiche__delai">${icone('aiguille')}<span>Confectionnée en ${delai(m.delai)} à l’atelier. Livraison possible vers le ${livraisonDes} si vous commandez aujourd’hui.</span></p>
          ${m.versions.length > 1 ? `<div class="bloc"><p class="t-h3">Couleur : <span data-version-nom>${v0.libelle}</span></p>
            <div class="versions" role="group" aria-label="Choisir une couleur">${m.versions.map((v, i) => `<button type="button" class="version" data-version="${v.id}" aria-pressed="${i === 0}" aria-label="${v.libelle}"><div class="media"><img src="${v.images[0].src}" alt=""></div></button>`).join('')}</div></div>` : ''}
          ${blocTaille(m)}
          <div class="bloc" data-zone-achat>
            <button type="button" class="bouton bouton--principal bouton--plein" data-ajouter>${roule('Ajouter à ma commande')}</button>
            <a class="whatsapp lien" href="${lienWhatsApp(`Bonjour Lacouture, une question sur le modèle ${m.nom} (réf. ${m.ref}).`)}" target="_blank" rel="noopener">${glypheWhatsApp}<span>Une question ? Écrire à l’atelier sur WhatsApp</span></a>
          </div>
          <ul class="engagements" aria-label="Nos engagements">
            <li class="engagement">${icone('aiguille')}<span>Coupée et cousue dans notre atelier de Cocody</span></li>
            <li class="engagement">${icone('regle')}<span>En taille standard ou sur vos mesures</span></li>
            <li class="engagement">${icone('calendrier')}<span>Paiement après confirmation de l’atelier, rien n’est payé en ligne</span></li>
            <li class="engagement">${icone('camion')}<span>Livraison à Abidjan, hors Abidjan, ou retrait à l’atelier</span></li>
          </ul>
          ${etiquette(m)}
          ${accordeon([
            { titre: 'Coupe et détails', contenu: `<p>${esc(m.coupe)}</p>` },
            { titre: 'Tissus et imprimés', contenu: `<blockquote class="t-italique">« ${esc(marque.substitution)} »</blockquote><p class="t-petit t-doux">Règle annoncée par Lacouture sur Instagram.</p>` },
            { titre: 'Livraison et retrait', contenu: `<ul class="regles">${demoLivraison.map((l) => `<li><span>${l.libelle} : ${l.prix ? prixTexte(l.prix) : 'gratuit'}. ${l.detail}.</span></li>`).join('')}</ul><p class="encart-demo">Tarifs provisoires, à confirmer par l’atelier.</p>` },
            { titre: 'Paiement', contenu: '<p>Aucun paiement n’est demandé sur ce site. Vous transmettez votre commande, l’atelier la confirme puis vous indique comment régler.</p>' },
          ])}
        </div>
      </div>
      <div class="fiche__suite">${railHtml('titre-suite', 'À porter aussi', autres, { surtitre: 'Dans l’atelier' })}</div>
    </article>
    <div class="barre-achat" data-barre aria-hidden="true">
      <div class="barre-achat__info"><span class="barre-achat__nom">${esc(m.nom)}</span><span class="prix t-petit">${prixTexte(m.prixFinal)}</span></div>
      <button type="button" class="bouton bouton--principal" data-barre-ajouter tabindex="-1">Ajouter</button>
    </div>
    <div class="visionneuse" data-visionneuse role="dialog" aria-modal="true" aria-label="Photos de ${esc(m.nom)}">
      <div class="visionneuse__haut"><span data-visio-compteur></span><button type="button" class="bouton-icone" data-visio-fermer aria-label="Fermer les photos" style="color:var(--ivoire)">${icone('fermer')}</button></div>
      <div class="visionneuse__piste" data-visio-piste></div>
      <p class="visionneuse__bas" data-visio-legende></p>
    </div>`;
  },

  monter(racine, id) {
    const m = parId(id);
    if (!m) return null;
    const off = [];
    const etat = { version: m.versions[0].id, taille: m.sansTaille ? null : m.tailleUnique ? 'unique' : null };
    const bloc = racine.querySelector('[data-bloc-taille]');
    const aide = racine.querySelector('[data-aide-taille]');
    const mesures = racine.querySelector('#bloc-mesures');
    const ajouter = racine.querySelector('[data-ajouter]');

    if (!reduit()) off.push(titreEnLignes(racine.querySelector('[data-titre-fiche]'), { delai: 0.15 }));
    off.push(monterRail(racine));

    /* Galerie : le Fil de progression suit le défilement horizontal. */
    const brancherGalerie = () => {
      const piste = racine.querySelector('[data-galerie-piste]');
      const progres = racine.querySelector('[data-progres]');
      const compteur = racine.querySelector('[data-compteur]');
      const n = piste.children.length;
      if (progres) gsap.set(progres, { scaleX: 1 / n });
      const surDefile = () => {
        const i = Math.round(piste.scrollLeft / piste.clientWidth);
        const r = piste.scrollLeft / Math.max(1, piste.scrollWidth - piste.clientWidth);
        if (progres) gsap.to(progres, { scaleX: 1 / n + r * (1 - 1 / n), duration: 0.3, ease: 'couture', overwrite: true });
        if (compteur) compteur.textContent = `${Math.min(n, i + 1)} / ${n}`;
      };
      piste.addEventListener('scroll', surDefile, { passive: true });
      return () => piste.removeEventListener('scroll', surDefile);
    };
    let debrancher = brancherGalerie();
    off.push(() => debrancher());

    /* Couleurs : la galerie change en fondu, sans déplacer la mise en page. */
    off.push(sur(racine, 'click', '[data-version]', (e, b) => {
      if (b.getAttribute('aria-pressed') === 'true') return;
      $$('[data-version]', racine).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      etat.version = b.dataset.version;
      racine.querySelector('[data-version-nom]').textContent = m.versions.find((v) => v.id === etat.version).libelle;
      presser(b);
      const zone = racine.querySelector('[data-zone-galerie]');
      gsap.to(zone, { opacity: 0, duration: reduit() ? 0 : 0.2, ease: 'couture-sortie', onComplete: () => {
        debrancher(); zone.innerHTML = galerie(m, etat.version); debrancher = brancherGalerie();
        gsap.to(zone, { opacity: 1, duration: reduit() ? 0 : 0.4, ease: 'couture' });
      } });
    }));

    /* Tailles. */
    const choisir = (b) => {
      const ancienne = racine.querySelector('.taille[aria-pressed="true"]');
      if (ancienne === b) return;
      ancienne?.setAttribute('aria-pressed', 'false');
      b.setAttribute('aria-pressed', 'true');
      choisirTaille(b, ancienne); presser(b);
      etat.taille = b.dataset.taille;
      aide.dataset.alerte = 'false';
      const surMesure = etat.taille === 'mesures';
      const etaitOuvert = !mesures.hidden;
      mesures.hidden = !surMesure;
      aide.textContent = surMesure ? 'Indiquez vos mesures ci-dessous, ou demandez à être rappelée.' : `Taille ${etat.taille} choisie.`;
      if (surMesure && !etaitOuvert && !reduit()) gsap.from(mesures.children, { y: -8, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'couture', clearProps: 'all' });
      ScrollTrigger.refresh();
    };
    if (bloc) {
      off.push(sur(bloc, 'click', '[data-taille]', (e, b) => choisir(b)));
      off.push(sur(bloc, 'click', '[data-guide]', (e, b) => ouvrirGuide(b)));
      /* Navigation au clavier entre les cases avec les flèches. */
      off.push(sur(bloc, 'keydown', '[data-taille]', (e, b) => {
        if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
        const cases = $$('[data-taille]', bloc); const i = cases.indexOf(b);
        cases[(i + (e.key === 'ArrowRight' ? 1 : cases.length - 1)) % cases.length].focus();
        e.preventDefault();
      }));
      off.push(sur(mesures, 'change', '#m-rappel', (e, c) => {
        $$('.mesures__grille input', mesures).forEach((i) => { i.disabled = c.checked; poserErreur(i, ''); });
      }));
    }

    const lireMesures = () => {
      if ($('#m-rappel', racine).checked) return { mesures: { rappel: true } };
      const val = (k) => $(`#m-${k}`, racine).value.trim();
      const bornes = { poitrine: [60, 180], taille: [45, 170], hanches: [60, 190], hauteur: [120, 210] };
      let premiere = null;
      const res = {};
      Object.entries(bornes).forEach(([k, [a, b]]) => {
        const input = $(`#m-${k}`, racine); const v = val(k);
        let err = '';
        if (!v && k !== 'hauteur') err = 'Indiquez cette mesure en centimètres.';
        else if (v && (Number(v) < a || Number(v) > b)) err = `Entre ${a} et ${b} cm.`;
        poserErreur(input, err);
        if (err && !premiere) premiere = input;
        if (v) res[k] = Number(v);
      });
      if (premiere) { premiere.focus(); refuser(mesures); return null; }
      return { mesures: res };
    };

    const valider = () => {
      if (m.sansTaille) return {};
      if (m.tailleUnique) { const h = $('#hauteur-unique', racine).value.trim(); return h ? { hauteur: Number(h) } : {}; }
      if (!etat.taille) {
        aide.dataset.alerte = 'true';
        aide.textContent = 'Choisissez une taille, ou « Sur mes mesures ».';
        refuser(racine.querySelector('.tailles'));
        racine.querySelector('[data-taille]').focus();
        return null;
      }
      if (etat.taille === 'mesures') return lireMesures();
      return { taille: etat.taille };
    };

    const ajouterPiece = async (depuis) => {
      const choix = valider();
      if (!choix) return;
      presser(depuis);
      panier.ajouter({ id: m.id, version: m.versions.length > 1 ? etat.version : 'unique', ...choix });
      annoncer(`${m.nom} ajoutée à votre commande.`);
      const img = racine.querySelector('[data-galerie-piste] img');
      const sac = document.querySelector('[data-ouvrir-panier]');
      await envoler(img, sac);
      ouvrirPanier(depuis);
    };
    ajouter.addEventListener('click', () => ajouterPiece(ajouter));

    /* Barre d'achat fixe (mobile) : elle apparaît quand le bouton principal sort de l'écran. */
    const barre = racine.querySelector('[data-barre]');
    const bAjout = barre.querySelector('[data-barre-ajouter]');
    const montrer = (oui) => {
      barre.setAttribute('aria-hidden', String(!oui));
      bAjout.tabIndex = oui ? 0 : -1;
      gsap.to(barre, { yPercent: oui ? 0 : 101, autoAlpha: oui ? 1 : 0, duration: reduit() ? 0 : 0.4, ease: oui ? 'couture' : 'couture-sortie', overwrite: true });
    };
    gsap.set(barre, { yPercent: 101, autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: racine.querySelector('[data-zone-achat]'), start: 'bottom top+=64', endTrigger: racine.querySelector('.fiche__suite'), end: 'top bottom',
      onToggle: (st) => montrer(st.isActive),
    });
    bAjout.addEventListener('click', () => {
      if (!m.sansTaille && !m.tailleUnique && !etat.taille) {
        racine.querySelector('[data-zone-achat]').closest('.fiche__info').querySelector('.bloc[data-bloc-taille]').scrollIntoView({ behavior: reduit() ? 'auto' : 'smooth', block: 'center' });
        setTimeout(() => valider(), reduit() ? 0 : 450);
        return;
      }
      ajouterPiece(bAjout);
    });

    off.push(sur(racine, 'click', '.accordeon__bouton', (e, b) => { basculer(b); ScrollTrigger.refresh(); }));

    /* Visionneuse plein écran. */
    const visio = racine.querySelector('[data-visionneuse]');
    const vPiste = visio.querySelector('[data-visio-piste]');
    let origine = null;
    const fermerVisio = () => {
      gsap.to(visio, { autoAlpha: 0, duration: reduit() ? 0 : 0.3, ease: 'couture-sortie', onComplete: () => { document.body.classList.remove('verrou'); origine?.focus(); } });
    };
    off.push(sur(racine, 'click', '[data-agrandir]', (e, b) => {
      origine = b;
      const imgs = vues(m, etat.version);
      vPiste.innerHTML = imgs.map((im) => `<figure><img src="${im.src}" alt="${esc(im.alt)}"></figure>`).join('');
      const maj = () => {
        const i = Math.round(vPiste.scrollLeft / Math.max(1, vPiste.clientWidth));
        visio.querySelector('[data-visio-compteur]').textContent = `${i + 1} / ${imgs.length}`;
        visio.querySelector('[data-visio-legende]').textContent = imgs[i]?.alt || '';
      };
      vPiste.onscroll = maj;
      document.body.classList.add('verrou');
      gsap.to(visio, { autoAlpha: 1, duration: reduit() ? 0 : 0.35, ease: 'couture' });
      gsap.fromTo(vPiste, { scale: 0.96 }, { scale: 1, duration: reduit() ? 0 : 0.6, ease: 'couture' });
      vPiste.scrollLeft = vPiste.clientWidth * Number(b.dataset.agrandir);
      maj();
      requestAnimationFrame(() => { vPiste.scrollLeft = vPiste.clientWidth * Number(b.dataset.agrandir); maj(); visio.querySelector('[data-visio-fermer]').focus(); });
    }));
    visio.addEventListener('click', (e) => { if (e.target.closest('[data-visio-fermer]') || e.target === vPiste || e.target.tagName === 'FIGURE') fermerVisio(); });
    visio.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') fermerVisio();
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') vPiste.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * vPiste.clientWidth });
      piegerFocus(visio, e);
    });

    return () => { off.forEach((f) => f && f()); document.body.classList.remove('verrou'); };
  },
};
