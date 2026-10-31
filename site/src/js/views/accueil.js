/* Accueil : la couverture ICONIC, le slogan lu mot à mot, le bandeau, la collection en
   quinconce, « About us » en trois points, la Box et l'atelier. Tout le texte vient des
   comptes de Lacouture (marque.js) ; rien n'est rédigé en plus. */
import { collections, parId } from '../data/catalogue.js';
import { img } from '../data/images.js';
import { marque } from '../data/marque.js';
import { carte } from '../ui/card.js';
import { icone } from '../ui/icons.js';
import { lettres, couverture } from '../motion/hero.js';
import { ouverture } from '../motion/intro.js';
import { gsap, ScrollTrigger, reduit } from '../motion/core.js';
import { titreEnLignes } from '../motion/reveal.js';
import { demoPromo } from '../data/demo.js';
import { esc, sur } from '../util/dom.js';

const iconic = collections.iconic;
const LIENS_POINTS = [
  () => lienCaps('#/aide/tailles', 'Guide des tailles'),
  () => `<span class="facon__liens">${lienCaps('#/boutique', 'Nos modèles')}${lienCaps('#/sur-mesure', 'Proposer mon modèle')}</span>`,
  () => '',
];

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

/* Lien en capitales soulignées, avec flèche facultative. */
export const lienCaps = (href, texte, { accent = false, fleche = false } = {}) =>
  `<a class="lien-caps${accent ? ' lien-caps--accent' : ''}" href="${href}"><span>${esc(texte)}${fleche ? icone('droite') : ''}</span></a>`;

/* Surtitre suivi d'un point de couture qui se trace. */
export const surtitreCousu = (texte) =>
  `<div class="cousu" data-monte><span class="t-surtitre">${esc(texte)}</span><span class="couture" data-couture aria-hidden="true"></span></div>`;

/* Le slogan de la bio Instagram, découpé en mots pour la lecture guidée. Les mots entre * sont en italique. */
const MANIFESTE = marque.slogan.replace('sur mesure', '*sur mesure*').replace('à chaque instant', '*à chaque instant*');
const motsManifeste = () => MANIFESTE.split(/(\*[^*]+\*)/).filter(Boolean).flatMap((bout) => {
  const it = bout.startsWith('*');
  return bout.replace(/\*/g, '').trim().split(/\s+/).map((m) => `<span class="mot"${it ? ' data-it' : ''}>${it ? `<em>${m}</em>` : m}</span>`);
}).join(' ').replace(/<\/span> (<span class="mot">[.,;:!?]<\/span>)/g, '</span>$1');

/* Faits annoncés par la maison, sans promesse non fournie. */
const BANDEAU = ['Confection sur mesure', 'Cocody · Abidjan', marque.tailles, 'La matière de votre choix'];

export default {
  cle: 'accueil',
  titre: () => 'Tenues confectionnées à Abidjan',
  rendu: () => {
    const choix = ['robe-drapee-chocolat', 'veste-volants', 'robe-licou-volants', 'robe-rouge-plissee'].map(parId).filter(Boolean);
    const [colA, colB] = [choix.filter((_, i) => i % 2 === 0), choix.filter((_, i) => i % 2 === 1)];
    const bande = BANDEAU.map((f) => `<span>${esc(f)}</span><span class="bandeau__etoile">✦</span>`).join('');
    return `
    <section class="couverture" aria-labelledby="titre-couverture">
      <div class="couverture__media"><img src="${iconic.image}" alt="${esc(iconic.alt)}" fetchpriority="high"></div>
      <div class="couverture__voile" aria-hidden="true"></div>
      <div class="couverture__bas">
        <p class="couverture__meta t-surtitre">${esc(marque.collection.annonce)}</p>
        <h1 class="couverture__titre t-couverture" id="titre-couverture"><span class="visuellement-cache">Collection Iconic</span>${lettres('ICONIC')}</h1>
        <div class="couverture__texte">
          ${demoPromo.active ? `<p class="couverture__offre">${demoPromo.libelle} sur toute la collection <span class="badge badge--demo">offre ${esc(demoPromo.jusqua)}</span></p>` : ''}
          ${lienCaps('#/collection/iconic', 'Découvrir la collection', { fleche: true })}
        </div>
      </div>
      <div class="couverture__defiler" aria-hidden="true"><span>Défiler</span><span class="couverture__piste"><span></span></span></div>
    </section>

    <section class="section manifeste" aria-labelledby="titre-manifeste">
      <div class="conteneur">
        ${surtitreCousu('Lacouture · Abidjan')}
        <h2 class="visuellement-cache" id="titre-manifeste">La maison</h2>
        <p class="manifeste__texte t-manifeste" data-manifeste>${motsManifeste()}</p>
        <p class="manifeste__lieu t-surtitre" data-monte>${esc(marque.activite)}</p>
      </div>
    </section>

    <div class="bandeau inverse" role="note" aria-label="${esc(BANDEAU.join(', '))}">
      <div class="bandeau__piste" aria-hidden="true" data-bandeau><div>${bande}</div><div>${bande}</div></div>
    </div>

    <section class="section collection-accueil" aria-labelledby="titre-collection">
      <div class="conteneur">
        <div class="tete-ligne" data-monte>
          <h2 class="t-h1" id="titre-collection" data-titre>La collection</h2>
          ${lienCaps('#/boutique', 'Tout voir')}
        </div>
        <p class="t-surtitre t-doux" data-monte>Iconic · ${esc(iconic.periode)}</p>
        <div class="quinconce">
          <div class="quinconce__col">${colA.map((m) => carte(m)).join('')}</div>
          <div class="quinconce__col quinconce__col--decalee">${colB.map((m) => carte(m)).join('')}</div>
        </div>
      </div>
    </section>

    <section class="section facons inverse" aria-labelledby="titre-facons">
      <div class="conteneur">
        <p class="t-surtitre facons__surtitre" data-monte>About us</p>
        <h2 class="t-h1 facons__titre" id="titre-facons" data-titre>C’est quoi<br><em>Lacouture&nbsp;?</em></h2>
        <ol class="facons__liste">
          <li class="facons__fil" aria-hidden="true"><span data-fil-facons></span></li>
          ${marque.aPropos.points.map((p, i) => `<li class="facon">
            <span class="cercle" aria-hidden="true" data-cercle>${i + 1}</span>
            <div class="facon__texte" data-monte>
              <h3 class="facon__titre">${esc(p.titre)}</h3>
              <p>${esc(p.texte)}</p>
              ${i === 2 ? `<p class="facon__note t-petit">${esc(marque.substitution)}</p>` : ''}
              ${LIENS_POINTS[i]()}
            </div>
          </li>`).join('')}
        </ol>
      </div>
    </section>

    <section class="box-accueil" aria-labelledby="titre-box">
      <div class="box-accueil__media"><img src="${img.boxMains}" alt="Deux mains posées sur la box noire Lacouture" loading="lazy" data-box-img></div>
      <div class="box-accueil__carte" data-box-carte>
        <p class="t-surtitre t-accent">La Box</p>
        <h2 class="box-accueil__titre" id="titre-box">Offrez-leur <em>une box.</em></h2>
        <p>Faites-leur plaisir autrement.</p>
        ${lienCaps('#/offrir', 'Composer une box', { accent: true })}
      </div>
    </section>

    <section class="section atelier" aria-labelledby="titre-atelier">
      <div class="conteneur">
        ${surtitreCousu('L’atelier')}
        <div class="atelier__duo">
          <div class="atelier__attente" data-monte><span class="badge badge--demo">À fournir</span><span>Photo de l’atelier : mains, mètre ruban, tissus</span></div>
          <div class="media atelier__photo" data-image><img src="${img.kaftanRouille}" alt="Boubou à médaillons rouille porté" loading="lazy"></div>
        </div>
        <h2 class="t-h1 atelier__titre" data-titre>Confection<br><em>sur mesure</em></h2>
        <p class="atelier__texte" data-monte>${esc(marque.lieu)}.</p>
        ${lienCaps('#/maison', 'La Maison')}
      </div>
    </section>`;
  },
  monter(racine, { premiere } = {}) {
    document.documentElement.classList.add('entete-sombre');
    const nettoyages = [() => document.documentElement.classList.remove('entete-sombre')];
    const lancerCouverture = () => couverture(racine);
    if (premiere) ouverture().then(lancerCouverture); else lancerCouverture();

    /* Le bandeau défile en continu, lentement, et s'arrête en mouvement réduit. */
    const bandeau = racine.querySelector('[data-bandeau]');
    if (bandeau && !reduit()) gsap.to(bandeau, { xPercent: -50, repeat: -1, duration: 32, ease: 'none' });

    if (reduit()) return () => nettoyages.forEach((f) => f());

    racine.querySelectorAll('[data-titre]').forEach((t) => {
      ScrollTrigger.create({ trigger: t, start: 'top 88%', once: true, onEnter: () => nettoyages.push(titreEnLignes(t)) });
    });
    racine.querySelectorAll('[data-monte]').forEach((el) => {
      gsap.from(el, { y: 30, opacity: 0, duration: 1.1, ease: 'couture', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
    racine.querySelectorAll('[data-couture]').forEach((el) => {
      gsap.from(el, { scaleX: 0, duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });

    /* Manifeste : chaque mot s'allume au rythme de la lecture. */
    const mots = racine.querySelectorAll('[data-manifeste] .mot');
    gsap.fromTo(mots, { opacity: 0.14 }, {
      opacity: 1, stagger: 0.12, ease: 'none',
      scrollTrigger: { trigger: '[data-manifeste]', start: 'top 80%', end: 'bottom 55%', scrub: 0.6 },
    });

    /* Deux façons : le fil relie les cercles, qui se posent avec un léger dépassement. */
    gsap.from('[data-fil-facons]', { scaleY: 0, ease: 'none', scrollTrigger: { trigger: '.facons__liste', start: 'top 70%', end: 'bottom 70%', scrub: 0.5 } });
    racine.querySelectorAll('[data-cercle]').forEach((c) => {
      gsap.from(c, { scale: 0.4, opacity: 0, duration: 0.9, ease: 'back.out(1.5)', scrollTrigger: { trigger: c, start: 'top 85%', once: true } });
    });

    /* La Box : l'écrin se rapproche, la carte glisse par-dessus. */
    gsap.fromTo('[data-box-img]', { scale: 1.16 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.box-accueil__media', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.from('[data-box-carte]', { y: 70, opacity: 0, duration: 1.2, ease: 'couture', scrollTrigger: { trigger: '[data-box-carte]', start: 'top 95%', once: true } });

    return () => nettoyages.forEach((f) => f());
  },
};
