# Site Lacouture

Site e-commerce de Lacouture, compilé en **un seul fichier HTML autonome** : `dist/lacouture.html`.
Il s'ouvre tel quel dans un navigateur, en local ou en ligne, sans serveur. Les polices,
les photos, le logo et le code y sont intégrés.

La référence de conception est `docs/dossier-conception.md`. Le logo vient de `brand/logo/`.

## Commandes

```bash
npm install
npm run build   # écrit dist/lacouture.html
npm run lint    # ESLint sur src, build.mjs et tests
NODE_PATH="$(npm root -g)" npm test   # parcours complet dans Chromium (Playwright)
```

Le test parcourt toutes les pages à 390, 768 et 1440 px, passe une commande de bout en bout
(erreur de taille, panier, erreurs du formulaire, confirmation), vérifie le mouvement réduit
et l'accès clavier, et échoue sur toute erreur de console. Les captures vont dans
`tests/captures/` (non versionné).

## Organisation

- `src/styles/tokens.css` porte toutes les valeurs de la charte (couleurs, typographie,
  espacements, durées). Les autres feuilles n'utilisent que ces jetons.
- `src/js/data/marque.js` contient **uniquement des faits fournis** par Lacouture.
- `src/js/data/demo.js` contient **toutes les données de démonstration**. Le drapeau `DEMO`
  affiche un bandeau sur le site.
- `src/js/motion/` regroupe GSAP : courbes maison, ouverture, couverture, apparitions,
  micro-interactions et étiquette de confirmation.
- `src/js/views/` contient une vue par page. Le routeur (`router.js`) monte chaque vue dans
  un `gsap.context` et nettoie animations et ScrollTrigger à chaque navigation.

## Données de démonstration à remplacer

Aucune de ces valeurs n'a été fournie par Lacouture :

- prix, références, délais de confection et tailles par modèle ;
- la promotion −35 % d'Iconic, annoncée en décembre 2025 mais dont la validité actuelle est inconnue ;
- les modes et frais de livraison, ainsi que les frais par commune d'Abidjan ;
- le guide des tailles en centimètres ;
- la retouche offerte sous 7 jours ;
- le délai de préparation de la box et son contenu ;
- le numéro WhatsApp : seul le lien `wa.me/message/…` est connu. Tant que `marque.whatsapp.numero`
  est vide, le message de commande ne peut pas être prérempli ; le site le copie dans le
  presse-papiers et l'explique à la cliente.

Les champs « Matière » et « Entretien » des fiches affichent « À confirmer par l'atelier ».

Les photos sont des **placeholders en basse définition**, découpées dans des captures
Instagram par `scripts/photos.py`. Elles doivent être remplacées par les fichiers d'origine.
Les photos de l'atelier, de la créatrice et des clientes (avec leur accord) manquent encore.

## Paiement et commande

Le site **n'encaisse rien** et ne simule aucun paiement. La commande est préparée dans le
navigateur (panier et brouillon en `localStorage`), puis la cliente l'envoie à l'atelier sur
WhatsApp. Le numéro affiché est un « N° provisoire » généré localement. La page de
confirmation dit clairement que rien n'a été payé et que la commande n'est reçue qu'une fois
le message envoyé. Aucun prestataire de paiement n'est branché et aucun backend n'a été écrit.

## Écarts avec le dossier de conception

1. **Mouvement au défilement.** Le dossier (C.9) exclut parallaxe et animations au défilement ;
   la mission demande GSAP et ScrollTrigger, et la maquette de référence en use largement.
   Le site garde des apparitions uniques (`once`) et des titres en lignes masquées, et ajoute
   quelques effets liés au défilement : la photo de couverture glisse (pointeur fin seulement), le manifeste se
   colore mot à mot, la photo de la Box se resserre. Tout disparaît en mouvement réduit.
2. **Bouton de commande.** D.7 prévoit « Payer 47 000 FCFA » et la maquette de référence
   ajoute une étape de paiement (Wave, Orange Money, MTN). Le paiement étant hors périmètre,
   la commande compte trois étapes (Infos, Livraison, Envoi) et le bouton devient « Préparer
   ma commande », avec un total indiqué comme indicatif.
3. **Délai de réponse.** D.9 annonce une réponse « sous 48 h » pour le sur-mesure. Ce délai
   n'a pas été donné par Lacouture, il n'est donc promis nulle part.
4. **Rose du logo.** Le site utilise le Rose Poudre de la charte (`#E6C3D3`) ; le SVG d'origine
   est en `#EEC6DA`. L'écart est invisible à l'œil, le fichier du logo n'a pas été modifié.
5. **Transform et opacité.** Toutes les animations n'animent que `transform` et `opacity`, à
   une exception près : le tracé du monogramme à l'ouverture anime `stroke-dashoffset`
   via DrawSVG, sur un seul petit SVG.
6. **Réalisations.** Le dossier prévoit des photos de clientes avec prénom et occasion. Faute
   de ces informations, la galerie montre les publications de la maison avec des légendes
   descriptives, sans prénom inventé.
7. **Étiquette de confirmation.** La maquette de référence affiche « Commande confirmée » et
   « Payée via Wave ». Ici l'étiquette porte un « N° provisoire » et rappelle que la commande
   reste à envoyer sur WhatsApp, puisque rien n'est payé ni transmis automatiquement.
8. **Fuchsia.** Comme le veut la charte, le fuchsia reste rare : bouton de commande, étape en
   cours et bouton d'envoi WhatsApp.
9. **Photo de couverture en noir et blanc.** La couverture passe la photo en niveaux de gris
   pour que le texte crème reste lisible, comme dans la maquette de référence.
10. **Textes.** Le site reprend les rares textes publiés par Lacouture (bio Instagram, story
    « About us », publications Box et Iconic) au lieu d'en écrire de nouveaux. Les textes
    d'interface restent courts.

## Accessibilité

Navigation complète au clavier (lien d'évitement, pièges de focus dans les panneaux, flèches
dans les tailles et la visionneuse, Échap), focus déplacé sur le titre à chaque page, messages
annoncés aux lecteurs d'écran, erreurs de formulaire reliées aux champs avec résumé cliquable,
cibles tactiles de 44 px, contraste AA sur les couleurs de texte. `prefers-reduced-motion`
supprime l'ouverture et les animations.
