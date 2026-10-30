/* Le logo réel, lu dans brand/logo/*.svg au moment de la compilation (plugin virtual:logo).
   Les tracés ne sont jamais modifiés ; seule la couleur change, via currentColor. */
import logo from 'virtual:logo';

export const motSvg = (titre = 'Lacouture') =>
  `<svg viewBox="${logo.motViewBox}" role="img" aria-label="${titre}" focusable="false"><path fill="currentColor" d="${logo.mot}"/></svg>`;

export const monogrammeSvg = (titre = '') =>
  `<svg viewBox="${logo.monoViewBox}" ${titre ? `role="img" aria-label="${titre}"` : 'aria-hidden="true"'} focusable="false"><path fill="currentColor" d="${logo.monogramme}"/></svg>`;

/* Monogramme en deux couches : le tracé (16 traits) puis l'aplat, pour l'ouverture et le sceau. */
export const monogrammeTrace = () =>
  `<svg viewBox="${logo.monoViewBox}" aria-hidden="true" focusable="false"><g class="trait">${logo.traits.map((d) => `<path d="${d}"/>`).join('')}</g><path class="plein" d="${logo.monogramme}"/></svg>`;
