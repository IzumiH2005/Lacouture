/* Accueil (C.8) : la Couverture, les pièces, le déroulé, les familles, le Noir de la Box,
   l'appel au sur-mesure et la bande d'archives. */
import { boutique, collections, parId } from '../data/catalogue.js';
import { img } from '../data/images.js';
import { marque } from '../data/marque.js';
import { carte } from '../ui/card.js';
import { roule, lienFleche } from '../ui/button.js';
import { icone } from '../ui/icons.js';
import { lettres, couverture } from '../motion/hero.js';
import { ouverture } from '../motion/intro.js';
import { gsap, ScrollTrigger, reduit } from '../motion/core.js';
import { titreEnLignes } from '../motion/reveal.js';
import { demoPromo } from '../data/demo.js';
import { esc, sur } from '../util/dom.js';

const iconic = collections.iconic;

export function railHtml(id, titre, modeles, { surtitre = '', lien = '' } = {}) {
  return `<section class="section" aria-labelledby="${id}">
    <div class="conteneur tete tete--ligne">
      <div class="tete">${surtitre ? `<p class="surtitre t-surtitre">${surtitre}</p>` : ''}<h2 class="t-h1" id="${id}" data-titre>${titre}</h2></div>
      <div class="rail__commandes" aria-hidden="true">
        <button type="button" class="bouton-icone" data-rail="-1" tabindex="-1">${icone('gauche')}</button>
        <button type="button" class="bouton-icone" data-rail="1" tabindex="-1">${icone('droite')}</button>
      </div>
    </div>
    <div class="rail"><ul class="rail__piste" data-piste>${modeles.map((m) => `<li>${carte(m)}</li>`).join('')}</ul></div>
    ${lien ? `<div class="conteneur" style="margin-top:var(--s-5)">${lien}</div>` : ''}
  </section>`;
}

/* Boutons précédent/suivant d'un rail (desktop), désactivés aux extrémités. */
export function monterRail(racine) {
  const pistes = [...racine.querySelectorAll('[data-piste]')];
  const nettoyages = pistes.map((piste) => {
    const sec = piste.closest('section');
    const [g, d] = sec.querySelectorAll('[data-rail]');
    const etat = () => {
      if (!g) return;
      g.disabled = piste.scrollLeft < 8;
      d.disabled = piste.scrollLeft + piste.clientWidth > piste.scrollWidth - 8;
    };
    const off = sur(sec, 'click', '[data-rail]', (e, b) => {
      const pas = piste.firstElementChild.getBoundingClientRect().width + 24;
      piste.scrollBy({ left: Number(b.dataset.rail) * pas * 2, behavior: reduit() ? 'auto' : 'smooth' });
    });
    piste.addEventListener('scroll', etat, { passive: true });
    etat();
    return () => { off(); piste.removeEventListener('scroll', etat); };
  });
  return () => nettoyages.forEach((f) => f());
}

export default {
  cle: 'accueil',
  titre: () => 'Tenues confectionnées à Abidjan',
  rendu: () => {
    const soiree = parId('robe-rouge-plissee'); const boubous = parId('kaftan-bandes');
    return `
    <section class="couverture" aria-labelledby="titre-couverture">
      <div class="couverture__media"><img src="${iconic.image}" alt="${esc(iconic.alt)}" fetchpriority="high"></div>
      <h1 class="couverture__titre t-couverture" id="titre-couverture"><span class="visuellement-cache">Collection Iconic</span>${lettres('ICONIC')}</h1>
      <div class="couverture__texte">
        <p class="surtitre t-surtitre">Collection · ${iconic.periode}</p>
        <p class="couverture__faits">Des pièces confectionnées dans notre atelier de Cocody, à votre taille ou sur vos mesures.</p>
        ${demoPromo.active ? `<p class="couverture__offre t-petit">${demoPromo.libelle} sur toute la collection, offre de lancement ${demoPromo.jusqua}.</p>` : ''}
        ${lienFleche('#/collection/iconic', 'Découvrir la collection')}
      </div>
    </section>

    ${railHtml('titre-pieces', 'Les pièces de l’atelier', boutique, { surtitre: 'À commander', lien: lienFleche('#/boutique', 'Voir toute la boutique') })}

    <section class="section fond-doux" aria-labelledby="titre-etapes">
      <div class="conteneur">
        <div class="tete"><p class="surtitre t-surtitre">Comment ça se passe</p><h2 class="t-h1" id="titre-etapes" data-titre>Une commande, trois temps.</h2></div>
        <ol class="etapes" data-etapes>
          <li class="etapes__fil" aria-hidden="true"><span class="fil"></span></li>
          <li class="etape" data-reveler><span class="etape__num" aria-hidden="true">01</span><h3 class="t-h3">Vous choisissez</h3><p class="t-doux">Un modèle et sa taille, de XS à 2XL ou plus. Ou vos propres mesures, si vous préférez.</p></li>
          <li class="etape" data-reveler><span class="etape__num" aria-hidden="true">02</span><h3 class="t-h3">L’atelier confirme</h3><p class="t-doux">Vous transmettez votre commande sur WhatsApp. L’atelier vous confirme le délai, le tissu et le paiement.</p></li>
          <li class="etape" data-reveler><span class="etape__num" aria-hidden="true">03</span><h3 class="t-h3">Votre pièce est confectionnée</h3><p class="t-doux">Elle est coupée et cousue à Cocody, puis livrée ou retirée à l’atelier.</p></li>
        </ol>
      </div>
    </section>

    <section class="section" aria-labelledby="titre-familles">
      <div class="conteneur">
        <div class="tete"><p class="surtitre t-surtitre">Par famille</p><h2 class="visuellement-cache" id="titre-familles">Familles de pièces</h2></div>
        <div class="familles">
          <a class="famille famille--grande" href="#/boutique/soiree" data-reveler>
            <div class="media media--34" data-image><img src="${soiree.images[0].src}" alt="${esc(soiree.images[0].alt)}" loading="lazy"></div>
            <span class="famille__titre">Soirée</span><span class="lien-fleche" aria-hidden="true">${roule('Voir les robes')}<span class="lien-fleche__trait"></span></span>
          </a>
          <a class="famille famille--petite" href="#/boutique/boubous" data-reveler>
            <div class="media" data-image><img src="${boubous.images[0].src}" alt="${esc(boubous.images[0].alt)}" loading="lazy"></div>
            <span class="famille__titre">Boubous et kaftans</span><span class="lien-fleche" aria-hidden="true">${roule('Voir les boubous')}<span class="lien-fleche__trait"></span></span>
          </a>
        </div>
      </div>
    </section>

    <section class="noir inverse" aria-labelledby="titre-box">
      <div class="conteneur noir__grille">
        <div class="noir__media"><div class="media" data-image data-voile-encre><img src="${img.boxOuverture}" alt="Deux mains posées sur la box Lacouture, coffret noir au logo rose" loading="lazy"></div></div>
        <div class="noir__texte">
          <p class="surtitre t-surtitre">Offrir</p>
          <h2 class="noir__titre" id="titre-box" data-titre>${esc(marque.box.accroche.split('. ')[0])}.</h2>
          <p>${esc(marque.box.accroche.split('. ')[1])}</p>
          <a class="bouton bouton--inverse" href="#/offrir">${roule('Découvrir la box')}</a>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="titre-mesure">
      <div class="conteneur appel">
        <h2 class="appel__phrase" id="titre-mesure" data-titre>Une pièce coupée d’après vos mesures, pas d’après une grille.</h2>
        ${lienFleche('#/sur-mesure', 'Commander sur mesure')}
      </div>
    </section>

    <section class="section" aria-labelledby="titre-archives">
      <div class="conteneur">
        <div class="tete tete--ligne"><div class="tete"><p class="surtitre t-surtitre">Archives</p><h2 class="t-h1" id="titre-archives" data-titre>Vu sur @${marque.reseaux[0].compte}</h2></div></div>
        <div class="bande">
          ${[[img.portraitNb, 'Portrait en noir et blanc, campagne Iconic'], [img.leopard, 'Ensemble imprimé léopard'], [img.veste, 'Veste à volants sur buste, à l’atelier'], [img.jauneProfil, 'Robe licou à volants, de profil']]
            .map(([s, c]) => `<figure data-reveler><div class="media" data-image><img src="${s}" alt="${esc(c)}" loading="lazy"></div><figcaption>${esc(c)}</figcaption></figure>`).join('')}
        </div>
        <div style="margin-top:var(--s-6)">${lienFleche('#/realisations', 'Voir les réalisations')}</div>
      </div>
    </section>`;
  },
  monter(racine, { premiere } = {}) {
    const nettoyages = [monterRail(racine)];
    const lancerCouverture = () => couverture(racine);
    if (premiere) ouverture().then(lancerCouverture); else lancerCouverture();

    racine.querySelectorAll('[data-titre]').forEach((t) => {
      if (reduit()) return;
      ScrollTrigger.create({ trigger: t, start: 'top 88%', once: true, onEnter: () => nettoyages.push(titreEnLignes(t)) });
    });

    /* Le Fil du déroulé se dessine au rythme du défilement. */
    const fil = racine.querySelector('.etapes__fil .fil');
    if (fil && !reduit()) {
      const vertical = !matchMedia('(min-width: 1024px)').matches;
      gsap.fromTo(fil, { [vertical ? 'scaleY' : 'scaleX']: 0 }, {
        [vertical ? 'scaleY' : 'scaleX']: 1, ease: 'none',
        scrollTrigger: { trigger: '[data-etapes]', start: 'top 75%', end: 'bottom 60%', scrub: 0.5 },
      });
    }
    return () => nettoyages.forEach((f) => f());
  },
};
