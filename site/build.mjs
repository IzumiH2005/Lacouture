/**
 * Compile le site en UN fichier HTML autonome : dist/lacouture.html.
 * JS (GSAP compris) et CSS sont regroupés par esbuild, puis injectés dans src/index.html.
 * Polices et photos sont embarquées en data URI : le fichier fonctionne hors ligne, même ouvert en file://.
 */
import { build } from 'esbuild';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ici = path.dirname(fileURLToPath(import.meta.url));
const logos = path.resolve(ici, '../brand/logo');

/* Le logo n'est jamais redessiné : on lit les tracés des fichiers de marque. */
const extraire = (svg) => [...svg.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);
const pluginLogo = {
  name: 'logo',
  setup(b) {
    b.onResolve({ filter: /^virtual:logo$/ }, () => ({ path: 'logo', namespace: 'logo' }));
    b.onLoad({ filter: /.*/, namespace: 'logo' }, async () => {
      const [complet, plein, trait] = await Promise.all(
        ['lacouture-logo-noir.svg', 'lacouture-monogramme-noir.svg', 'lacouture-monogramme-trait.svg']
          .map((f) => readFile(path.join(logos, f), 'utf8')),
      );
      const [, mot] = extraire(complet);
      const donnees = {
        mot, // wordmark seul, boîte mesurée sur le tracé : x -166.34, y 138.35, 333.52 × 30
        motViewBox: '-166.34 138.35 333.52 30',
        monogramme: extraire(plein)[0],
        traits: extraire(trait),
        monoViewBox: '-140 -140 280 280',
      };
      return { contents: `export default ${JSON.stringify(donnees)};`, loader: 'js' };
    });
  },
};

async function compiler() {
  const commun = { bundle: true, minify: true, write: false, logLevel: 'warning', legalComments: 'none' };
  const [js, css] = await Promise.all([
    build({ ...commun, entryPoints: [path.join(ici, 'src/js/main.js')], format: 'iife', target: ['es2020', 'safari14'], loader: { '.jpg': 'dataurl' }, plugins: [pluginLogo] }),
    build({ ...commun, entryPoints: [path.join(ici, 'src/styles/main.css')], loader: { '.woff2': 'dataurl' }, target: ['safari14', 'chrome90'] }),
  ]);
  const gabarit = await readFile(path.join(ici, 'src/index.html'), 'utf8');
  const code = js.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
  const styles = css.outputFiles[0].text.replace(/<\/style/gi, '<\\/style');
  const favicon = await faviconSvg();
  const html = gabarit
    .replace('/*STYLES*/', () => styles)
    .replace('/*SCRIPT*/', () => code)
    .replace('%FAVICON%', () => favicon);
  await mkdir(path.join(ici, 'dist'), { recursive: true });
  const sortie = path.join(ici, 'dist/lacouture.html');
  await writeFile(sortie, html);
  console.log(`dist/lacouture.html · ${(Buffer.byteLength(html) / 1024).toFixed(0)} Ko`);
}

/* Favicon : le monogramme en Rose Poudre sur Encre (C.7). */
async function faviconSvg() {
  const svg = await readFile(path.join(logos, 'lacouture-monogramme-noir.svg'), 'utf8');
  const d = extraire(svg)[0];
  const icone = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-180 -180 360 360"><rect x="-180" y="-180" width="360" height="360" fill="#16120F"/><path fill="#E8C5D4" d="${d}"/></svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(icone);
}

await compiler();
