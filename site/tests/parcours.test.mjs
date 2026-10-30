/* Parcours complet dans Chromium : accueil → boutique → fiche → panier → commande →
   confirmation, puis les pages secondaires. Échoue sur toute erreur de console.
   Les captures sont écrites dans tests/captures/ (non versionnées).
   Lancer avec NODE_PATH="$(npm root -g)" si Playwright n'est pas installé localement. */
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

/* Playwright est préinstallé globalement : require() respecte NODE_PATH, import ne le fait pas. */
const { chromium } = createRequire(import.meta.url)('playwright');
const ici = path.dirname(fileURLToPath(import.meta.url));
const url = pathToFileURL(path.join(ici, '../dist/lacouture.html')).href;
const dossier = path.join(ici, 'captures');
mkdirSync(dossier, { recursive: true });

const largeurs = { mobile: [390, 844], tablette: [768, 1024], bureau: [1440, 900] };
const erreurs = [];
const pause = (ms) => new Promise((r) => setTimeout(r, ms));

async function page(navigateur, [w, h], options = {}) {
  const ctx = await navigateur.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, ...options });
  const p = await ctx.newPage();
  p.on('console', (m) => { if (m.type() === 'error') erreurs.push(`${w}px · ${m.text()}`); });
  p.on('pageerror', (e) => erreurs.push(`${w}px · ${e.message}`));
  return p;
}
async function aller(p, hash) {
  await p.evaluate((h) => { location.hash = h; }, hash);
  await pause(1300);
}
async function capture(p, nom, plein = false) {
  await p.screenshot({ path: path.join(dossier, `${nom}.png`), fullPage: plein });
}
/* Fait défiler la page pour déclencher les apparitions avant une capture pleine page. */
async function parcourir(p) {
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
    window.scrollTo(0, 0);
  });
  await pause(1500);
}

const navigateur = await chromium.launch();
const vues = ['', 'boutique', 'collection/iconic', 'modele/robe-licou-volants', 'offrir', 'sur-mesure', 'realisations', 'maison', 'aide', 'commande', 'confirmation', 'introuvable', 'nimporte-quoi'];

try {
  for (const [nom, taille] of Object.entries(largeurs)) {
    const p = await page(navigateur, taille);
    await p.goto(url);
    await pause(3200); /* intro */
    await capture(p, `${nom}-accueil-ecran`);
    for (const v of vues) {
      await aller(p, `#/${v}`);
      const h1 = await p.locator('main h1').first().textContent();
      assert.ok(h1 && h1.trim().length > 2, `h1 manquant sur #/${v} (${nom})`);
      if (nom !== 'tablette' || ['', 'modele/robe-licou-volants', 'commande'].includes(v)) {
        await parcourir(p);
        await capture(p, `${nom}-${v.replace(/\//g, '_') || 'accueil'}`, true);
      }
    }
    await p.context().close();
  }

  /* Parcours d'achat sur mobile */
  const p = await page(navigateur, largeurs.mobile);
  await p.goto(`${url}#/modele/robe-licou-volants`);
  await pause(2500);
  await p.click('[data-ajouter]');
  await pause(400);
  assert.equal(await p.locator('[data-aide-taille]').isVisible(), true, 'l’erreur de taille doit apparaître');
  await p.click('[data-taille="M"]');
  await p.click('[data-ajouter]');
  await pause(1400);
  assert.equal(await p.locator('#panneau-commande').isVisible(), true, 'le panneau commande doit s’ouvrir');
  await capture(p, 'mobile-panier');
  await p.click('#panneau-commande a[href="#/commande"]');
  await pause(1500);
  await p.click('[data-form] button[type="submit"]');
  await pause(500);
  assert.ok(await p.locator('[data-erreurs]').isVisible(), 'le résumé des erreurs doit apparaître');
  await capture(p, 'mobile-commande-erreurs');
  await p.fill('#nom', 'Awa Koné');
  await p.fill('#telephone', '0701020304');
  await p.selectOption('#commune', 'Cocody');
  await p.fill('#quartier', 'Riviera 3');
  await p.click('[data-form] button[type="submit"]');
  await pause(2500);
  assert.ok((await p.evaluate(() => location.hash)).startsWith('#/confirmation'), 'la confirmation doit s’afficher');
  const texte = await p.locator('main').textContent();
  assert.ok(/N°\s*provisoire/i.test(texte), 'le numéro doit être présenté comme provisoire');
  assert.ok(!/paiement (réussi|effectué|accepté)/i.test(texte), 'aucun paiement ne doit être simulé');
  await capture(p, 'mobile-confirmation', true);
  await p.context().close();

  /* Mouvement réduit : tout le contenu reste visible, aucune animation bloquante */
  const r = await page(navigateur, largeurs.bureau, { reducedMotion: 'reduce' });
  await r.goto(url);
  await pause(800);
  await capture(r, 'reduit-accueil');
  const masques = await r.evaluate(() => [...document.querySelectorAll('main h1, main h2, main img:not(.carte__dos)')].filter((e) => getComputedStyle(e).opacity === '0').length);
  assert.equal(masques, 0, 'aucun élément ne doit rester masqué en mouvement réduit');
  await r.context().close();

  /* Clavier : le lien d'évitement est le premier arrêt */
  const k = await page(navigateur, largeurs.bureau);
  await k.goto(url);
  await pause(3200);
  await k.keyboard.press('Tab');
  const premier = await k.evaluate(() => document.activeElement?.className);
  assert.match(premier || '', /evitement/, 'le premier Tab doit atteindre le lien d’évitement');
  await k.context().close();

  assert.deepEqual(erreurs, [], `erreurs de console :\n${erreurs.join('\n')}`);
  console.log('Parcours OK, captures dans tests/captures/');
} finally {
  await navigateur.close();
}
