/* Icônes au trait (C.7) : grille 24 px, trait 1,5 px, terminaisons droites, sans remplissage. */
const P = {
  menu: '<path d="M3 7h18M3 12h18M3 17h12"/>',
  fermer: '<path d="M5.5 5.5l13 13M18.5 5.5l-13 13"/>',
  sac: '<path d="M4.5 8h15l-1 13h-13z"/><path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8"/>',
  fleche: '<path d="M4 12h15M14 7l5 5-5 5"/>',
  retour: '<path d="M20 12H5M10 7l-5 5 5 5"/>',
  chevron: '<path d="M7 10l5 5 5-5"/>',
  gauche: '<path d="M15 6l-6 6 6 6"/>',
  droite: '<path d="M9 6l6 6-6 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  moins: '<path d="M5 12h14"/>',
  regle: '<path d="M3 15.5L15.5 3 21 8.5 8.5 21z"/><path d="M7 11.5l2 2M10 8.5l2 2M13 5.5l2 2"/>',
  calendrier: '<path d="M4 6h16v14H4zM4 10h16M8 3.5V7M16 3.5V7"/>',
  camion: '<path d="M2.5 6h11v10h-11zM13.5 9.5h4l3 3.5V16h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  aiguille: '<path d="M4 20L19 5"/><path d="M17.2 4.2a1.6 1.6 0 1 1 2.6 2.6"/><path d="M19 5c-4 1-9 5-11.5 10"/>',
  coche: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  alerte: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v6M12 15.5v1.5"/>',
  maison: '<path d="M4 10.5L12 4l8 6.5V20H4z"/><path d="M10 20v-5h4v5"/>',
  copier: '<path d="M8 8h12v12H8z"/><path d="M16 8V4H4v12h4"/>',
};
export const icone = (nom, cls = '') => `<svg class="icone ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${P[nom]}</svg>`;

/* Glyphe WhatsApp monochrome, toujours accompagné du mot « WhatsApp ». */
export const glypheWhatsApp = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12.04 2.5a9.43 9.43 0 0 0-8.1 14.26L2.5 21.5l4.86-1.4A9.43 9.43 0 1 0 12.04 2.5zm0 17.2a7.76 7.76 0 0 1-3.96-1.09l-.28-.17-2.88.83.85-2.8-.19-.3a7.77 7.77 0 1 1 6.46 3.53zm4.26-5.8c-.23-.12-1.38-.68-1.6-.76-.21-.08-.37-.12-.52.12-.16.23-.6.76-.73.92-.14.15-.27.17-.5.06-.24-.12-1-.37-1.9-1.17a7.1 7.1 0 0 1-1.31-1.63c-.14-.24 0-.36.1-.48.11-.1.24-.27.36-.41.12-.14.16-.24.24-.4.08-.15.04-.3-.02-.41-.06-.12-.52-1.26-.72-1.72-.19-.45-.38-.39-.52-.4h-.45a.86.86 0 0 0-.62.3c-.21.22-.82.8-.82 1.95s.84 2.27.96 2.42c.12.16 1.65 2.52 4 3.53.56.24 1 .39 1.34.5.56.18 1.08.15 1.48.09.45-.07 1.38-.56 1.58-1.11.2-.55.2-1.02.13-1.11-.06-.1-.21-.16-.45-.27z"/></svg>';
