import { marque } from '../data/marque.js';

/* Avec un numéro configuré, le message part prérempli. Sinon on ouvre le lien
   court officiel et on copie le message pour que la cliente le colle. */
export function lienWhatsApp(message) {
  const n = marque.whatsapp.numero;
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(message)}` : marque.whatsapp.lien;
}
export const messagePrerempli = () => Boolean(marque.whatsapp.numero);

export async function copier(texte) {
  try {
    await navigator.clipboard.writeText(texte);
    return true;
  } catch {
    const zone = document.createElement('textarea');
    zone.value = texte; zone.setAttribute('readonly', ''); zone.style.position = 'fixed'; zone.style.opacity = '0';
    document.body.append(zone); zone.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    zone.remove();
    return ok;
  }
}
