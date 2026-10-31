/* Confirmation : l'étiquette tombe au bout de son fil et se balance jusqu'à l'arrêt.
   Rien n'a été payé ni envoyé : la page le dit, donne le numéro provisoire et propose
   d'envoyer la commande à l'atelier sur WhatsApp. */
import { commande } from '../store.js';
import { marque } from '../data/marque.js';
import { monogrammeSvg } from '../ui/logo.js';
import { roule } from '../ui/button.js';
import { icone, glypheWhatsApp } from '../ui/icons.js';
import { annoncer } from '../ui/toast.js';
import { esc, sur, $ } from '../util/dom.js';
import { prix, dateLongue } from '../util/format.js';
import { lienWhatsApp, messagePrerempli, copier } from '../util/whatsapp.js';
import { messageCommande } from '../util/commande.js';
import { gsap, reduit } from '../motion/core.js';

/* Étape 0 faite, étape 1 en cours : c'est à la cliente d'envoyer le message. */
const etapes = [
  ['Commande préparée', 'Sur ce téléphone.'],
  ['Envoyée à l’atelier', 'Par vous, sur WhatsApp.'],
  ['Confirmée par l’atelier', 'Délai, tissu et paiement.'],
  ['En confection', 'À Cocody.'],
  ['Prête', 'Livrée ou retirée.'],
];
const ACTUELLE = 1;

/* Chute de l'étiquette, calculée d'avance à 120 images par seconde.
   1. Chute libre : le fil se déroule avec elle et l'étiquette garde sa légère inclinaison,
      car rien ne la fait tourner tant qu'elle tombe.
   2. Le fil se tend : il agit comme un ressort amorti qui retient l'étiquette, la fait
      remonter un peu, puis la laisse retomber.
   3. Balancier : l'étiquette pivote sur son œillet. Son poids apparent vaut la gravité moins
      l'accélération de l'œillet, donc la secousse du fil relance le balancement, qui s'amortit. */
const FREQ = 120;
const chuteEtiquette = () => {
  const g = 1700; const hauteur = 470;         // px/s², px de chute
  const raideur = 9000; const amortiFil = 110; // fil peu élastique : petit rebond de 5 px
  const bras = 150; const amortiBalancier = 1.5;
  const dt = 1 / FREQ;
  let y = -hauteur; let vy = 0;
  let angle = 0.04; let va = 0.22;             // radians : l'étiquette arrive penchée d'environ 13°
  const etats = [];
  for (let n = 0; n < FREQ * 6; n += 1) {
    const tension = y > 0 ? raideur * y + amortiFil * vy : 0;
    const ay = g - Math.max(0, tension);
    const aa = -((g - ay) / bras) * Math.sin(angle) - amortiBalancier * va;
    vy += ay * dt; y += vy * dt;
    va += aa * dt; angle += va * dt;
    etats.push([y - g / raideur, (angle * 180) / Math.PI]);
    if (n > FREQ && Math.abs(vy) < 0.5 && Math.abs(va) < 0.002 && Math.abs(angle) < 0.002) break;
  }
  /* La dernière seconde ramène en douceur l'étiquette à l'équilibre exact. */
  const fin = Math.min(FREQ, etats.length);
  for (let i = 0; i < fin; i += 1) {
    const k = (fin - i) / fin; const e = etats[etats.length - fin + i];
    e[0] *= k; e[1] *= k;
  }
  return etats;
};

export default {
  cle: null,
  titre: () => 'Votre commande est prête à être envoyée',
  rendu: () => {
    const c = commande.lire();
    if (!c) {
      return `<div class="conteneur introuvable">
        <p class="surtitre t-surtitre">Confirmation</p>
        <h1 class="t-h1">Aucune commande en cours.</h1>
        <p class="mesure t-doux">Seules les commandes préparées sur ce téléphone apparaissent ici.</p>
        <a class="bouton bouton--principal" href="#/boutique">${roule('Voir la boutique')}</a>
      </div>`;
    }
    const prenom = c.client.nom.split(/\s+/)[0];
    const msg = messageCommande(c);
    const [l0] = c.lignes;
    const autres = c.lignes.reduce((n, l) => n + l.quantite, 0) - 1;
    const article = l0 ? `${l0.nom}${l0.detail ? ` · ${l0.detail}` : ''}` : '';
    const [debut, fin] = [c.numero.slice(0, c.numero.lastIndexOf('-')), c.numero.slice(c.numero.lastIndexOf('-'))];
    const lieu = [c.livraison.commune, c.livraison.quartier].filter(Boolean).join(', ');
    return `<div class="merci">
      <section class="merci__scene inverse" aria-label="Étiquette de votre commande">
        <span class="etiq__fil" aria-hidden="true" data-fil></span>
        <div class="etiq" data-etiq>
          <span class="etiq__oeillet" aria-hidden="true"></span>
          <span class="etiq__mono">${monogrammeSvg()}</span>
          <span class="etiq__marque" aria-hidden="true">Lacouture</span>
          <span class="etiq__couture" aria-hidden="true"></span>
          <p class="etiq__libelle">N° provisoire</p>
          <p class="etiq__numero"><span class="visuellement-cache">${esc(c.numero)}</span><span aria-hidden="true">${esc(debut)}</span><span aria-hidden="true">${esc(fin)}</span></p>
          <p class="etiq__article">${esc(article)}${autres > 0 ? `<br>et ${autres} autre${autres > 1 ? 's' : ''} pièce${autres > 1 ? 's' : ''}` : ''}</p>
          <p class="etiq__article">À envoyer sur WhatsApp</p>
          <span class="etiq__lieu" aria-hidden="true">Cocody · Abidjan</span>
        </div>
      </section>

      <div class="conteneur merci__corps">
        <h1 class="merci__titre"><span data-titre-merci>Merci, ${esc(prenom)}.</span></h1>
        <p class="merci__phrase" data-suite>Envoyez votre commande à l’atelier sur WhatsApp. Rien n’a été payé.</p>

        <div class="merci__grille">
          <section aria-labelledby="titre-suivi" class="merci__suivi">
            <h2 class="visuellement-cache" id="titre-suivi">La suite de votre commande</h2>
            <div class="suivi-cadre">
            <span class="suivi__piste" aria-hidden="true"><span class="suivi__rempli" data-rempli></span></span>
            <ol class="suivi">
              ${etapes.map(([t, d], i) => {
                const etat = i < ACTUELLE ? 'fait' : i === ACTUELLE ? 'actuel' : 'avenir';
                return `<li class="suivi__etape" data-etat="${etat}" data-etape>
                  <span class="suivi__point" aria-hidden="true">${etat === 'actuel' ? '<span class="suivi__pouls" data-pouls></span>' : ''}</span>
                  <span class="suivi__texte"><span class="suivi__titre">${t}${etat === 'fait' ? '<span class="visuellement-cache"> (fait)</span>' : ''}${etat === 'actuel' ? '<span class="suivi__etat">À faire</span>' : ''}</span><span class="suivi__desc">${d}</span></span>
                </li>`;
              }).join('')}
            </ol>
            </div>
          </section>

          <div class="merci__cote">
            <div class="encart-sable" data-suite>
              <span class="t-surtitre t-doux">${c.livraison.mode === 'atelier' ? 'Retrait' : 'Livraison'}</span>
              <span>${esc(c.livraison.libelle)}${lieu ? `, ${esc(lieu)}` : ''}</span>
              <span class="t-petit t-doux">Date souhaitée : ${c.date ? dateLongue(new Date(`${c.date}T12:00`)) : 'au plus tôt'}${c.cadeau ? ` · Cadeau pour ${esc(c.cadeau.nom)}` : ''}</span>
              <span class="encart-sable__total"><span class="t-petit t-doux">Montant à régler après confirmation de l’atelier</span><span class="prix">${prix(c.total)}</span></span>
            </div>

            <div class="merci__actions" data-suite>
              <a class="bouton bouton--fuchsia bouton--plein" href="${lienWhatsApp(msg)}" target="_blank" rel="noopener" data-envoyer-wa>
                <span class="bouton__icone" aria-hidden="true">${glypheWhatsApp}</span>${roule('Envoyer sur WhatsApp')}</a>
              <button type="button" class="bouton bouton--plein" data-copier>${icone('copier', 'bouton__icone')}${roule('Copier le message')}</button>
              ${messagePrerempli() ? '' : '<p class="t-petit t-doux">Le message est copié en même temps : collez-le dans la conversation.</p>'}
              <details class="merci__message"><summary class="lien t-petit">Voir le message</summary>
                <pre class="message-wa" data-message>${esc(msg)}</pre></details>
              <p class="t-petit t-doux merci__aide">Une question ? <a class="lien" href="${marque.whatsapp.lien}" target="_blank" rel="noopener">Écrire à l’atelier</a></p>
              <a class="lien t-petit merci__retour" href="#/boutique">Retour à la boutique</a>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  },

  monter(racine) {
    const c = commande.lire();
    if (!c) return null;
    document.documentElement.classList.add('entete-sombre');
    const msg = messageCommande(c);
    const off = [() => document.documentElement.classList.remove('entete-sombre')];

    /* Le trait plein du suivi va du premier point jusqu'à l'étape en cours. */
    const rempli = $('[data-rempli]', racine);
    const points = racine.querySelectorAll('.suivi__point');
    const mesurer = () => {
      if (!rempli || points.length <= ACTUELLE) return;
      const a = points[0].getBoundingClientRect(); const b = points[ACTUELLE].getBoundingClientRect();
      rempli.style.height = `${b.top - a.top}px`;
    };
    mesurer();
    window.addEventListener('resize', mesurer);
    off.push(() => window.removeEventListener('resize', mesurer));

    if (!reduit()) {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      const etiq = $('[data-etiq]', racine);
      const fil = $('[data-fil]', racine);
      const longueurFil = fil.offsetHeight;
      const etats = chuteEtiquette();
      const poser = (i) => {
        const [y, angle] = etats[Math.min(i, etats.length - 1)];
        gsap.set(etiq, { y, rotate: angle, transformOrigin: '50% 11px' });
        gsap.set(fil, { scaleY: Math.max(0, (longueurFil + y) / longueurFil) });
      };
      poser(0);
      const lecture = { i: 0 };
      tl.to(lecture, { i: etats.length - 1, duration: etats.length / FREQ, ease: 'none', onUpdate: () => poser(Math.round(lecture.i)) }, 0)
        .from('[data-titre-merci]', { yPercent: 110, duration: 1.1 }, 1.1)
        .from(racine.querySelectorAll('[data-etape]'), { x: -14, opacity: 0, duration: 0.9, stagger: 0.1 }, 1.35)
        .from(rempli, { scaleY: 0, duration: 1.4, ease: 'expo.inOut' }, 1.5)
        .from(racine.querySelectorAll('[data-suite]'), { y: 18, opacity: 0, duration: 1, stagger: 0.08 }, 1.25);
      gsap.fromTo('[data-pouls]', { scale: 0.6, opacity: 0.9 }, { scale: 1.25, opacity: 0, duration: 1.8, repeat: -1, ease: 'power2.out' });
    }

    const copierMessage = async (b) => {
      const ok = await copier(msg);
      annoncer(ok ? 'Message copié. Collez-le dans la conversation WhatsApp.' : 'La copie a échoué. Ouvrez « Voir le message » et sélectionnez le texte.');
      return b;
    };
    off.push(sur(racine, 'click', '[data-copier]', (e, b) => copierMessage(b)));
    /* Sans numéro configuré, le lien court ne préremplit rien : on copie en même temps. */
    off.push(sur(racine, 'click', '[data-envoyer-wa]', (e, b) => { if (!messagePrerempli()) copierMessage(b); }));
    return () => off.forEach((f) => f());
  },
};
