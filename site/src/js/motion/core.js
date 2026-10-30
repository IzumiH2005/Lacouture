/* Socle du mouvement. Une seule courbe de marque (G.4) et trois durées fonctionnelles ;
   les moments expressifs (ouverture, couverture, confirmation) ont des durées plus longues. */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, SplitText, Flip, DrawSVGPlugin, CustomEase);

CustomEase.create('couture', '0.2,0,0,1');            /* motion.easing du dossier */
CustomEase.create('couture-sortie', '0.4,0,1,1');      /* départs : accélère, ne freine pas */
CustomEase.create('elan', 'M0,0 C0.3,0 0.25,-0.12 0.42,-0.08 0.6,-0.03 0.62,1 1,1'); /* anticipation : petit recul avant l'élan */

gsap.defaults({ ease: 'couture', duration: 0.25 });
ScrollTrigger.config({ ignoreMobileResize: true });

export const D = { rapide: 0.15, base: 0.25, lent: 0.4, ample: 0.9, scene: 1.2 };

const mqReduit = window.matchMedia('(prefers-reduced-motion: reduce)');
const mqFin = window.matchMedia('(hover: hover) and (pointer: fine)');
export const reduit = () => mqReduit.matches;
export const pointeurFin = () => mqFin.matches;

/* Durée effective : quasi nulle quand l'utilisatrice a demandé moins d'animations. */
export const duree = (d) => (reduit() ? 0.001 : d);

export { gsap, ScrollTrigger, SplitText, Flip };
