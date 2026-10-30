# Lacouture · Dossier de conception du site

Stratégie de marque, direction artistique et expérience e-commerce.
Version 1, octobre 2026. Phase de conception : aucun choix technique n'est arrêté dans ce document.

---

## Sommaire

0. [L'essentiel en une page](#0-lessentiel-en-une-page)
1. [A. Diagnostic de Lacouture](#a-diagnostic-de-lacouture)
2. [B. Positionnement digital](#b-positionnement-digital)
3. [C. Direction artistique](#c-direction-artistique)
4. [D. Architecture du site](#d-architecture-du-site)
5. [E. Principes UX](#e-principes-ux)
6. [F. Spécifications responsive](#f-spécifications-responsive)
7. [G. Référentiel de design](#g-référentiel-de-design)
8. [H. Justification des décisions](#h-justification-des-décisions)
9. [Questions à valider avec Lacouture](#9-questions-à-valider-avec-lacouture)

**Sources de l'analyse.** Six captures du compte Instagram `maison.lacouturee` (photo de profil, grille, collection ICONIC, vidéo d'unboxing, deux stories « About us » de juillet 2023). Une recherche publique n'a rien donné sur cette marque : les résultats concernent des homonymes (Lucien Lacouture, couturier montréalais des années 1920, ou d'autres ateliers de Cocody). Aucune information extérieure aux captures n'a donc été utilisée. Les prix, les délais et les volumes ne sont pas visibles : ils restent des questions ouvertes (section 9) et ne sont jamais inventés ici.

---

## 0. L'essentiel en une page

**Lacouture n'est pas une boutique de stock, c'est un atelier de confection.** Sa propre story le dit : « une boutique de confection de vêtements sur mesure ». Chaque tenue est fabriquée après la commande, dans une taille standard (XS à 2XL et plus) ou sur les mesures de la cliente, et le tissu peut être remplacé par une matière équivalente. Ce fait change tout le site : la « disponibilité » d'un modèle devient un **délai de confection**, la taille devient une **décision accompagnée**, et la confirmation de commande devient le **début d'une relation avec l'atelier**.

**Le site doit résoudre trois problèmes.** Il supprime la chaîne capture d'écran, message privé, envoi d'argent puis envoi de la preuve. Il rend explicites les informations aujourd'hui dispersées dans les échanges (prix, délai, tailles, politique tissu). Il donne à la marque une présence cohérente, alors que l'Instagram actuel fait cohabiter quatre identités visuelles différentes.

**Direction artistique recommandée : « Le Salon ».** Le site adopte un fond ivoire chaud, le noir de la box Lacouture pour le texte et les moments forts, et le rose du monogramme utilisé avec parcimonie comme un fil. Les titres utilisent un Didone (dans l'esprit de la couverture ICONIC) et l'interface un sans-serif géométrique (dans l'esprit du logo). Quatre signatures rendent le site reconnaissable : **le Fil** (une ligne rose fine issue du monogramme), **l'Étiquette** (les informations produit présentées comme une étiquette d'atelier), **la Couverture** (chaque collection s'ouvre comme une couverture de magazine) et **le Noir de la Box** (les moments de cadeau et de confirmation reprennent l'emballage).

**Positionnement : une élégance de proximité.** Lacouture se situe au-dessus du prêt-à-porter de masse par la confection et le soin, mais reste une maison accessible et chaleureuse d'Abidjan. Le site ne doit pas jouer au luxe parisien.

**Remises en question principales.** Il faut garder WhatsApp mais le repositionner comme canal de conseil plutôt que de commande. Le modèle « la cliente apporte son propre modèle » ne passe pas par le panier : il devient une demande de devis séparée. La date de l'événement de la cliente devient une information de commande. Les comptes clients, les avis notés, la liste d'envies et la recherche sont inutiles au lancement.

---

## A. Diagnostic de Lacouture

### A.1 Ce que montrent les captures

| Capture | Ce qu'on y voit | Ce que cela révèle |
|---|---|---|
| Photo de profil | Monogramme rose pâle en ligne continue sur fond noir : deux formes en miroir faites de boucles, comme un fil noué. Sous le monogramme, « LACOUTURE » en capitales fines très espacées. | C'est l'actif graphique le plus distinctif de la marque. Le monogramme évoque le fil, la couture et le nœud. |
| Profil | 131 publications, 5 554 abonnées. Catégorie « Vêtements (Marque) ». Bio : « Élégance taillée sur mesure pour chaque femme, à chaque instant. » Lien wa.me, Threads, Facebook « Lacouture Abidjan ». Les stories à la une s'appellent « Réalisations », « À la une », « RÉALISATION » (doublon) et « About us », avec des pictogrammes fuchsia (machine à coudre, cadeau). | La commande passe entièrement par WhatsApp. Le nom public varie : Lacouture_, maison.lacouturee, Lacouture Abidjan. Les à la une manquent de rigueur (doublon, casse irrégulière, anglais). |
| Grille récente | Ensemble deux pièces en résille imprimée léopard porté en intérieur rose. Veste à volants brun et crème sur buste noir avec étiquette Lacouture. Robe rouge à manches évasées et taille smockée sur buste noir, fond blanc. Box noire au logo rose. Visuel promotionnel « Faites-leur plaisir autrement. Offrez-leur une box » en caractères condensés blanc et fuchsia. Boubous et kaftans (blanc, vert sauge, rouille) à applications géométriques, portés en extérieur dans un jardin tropical. | Trois familles de produits coexistent : tenues de soirée de coupe occidentale, boubous et kaftans contemporains, et l'offre box cadeau. Deux modes de prise de vue cohabitent : sur buste dans l'atelier et portés par des modèles. |
| Collection ICONIC | « ICONIC · Nouvelle collection · Déc. 2025 · −35 % sur toute la collection ». Titre en Didone à fort contraste, photos en noir et blanc découpées en mosaïque sur la grille. Shooting en couleur dans un salon beige : mur à lames verticales, rideaux lin, canapé bas, tapis épais. Robes courtes : brune drapée épaule dénudée, jaune pâle à volants col licou, version blanche. Bandeau dans les cheveux, sandales fines. Logo « LACOUTURE. » gras avec point final, « ABIDJAN » dessous. | C'est le contenu le plus abouti et le plus récent. Il montre la direction vers laquelle la marque évolue : éditoriale, sobre, chaude, avec un vrai travail de décor. Il confirme aussi le fonctionnement en collections datées et le recours aux promotions de lancement. |
| Vidéo d'unboxing | Mains manucurées posées sur la box noire « LACOUTURE ABIDJAN », bracelet doré à motif trèfle. Lieu indiqué : Cocody, Abidjan. 53 j'aime, 6 partages. | Le moment de réception est mis en scène. L'emballage est un actif de marque. Les codes d'aspiration (manucure, bijou, bois sombre) visent une clientèle soignée, qui fait attention aux détails. |
| Story « About us » 1 (2023) | « Au niveau des tailles : en général nous utilisons les mensurations standarts : XS à 2XL ou plus. » « Option 1 : le client nous contacte avec le modèle qu'il souhaite faire. Option 2 : nous proposons des modèles. » « Le client est libre de choisir la matière. Les imprimés sont la plupart du temps indisponibles, on prend donc des tissus semblables. » Pastilles saumon et bordeaux, serif en petites capitales. | C'est la capture la plus importante pour l'UX. Elle décrit le vrai modèle économique : confection à la commande, tailles standard étendues, tissu choisi ou substitué, modèles proposés par la maison ou apportés par la cliente. Elle contient aussi une faute (« standarts »). |
| Story « About us » 2 (2023) | « C'est quoi Lacouture ? » en lettres condensées à effet néon rose. « LACOUTUTRE, est une boutique de confection de vêtements sur mesure. » Fond : robes longues ajustées en satin, dos drapé. | La définition de la marque est claire, mais la faute dans le nom même de la marque et l'effet néon nuisent à la crédibilité. |

### A.2 Les produits

Trois familles se dégagent, et elles appellent des besoins d'affichage différents.

**Les tenues de soirée et d'occasion** forment la famille dominante : robes courtes drapées ou à volants, robes longues ajustées en satin, robe rouge structurée, ensembles imprimés. Ce sont des pièces près du corps, où la coupe et le tombé sur la silhouette décident de l'achat. Elles exigent des photos portées en pied, une vue de dos (beaucoup de dos travaillés : licou, drapé, dos nu) et une information de taille très précise.

**Les boubous et kaftans contemporains** sont des pièces amples, unies, rehaussées d'applications géométriques (cercles, bandes, passepoils contrastés). Leur valeur tient au mouvement du tissu et au détail de l'ornement. Ils demandent de la vidéo ou des photos en mouvement, des gros plans sur les applications, et une gestion de taille plus souple (souvent une longueur plus qu'une taille).

**La box** est à la fois un emballage signature et une offre cadeau (« Offrez-leur une box »). Les captures ne permettent pas de savoir si la box est un produit composé (une tenue et des accessoires) ou un emballage premium. C'est une question à trancher (section 9), mais dans les deux cas le site doit gérer l'achat pour une autre personne.

Les besoins d'affichage qui en découlent sont les suivants : de grandes photographies verticales, au moins une vue portée et une vue de dos par modèle, des gros plans matière, de la vidéo courte, des collections datées, des prix promotionnels, un délai de confection, un guide des tailles en centimètres et une option de mesures personnalisées.

### A.3 L'identité visuelle actuelle : quatre systèmes qui se contredisent

| Système | Où | Caractère | Verdict pour le site |
|---|---|---|---|
| **Monogramme fil** : ligne rose poudre, capitales fines espacées, fond noir | Photo de profil | Délicat, artisanal, féminin sans mièvrerie | **À garder.** C'est la source de la signature graphique (le Fil). |
| **Wordmark gras** : « LACOUTURE. » sans-serif géométrique gras avec point final, « ABIDJAN » | Box, ICONIC, stories | Affirmé, contemporain, étiquette de mode | **À garder** comme logotype principal du site. Il est le plus vu, il figure sur l'objet que la cliente reçoit. |
| **Retail fuchsia** : caractères condensés gras, fuchsia vif, pictogrammes clipart | Visuel « Une box », couvertures des à la une | Promotionnel, bruyant, générique | **À abandonner** sur le site. Il tire la marque vers la boutique de quartier et vieillit vite. |
| **Canva 2023** : pastilles saumon, néon, serif petites capitales | Stories « About us » | Amateur, daté, fautes de frappe | **À abandonner.** C'est précisément l'image que le site doit faire oublier. |
| **Éditorial ICONIC** : Didone, noir et blanc, salon beige | Collection décembre 2025 | Mature, sobre, chaud, aspirationnel | **Point de départ** de la direction artistique. |

La trajectoire est nette. La marque est passée en deux ans d'une communication bricolée (2023) à une collection mise en scène avec un vrai décor (fin 2025). Le site doit consolider cette montée en gamme au lieu de reproduire la moyenne de ce qui existe.

Le rose pose un problème particulier : la marque en utilise trois versions. Le monogramme est **rose poudre** légèrement lilas, les pictogrammes sont **fuchsia vif** et les stories sont **saumon**. Le site doit en retenir une seule famille, celle du monogramme, car elle est la plus singulière et la moins attendue.

### A.4 Ce qui constitue déjà une signature

Quatre éléments sont propres à Lacouture et méritent d'être portés par le site. Le premier est la **ligne continue du monogramme**, qui évoque le fil et la couture. Le deuxième est le **contraste noir et rose de la box**, que la cliente tient entre ses mains. Le troisième est **l'étiquette cousue** visible sur la veste à volants, preuve matérielle de la confection. Le quatrième est **la chaleur beige du salon ICONIC**, qui met en valeur les peaux foncées et les couleurs des tissus.

### A.5 Le fonctionnement actuel et ses frictions

Le parcours actuel comporte huit étapes, dont cinq se déroulent en conversation privée. Les frictions décrites dans le brief sont réelles : la capture d'écran, la double démarche paiement puis preuve, la validation qui n'arrive qu'après le paiement intégral. L'analyse en fait apparaître d'autres, moins visibles.

**L'identification du modèle est floue.** Une capture d'écran ne dit pas quel modèle exact, quelle couleur ni quelle version de la collection la cliente veut. La vendeuse doit retrouver la publication, ce qui prend du temps et provoque des erreurs.

**Le prix et le délai sont cachés.** Ils ne figurent ni dans les publications visibles ni dans la bio. La cliente doit écrire pour connaître le prix, ce qui filtre les acheteuses timides et fait perdre celles qui comparent à 23 h.

**La taille est déclarée sans repère.** « XS à 2XL » ne correspond à aucun tableau de mesures publié. Pour une pièce confectionnée et non remboursable, c'est la source principale de déception.

**Le tissu crée un risque d'écart.** La story l'admet : les imprimés sont souvent indisponibles et remplacés par des matières semblables. Si la cliente l'apprend à la livraison, elle a le sentiment d'avoir été trompée. Aujourd'hui, cette information est enfouie dans une story de 2023.

**Payer d'avance une boutique Instagram demande une grande confiance.** Le paiement intégral avant confection est un engagement fort, sur un canal où les arnaques existent et où les clientes le savent. Rien dans le parcours actuel ne vient rassurer avant le paiement, sauf la relation humaine avec la vendeuse.

**La vendeuse porte tout le processus.** Chaque commande occupe une conversation entière, et les informations utiles (taille, adresse, date, preuve) sont dispersées dans des fils de discussion. Il n'existe ni liste des commandes en cours ni vision des échéances.

**L'urgence n'est pas exprimée.** On achète une tenue d'occasion pour une date : un mariage, un anniversaire, une sortie, une fête. Cette date n'apparaît nulle part dans le parcours, alors qu'elle conditionne la faisabilité de la commande.

### A.6 Ce que le site peut résoudre, et ce qu'il ne résoudra pas

Le site **résout** l'identification du modèle (une page, une référence), la transparence (prix, délai, tailles, tissu affichés), la collecte structurée des informations (un formulaire unique), la preuve de paiement (le paiement en ligne est lui-même la preuve), la confirmation (un numéro de commande et un récapitulatif) et l'organisation de la vendeuse (des commandes complètes, classées, avec leurs échéances).

Le site **ne résout pas** la confiance à lui seul : un beau site inconnu n'inspire pas plus confiance qu'un compte Instagram de 5 500 abonnées. La confiance viendra de la cohérence entre les deux, des preuves (réalisations, clientes réelles), de la clarté des règles et de la présence humaine maintenue. Il ne résout pas non plus le sur-mesure complexe (le modèle apporté par la cliente), qui reste une conversation.

### A.7 Remises en question du brief

**1. « Connaître la disponibilité » n'a pas le sens habituel.** Puisque tout est confectionné, un modèle n'est presque jamais « en rupture ». La vraie information est le délai : « Confectionnée pour vous en 7 à 10 jours » (le chiffre est à confirmer). Si certaines pièces existent déjà en stock (par exemple celles du shooting), elles portent une mention distincte « Prête, expédiée sous 48 h ». Le site affiche donc deux états de disponibilité et non une quantité.

**2. Le paiement intégral est justifiable, mais il faut le compenser.** Pour une pièce confectionnée sur commande, le paiement à la livraison ferait porter tout le risque à l'atelier, ce qui justifie le prépaiement. Le paiement en ligne supprime en plus l'envoi de la preuve. En contrepartie, le site doit afficher avant le bouton de paiement tout ce qui rassure : le délai, la politique tissu, la politique de retouche, le contact humain. Pour les demandes de sur-mesure hors catalogue, un acompte après devis est plus adapté qu'un paiement en ligne immédiat (décision à prendre par Lacouture).

**3. L'« Option 1 » (la cliente apporte son modèle) ne doit pas passer par le panier.** Ce service n'a ni prix fixe ni photo maison. Il devient une page « Sur mesure » avec une demande courte (photo d'inspiration, occasion, date, budget indicatif, téléphone) qui aboutit à un devis sur WhatsApp. Les photos d'inspiration fournies par les clientes, souvent des créations d'autres marques, ne doivent jamais apparaître dans le catalogue : seules les créations de la maison et les réalisations portées par de vraies clientes y ont leur place.

**4. WhatsApp ne disparaît pas, il change de rôle.** À Abidjan, WhatsApp est le canal de confiance par défaut. Le supprimer ferait fuir les clientes qui veulent parler à quelqu'un avant de payer. Le site garde donc un accès WhatsApp sur chaque fiche produit, avec un message prérempli contenant la référence du modèle. WhatsApp passe du statut de canal de commande à celui de canal de conseil.

**5. La date de l'événement devient une donnée de commande.** Demander « Pour quand en avez-vous besoin ? » permet de vérifier la faisabilité en temps réel, de prioriser la production et de rassurer la cliente. C'est une question qu'aucun template e-commerce ne pose, et c'est exactement celle qui correspond à la réalité d'une maison de confection.

**6. Le tissu doit faire l'objet d'une règle écrite et d'une validation.** Le site énonce la règle sur chaque fiche concernée : « Si ce tissu n'est plus disponible, l'atelier vous propose une matière équivalente avant de commencer. Vous validez, ou vous êtes remboursée. » Une contrainte subie devient ainsi un service.

**7. Il faut une politique après livraison.** Une pièce confectionnée ne se retourne pas, mais une cliente qui ne peut rien faire en cas de problème de taille hésitera longtemps. Une **retouche offerte** dans un délai court (par exemple 7 jours) est la réassurance la plus forte possible pour un atelier, et elle ne coûte que du temps de couture. C'est une décision commerciale à valider.

**8. Les promotions permanentes affaiblissent la « maison ».** Une collection lancée à −35 % installe l'idée que le prix normal n'est pas le vrai prix. Le site doit pouvoir afficher des prix barrés, mais la recommandation est de réserver les remises à des moments précis (lancement limité dans le temps, fin de collection) plutôt qu'au lancement de chaque collection.

**9. Le catalogue doit rester synchronisé avec Instagram.** Le risque principal du projet n'est pas graphique, il est opérationnel. Si Instagram montre des modèles absents du site, ou si le site affiche des modèles plus réalisables, la confiance s'effondre. Il faut une règle simple : chaque modèle publié sur Instagram existe sur le site avec une référence, et la légende Instagram cite cette référence (« Réf. ICO-03, lien en bio »). Les modèles qui ne sont plus confectionnés passent dans « Réalisations » sans bouton d'achat.

**10. Plusieurs fonctions sont inutiles au lancement.** Le catalogue compte au plus quelques dizaines de modèles et la clientèle achète ponctuellement. Les comptes clients, les avis notés par étoiles, la liste d'envies, la recherche textuelle et les filtres multiples alourdiraient le site sans servir l'achat. Les commandes se font sans compte.

### A.8 Les besoins des deux côtés

**Ce dont la cliente a besoin :** voir la tenue portée et en mouvement ; connaître le prix sans demander ; savoir si la taille lui ira ; savoir quand elle recevra la tenue, et si ce sera à temps ; savoir ce qui se passe si le tissu change ou si la taille ne va pas ; payer avec ses moyens habituels ; obtenir une preuve de commande ; pouvoir parler à quelqu'un ; pouvoir offrir.

**Ce dont la vendeuse a besoin :** recevoir une commande complète et sans ambiguïté (référence, taille ou mesures, coordonnées, livraison, date souhaitée, paiement confirmé) ; être prévenue immédiatement ; voir ses commandes classées par échéance ; contacter la cliente en un geste ; faire valider une substitution de tissu ; indiquer l'avancement ; publier, masquer ou modifier un modèle, son prix, son délai et sa promotion sans aide extérieure.

---

## B. Positionnement digital

### B.1 Le constat sur la clientèle

Les indices disponibles permettent de décrire des attentes, pas des personnes. La marque s'adresse explicitement aux femmes (« pour chaque femme »), dans une gamme de tailles large (XS à 2XL et plus), ce qui suppose une clientèle variée en morphologie. Les tenues sont des tenues d'occasion : soirées, cérémonies, anniversaires, sorties, fêtes. L'univers des visuels (manucure, bijoux, salon soigné, localisation Cocody) indique des clientes attentives à leur image, qui achètent pour être vues un jour précis. Le message « Faites-leur plaisir » montre qu'une partie des achats est faite **par quelqu'un d'autre**, pour offrir. L'« Option 1 » montre enfin qu'une partie des clientes arrive avec une idée précise, vue ailleurs.

Les motivations d'achat sont donc l'occasion à venir, l'envie d'une pièce ajustée à son corps, le plaisir d'offrir et le désir d'une pièce que tout le monde n'aura pas. Les hésitations probables sont la taille, l'écart entre la photo et la pièce reçue, le délai par rapport à la date, la sécurité du paiement et l'absence de recours.

### B.2 La perception à transmettre

| Axe | Position recommandée | Raison |
|---|---|---|
| Accessible ↔ Luxe | Aux deux tiers vers le premium, sans aller au luxe | Les tenues sont confectionnées et soignées, mais la marque vend par Instagram à une clientèle locale et pratique des promotions. Jouer le luxe créerait un écart avec les prix et ferait fuir. |
| Minimal ↔ Expressif | Légèrement minimal | Les tenues sont déjà expressives (volants, couleurs, imprimés, applications). Le site doit les servir sans les concurrencer. |
| Éditorial ↔ Commercial | Éditorial à l'accueil et à l'ouverture des collections, commercial dans le catalogue et la commande | L'éditorial installe la marque, mais la cliente vient d'Instagram pour acheter vite. |
| Froid ↔ Chaleureux | Nettement chaleureux | La relation humaine est l'atout principal de Lacouture face aux grandes enseignes. |
| International ↔ Local | Ancré à Abidjan, ouvert | « Abidjan » fait partie du logo. C'est une fierté et une preuve de fabrication locale, pas un détail à cacher. |

### B.3 La personnalité

Lacouture se comporte comme **une couturière de confiance qui a du goût**. Elle est sûre de son métier sans être distante, elle parle simplement, elle connaît les corps et les occasions, elle tient ses délais et elle soigne les finitions jusqu'à la boîte.

### B.4 Énoncé de positionnement

> Lacouture est la maison de confection d'Abidjan qui réalise des tenues d'occasion ajustées à chaque femme, avec le soin d'un atelier et la fiabilité d'une marque.

Le slogan actuel (« Élégance taillée sur mesure pour chaque femme, à chaque instant ») est bon et peut rester en signature. Le site lui donne des preuves.

### B.5 Principes de communication

1. **Dire le métier.** Le vocabulaire est celui de l'atelier : confection, modèle, mesures, finitions, atelier, essayage, retouche. On évite « produit », « article » et « item ».
2. **Vouvoyer avec chaleur.** C'est l'usage actuel de la marque. Les phrases sont courtes et directes, sans jargon.
3. **Tout écrire en français.** « About us » devient « La Maison ».
4. **Ne laisser aucune faute.** Chaque texte est relu. Une faute dans le nom de la marque coûte plus cher qu'un mauvais visuel.
5. **Annoncer les règles avant le paiement**, jamais après : délai, tissu, retouche, livraison.
6. **Montrer des preuves plutôt que des adjectifs.** « Confectionnée à Cocody en 8 jours » est plus convaincant que « qualité exceptionnelle ».

---

## C. Direction artistique

### C.1 Trois territoires possibles

Trois territoires sont réellement distincts et défendables à partir de l'existant.

**Territoire A · « Écrin Noir ».** Le site entier est noir, le rose poudre sert de couleur d'accent et l'ambiance est nocturne, glamour, celle d'une soirée. Il prolonge la box et la photo de profil. Il a l'avantage d'être fidèle aux actifs actuels et spectaculaire. Ses défauts sont importants : un fond noir écrase les photos chaudes du shooting ICONIC, avale les tissus sombres et les peaux foncées, fatigue la lecture des informations de commande, et l'association noir et rose est l'un des codes les plus répandus des boutiques féminines et des marques de cosmétiques.

**Territoire B · « Le Salon ».** Le fond est ivoire chaud et lin, le texte noir encre, et le rose du monogramme n'apparaît qu'en fil fin. Les titres sont en Didone, la mise en page est éditoriale et aérée, et l'univers est celui d'un salon d'essayage où l'on est reçue. Il prolonge directement la collection ICONIC, la plus aboutie. Ses avantages : les photographies sont mises en valeur, quelle que soit la couleur des tenues ou des peaux ; l'interface est lisible pour commander ; le rendu inspire confiance ; il vieillit bien. Son risque est la fadeur s'il est mal exécuté. Les signatures (C.8) servent précisément à l'éviter.

**Territoire C · « Couture Pop ».** Les aplats sont fuchsia, les titres condensés très gras et l'énergie est celle du visuel « Offrez-leur une box ». Il est accessible, tendance et efficace pour les promotions. Il affaiblit pourtant la perception de confection, concurrence les tenues colorées, ressemble à des milliers de boutiques Instagram et se démode en une saison.

| Critère | A · Écrin Noir | B · Le Salon | C · Couture Pop |
|---|---|---|---|
| Fidélité aux actifs actuels | Forte (box, profil) | Forte (ICONIC, monogramme) | Moyenne (visuels promo) |
| Mise en valeur des tenues | Faible pour les tons sombres | **Forte** | Faible (concurrence de couleur) |
| Lisibilité de la commande | Moyenne | **Forte** | Moyenne |
| Singularité | Faible (code répandu) | **Moyenne à forte** grâce aux signatures | Faible |
| Confiance inspirée | Moyenne | **Forte** | Faible |
| Durabilité | Moyenne | **Forte** | Faible |
| Cohérence avec le niveau de prix probable | Pousse vers un luxe non assumé | **Juste** | Tire vers le bas |

**Recommandation : le territoire B, « Le Salon », qui emprunte au territoire A ses moments noirs.** Le noir de la box est réservé aux moments forts (offre cadeau, confirmation de commande, pied de page). L'alternance entre un ivoire dominant et des sections noires ponctuelles reproduit l'expérience physique de la marque : un intérieur chaleureux, puis une boîte noire qu'on ouvre.

### C.2 Atmosphère

L'atmosphère est celle d'un **salon d'essayage en fin d'après-midi** : une lumière chaude, des matières naturelles, du calme, et les tenues comme seules sources de couleur vive. On doit sentir qu'on a été reçue chez quelqu'un de soigneux, pas qu'on parcourt une plateforme.

Le degré de sophistication est **soigné mais pas intimidant**. Le soin se voit dans les proportions, l'espace et la typographie, pas dans des effets. Le site ne contient ni dégradé, ni effet de verre, ni ombre portée, ni animation décorative.

Le rapport entre simplicité et expressivité est réglé ainsi : **l'interface est simple pour que les tenues soient expressives**. L'expressivité de l'interface est concentrée en trois endroits : la Couverture des collections, la typographie Didone en grand format et le Fil rose.

La place de la photographie est **dominante**. Sur mobile, une photographie occupe toujours toute la largeur de l'écran ou la moitié exacte, jamais un quart.

Le contraste est **fort pour le texte et doux pour les surfaces**. Le texte est noir sur ivoire et les surfaces jouent entre ivoire, lin et sable. Le noir plein arrive par sections entières, jamais en petits blocs dispersés.

### C.3 Palette chromatique

| Rôle | Nom | Valeur | Usage |
|---|---|---|---|
| Fond principal | **Ivoire** | `#F7F2EB` | Fond de toutes les pages. Plus chaud que le blanc, il s'accorde au décor ICONIC et aux peaux foncées, et il évite l'aspect clinique d'un blanc pur. |
| Surface secondaire | **Lin** | `#EFE6DA` | Sections alternées, fond de l'Étiquette, récapitulatif de commande, zones d'images en chargement. |
| Ligne et bordure | **Sable** | `#DCCFBF` | Séparateurs, bordures de cartes de taille, contours discrets. |
| Texte secondaire | **Taupe** | `#7A6A5B` | Métadonnées, aides de formulaire, mentions de délai. Contraste sur Ivoire : 4,7:1 (conforme AA). |
| Texte et action | **Encre** | `#16120F` | Texte principal, boutons principaux, sections noires (Box, confirmation, pied de page). C'est un noir légèrement chaud, celui de la box, qui reste noir à l'œil. |
| Signature sur clair | **Rose Fil** | `#A8456B` | Le Fil, prix promotionnel, lien actif, indicateur de progression. Contraste sur Ivoire : 5,1:1 (conforme AA pour le texte). |
| Signature sur noir | **Rose Poudre** | `#E8C5D4` | Couleur du monogramme. Elle s'utilise **uniquement sur Encre** : logo, titres et Fil dans les sections noires. Contraste sur Encre : environ 12:1. |
| Erreur | **Garance** | `#B0322A` | Messages d'erreur de formulaire. C'est un rouge brique distinct du rose, pour ne pas confondre la signature et l'alerte. |
| Validation | **Palme** | `#3D6B4F` | Confirmation de champ, statut « confirmée ». Vert sourd, discret. |

**Hiérarchie et proportions.** L'Ivoire et le Lin couvrent environ 75 % de la surface hors photos, l'Encre environ 20 % (texte et sections noires) et le Rose ne dépasse jamais 5 %. Le rose n'est jamais un fond de section ni un fond de bouton. Il reste un fil, un chiffre, un détail. Cette retenue rend le rose remarquable et évite le cliché de la boutique féminine rose.

**Interactions interdites.** Le Rose Poudre sur Ivoire est interdit, car un rose pâle sur crème disparaît. Le Rose Fil n'est jamais employé pour de longs textes. Le fuchsia vif des à la une actuels n'appartient pas à la palette.

**Couleurs des produits.** Le site n'a pas de couleur dans ses visuels d'interface : les seules couleurs saturées à l'écran doivent être celles des tenues. C'est la raison profonde d'une palette aussi neutre.

### C.4 Typographie

Deux familles suffisent, avec peu de graisses, ce qui limite aussi le poids des pages sur les connexions mobiles.

**Titres éditoriaux : Bodoni Moda** (Google Fonts, gratuite, avec tailles optiques). C'est un Didone à fort contraste, de la même famille stylistique que le titre ICONIC. Il porte les noms de collection, les noms de modèles et les grands titres de section. Graisses : Regular 400 et Italique 400.
*Règle stricte : jamais en dessous de 24 px.* Les déliés très fins d'un Didone disparaissent à petite taille, surtout sur les écrans Android d'entrée de gamme, très répandus. C'est la principale raison pour laquelle les typographies de luxe deviennent illisibles sur les sites de mode.

**Interface et texte : Jost** (Google Fonts, gratuite). C'est un sans-serif géométrique de la famille de Futura, cohérent avec les capitales espacées du logo et avec le wordmark gras. Il porte la navigation, les textes, les prix, les formulaires, les boutons et les étiquettes. Graisses : Regular 400 et Medium 500. Il faut vérifier la disponibilité des chiffres tabulaires pour l'alignement des prix ; à défaut, Manrope est l'alternative.

| Rôle | Famille | Mobile | Desktop | Interligne | Particularités |
|---|---|---|---|---|---|
| Couverture (nom de collection) | Bodoni Moda 400 | 56 px | 120 à 160 px | 0,9 | Capitales, crénage serré (−0,01 em) |
| Titre de section | Bodoni Moda 400 | 32 px | 48 px | 1,05 | Casse normale, italique possible sur un mot |
| Nom de modèle (fiche) | Bodoni Moda 400 | 30 px | 40 px | 1,1 | Casse normale |
| Sous-titre fonctionnel | Jost 500 | 18 px | 20 px | 1,3 | Titres de formulaire, d'accordéon |
| Texte courant | Jost 400 | 16 px | 17 px | 1,55 | Longueur de ligne maximale de 65 caractères |
| Texte secondaire | Jost 400 | 14 px | 14 px | 1,45 | Couleur Taupe |
| Surtitre et étiquette | Jost 500 | 12 px | 12 px | 1,3 | Capitales, interlettrage 0,14 em |
| Prix | Jost 500 | 17 px | 18 px | 1,2 | « FCFA » à 0,75 em, espace fine insécable pour les milliers : `45 000 FCFA` |
| Bouton | Jost 500 | 14 px | 14 px | 1 | Capitales, interlettrage 0,1 em |
| Nom de modèle (carte catalogue) | Jost 500 | 15 px | 15 px | 1,3 | Le Didone n'est pas utilisé en petit |

**Logotype.** Le wordmark « LACOUTURE. ABIDJAN » reste un fichier graphique et n'est pas recomposé en Jost. Il faut récupérer le fichier vectoriel d'origine.

### C.5 Composition et mise en page

**Principe directeur : l'asymétrie éditoriale sur une grille stricte.** Les pages de marque (accueil, collection, La Maison) jouent sur des décalages : une image pleine largeur suivie d'un texte aligné sur une colonne étroite, puis d'une image décalée. Les pages de commerce (catalogue, fiche, commande) sont strictement alignées, car la cliente doit y trouver l'information sans chercher. Cette différence de régime entre « regarder » et « acheter » structure tout le site.

**Grille.**

| Écran | Colonnes | Marges latérales | Gouttière | Largeur max du contenu |
|---|---|---|---|---|
| Mobile (moins de 600 px) | 4 | 20 px | 12 px | 100 % |
| Tablette (600 à 1023 px) | 8 | 32 px | 16 px | 100 % |
| Desktop (1024 à 1439 px) | 12 | 48 px | 24 px | 100 % |
| Grand écran (1440 px et plus) | 12 | 64 px | 24 px | 1 440 px |

**Rythme vertical.** L'échelle d'espacement est fondée sur 4 px (section G). L'espace entre deux sections vaut 64 px sur mobile et 128 px sur desktop. L'espace généreux entre les sections est ce qui produit l'impression de soin, bien plus que n'importe quel effet.

**Alignements.** Les textes sont alignés à gauche, jamais centrés sur plusieurs lignes, sauf la confirmation de commande et le pied de page des sections noires. Les prix sont alignés à droite dans les récapitulatifs.

**Proportions.** Le format maître des images est 4:5. C'est le format natif des publications Instagram (1080 × 1350), ce qui permet de réutiliser les photos existantes sans recadrage destructeur. Le format 3:4 est accepté pour les images du shooting d'origine. Le format 16:9 est réservé aux images d'ambiance sur desktop et n'est jamais utilisé pour un produit.

### C.6 Photographie et direction de l'image

C'est la décision la plus importante pour une marque de mode. Elle se décline en règles applicables avec les moyens actuels de Lacouture.

**Deux régimes d'image.** Les images **éditoriales** (couverture de collection, La Maison, ambiance) peuvent être en noir et blanc, recadrées serré, mises en scène. Les images **produit** (catalogue, fiche) sont **toujours en couleur fidèle, sans filtre**, car la cliente achète une couleur. Le noir et blanc d'ICONIC est superbe sur Instagram, mais une cliente ne peut pas acheter une robe jaune pâle qu'elle n'a vue qu'en gris.

**Ordre des images sur une fiche produit.**
1. La tenue portée, de face, en pied (pieds compris). C'est l'image du catalogue.
2. La tenue portée, de dos ou de profil. Beaucoup de modèles Lacouture se jouent dans le dos.
3. Une vidéo courte de 5 à 10 secondes, la tenue en mouvement. Les Reels existants peuvent servir, recadrés en 4:5 à condition de ne couper ni la tête ni les pieds.
4. Un gros plan matière ou détail : volant, smocks, application, finition.
5. La vue atelier : la tenue sur le buste noir, fond neutre. Ces photos existent déjà et prouvent la confection.
6. En option, la tenue portée par une cliente, identifiée comme telle (« Portée par une cliente »).

**Exploiter l'existant intelligemment.**
- Il faut demander les **fichiers originaux** des shootings, jamais les images téléchargées d'Instagram, qui sont compressées. Pour les anciens modèles dont seule la version Instagram existe, ces images servent en vignette de catalogue mais pas en zoom.
- Les mosaïques découpées (ICONIC en 9 cases) sont un procédé propre à la grille Instagram. Sur le site, on utilise l'image entière.
- Les visuels avec texte incrusté (« Offrez-leur une box », annonces de promotion) ne servent jamais d'image produit. Le texte vit dans l'interface, pas dans les images.
- Les photos sur buste noir sur fond blanc forment une série cohérente : on les garde comme « vue atelier », sur un fond qui doit rester uniforme.

**Un protocole photo léger pour la suite.** Il est inutile de prévoir un shooting professionnel pour chaque modèle. Un coin de l'atelier aménagé une fois pour toutes suffit : un fond uni couleur lin ou sable (raccord avec le site), la lumière du jour, un smartphone sur trépied placé à hauteur de taille, la même distance à chaque fois. Chaque nouveau modèle est photographié porté (face, dos), sur buste, et en gros plan, plus 10 secondes de vidéo. Les collections importantes (comme ICONIC) gardent leur shooting éditorial.

**Traitement.** L'étalonnage est chaud et lumineux. Il faut surexposer légèrement plutôt que sous-exposer, car les peaux foncées et les tissus noirs se perdent dans les ombres. Les fonds sont neutres et chauds. Le détourage sur fond blanc est exclu : il donne une impression de marketplace et efface la matière.

**Informations de prise de vue affichées.** Chaque fiche indique la taille et la hauteur du modèle photographié : « Le modèle mesure 1,68 m et porte un S. » C'est le repère de taille le plus utile qui existe.

### C.7 Iconographie et éléments d'interface

**Icônes.** Le trait est fin (1,5 px), le dessin sur une grille de 24 px, les terminaisons droites, sans remplissage, en couleur Encre. Le jeu est limité au strict nécessaire : menu, fermer, commande (sac), flèche, chevron, plus et moins, règle (guide des tailles), calendrier (date), camion (livraison), aiguille ou ciseaux (confection), coche, WhatsApp. Le glyphe WhatsApp est utilisé en monochrome Encre, toujours accompagné du mot « WhatsApp ». Les pictogrammes clipart fuchsia actuels ne sont pas repris.

**Boutons.** Ils sont rectangulaires, à **angles vifs** : l'angle droit évoque la coupe nette et rompt avec les pastilles arrondies de 2023 et la quasi-totalité des templates. Le bouton principal est en aplat Encre avec texte Ivoire. Le bouton secondaire a un contour Encre de 1 px. Le lien textuel est souligné de 1 px, avec un soulignement qui passe au Rose Fil au survol ou à l'activation. Il n'y a qu'un seul bouton principal par écran.

**Séparateurs.** Ce sont des lignes de 1 px couleur Sable. Ils séparent les blocs d'information de l'Étiquette et les lignes du récapitulatif. Il n'y a pas de cartes encadrées avec ombre.

**Badges.** Ce ne sont pas des pastilles colorées. Un badge est un petit rectangle Ivoire posé dans le coin haut gauche de l'image, avec un texte Jost 500 de 11 px en capitales. « NOUVEAU » est en Encre, « −35 % » en Rose Fil, « PRÊTE » (pièce en stock) en Encre. Une image porte au plus un badge.

**Le monogramme.** Il sert de favicon, de sceau sur la confirmation de commande, de marque en pied de page et de filigrane sur les emballages. Il n'est jamais utilisé comme motif répété en fond, ni redessiné en ornement.

### C.8 Les quatre signatures de Lacouture

Ce sont ces quatre éléments, et non la palette seule, qui empêchent le site de ressembler à un template.

**1. Le Fil.** C'est une ligne de 1 px en Rose Fil (Rose Poudre sur fond noir), dérivée du trait continu du monogramme. Elle a toujours une fonction :
- elle souligne l'élément actif de la navigation et le filtre sélectionné ;
- elle indique la progression dans la galerie photo (une ligne qui avance, à la place des points) ;
- elle relie les étapes du suivi de commande sur la confirmation ;
- elle précède les surtitres de section (un trait de 32 px suivi de « NOUVELLE COLLECTION »).
Elle n'est jamais courbe ni décorative, et on ne dessine jamais de volutes inspirées du monogramme.

**2. L'Étiquette.** Les informations d'un modèle sont présentées comme l'étiquette d'atelier cousue dans la veste : un bloc sur fond Lin, avec des paires libellé/valeur séparées par des lignes Sable, les libellés en petites capitales Jost et les valeurs en Jost courant.

```
MODÈLE        Robe Awa · Réf. ICO-03
COLLECTION    Iconic · Décembre 2025
MATIÈRE       Crêpe fluide
CONFECTION    7 à 10 jours, à Cocody
ENTRETIEN     Lavage main, repassage doux
```

Le même format sert de **fiche d'atelier** sur la page de confirmation, avec le numéro de commande en Bodoni de grand format (« N° 0142 »), comme un ticket de retouche.

**3. La Couverture.** Chaque collection s'ouvre comme une couverture de magazine : une grande image (le noir et blanc est autorisé ici seulement), et le nom de la collection en Bodoni de très grande taille, qui **déborde du cadre de l'image** sur le fond Ivoire. Le chevauchement entre le texte et le bord de l'image est le geste graphique de la marque. Il prolonge directement la couverture ICONIC publiée sur Instagram.

**4. Le Noir de la Box.** Trois moments seulement passent en fond Encre avec le Rose Poudre : la section « Offrir une box », la confirmation de commande et le pied de page. Ces moments rappellent l'objet que la cliente va recevoir. La confirmation de commande sur fond noir, avec le monogramme rose, fonctionne comme le premier « unboxing ».

### C.9 Mouvement

Le mouvement est fonctionnel et discret. Les images apparaissent en fondu de 250 ms une fois chargées. Le panneau de commande glisse en 250 ms. Le Fil se trace de gauche à droite en 400 ms quand une étape de commande est franchie. Il n'y a ni parallaxe, ni carrousel automatique, ni animation au défilement. Toutes les animations respectent le réglage « réduire les animations » du téléphone.

### C.10 Ton éditorial et micro-textes

| Situation | Formulation recommandée | À éviter |
|---|---|---|
| Bouton principal de la fiche | « Commander ce modèle » | « Ajouter au panier » |
| Délai | « Confectionnée pour vous en 7 à 10 jours » | « Disponible » |
| Pièce en stock | « Prête, expédiée sous 48 h » | « En stock (3) » |
| Tissu | « Si ce tissu n'est plus disponible, l'atelier vous propose une matière équivalente avant de commencer. Vous validez, ou vous êtes remboursée. » | Rien, ou une mention en petits caractères |
| Taille | « Entre deux tailles ? Choisissez "Sur mes mesures", c'est sans supplément. » (à confirmer) | « Taille unique » sans explication |
| Date | « Pour quand en avez-vous besoin ? » | « Date de livraison souhaitée » |
| Question | « Une question sur ce modèle ? Écrivez-nous sur WhatsApp » | « Contactez-nous » |
| Confirmation | « Merci Aïcha. Votre commande N° 0142 est entre les mains de l'atelier. » | « Commande validée avec succès » |

---

## D. Architecture du site

### D.1 Plan du site

```
Accueil
├── Boutique (tous les modèles, filtres par famille et collection)
│   └── Fiche modèle
├── Collections
│   └── Page collection (Couverture + modèles), ex. Iconic
├── Offrir (la Box)
├── Sur mesure (demande de devis)
├── Réalisations (clientes et archives, sans achat)
├── La Maison (histoire, atelier, engagements)
├── Aide (guide des tailles, délais, livraison, paiement, tissus, retouches, contact)
├── Commande (panneau récapitulatif) → Finalisation (une page) → Confirmation
└── Suivi de commande (lien reçu après commande, phase 2)
```

La navigation principale compte cinq entrées : **Boutique, Collections, Offrir, Sur mesure, La Maison**. L'aide est accessible depuis le pied de page, depuis chaque fiche produit et depuis la commande.

Les regroupements sont délibérés. Il n'y a pas de page panier distincte : un panneau suffit, car la plupart des commandes portent sur une ou deux pièces. Il n'y a pas de pages séparées pour chaque catégorie : ce sont des filtres de la boutique. Il n'y a pas de pages séparées « Livraison », « FAQ », « Guide des tailles » : c'est une seule page Aide, découpée en sections ancrées. Les collections ont une page dédiée parce qu'elles sont le moteur éditorial et promotionnel de la marque (lancements datés).

### D.2 Accueil

**Objectif.** Faire comprendre en cinq secondes que Lacouture confectionne des tenues d'occasion à Abidjan, montrer la collection en cours et permettre d'acheter dès le premier défilement.

**Contenu et ordre (mobile).**

1. **En-tête.** Menu à gauche, wordmark au centre, commande à droite avec le nombre de pièces.
2. **La Couverture de la collection en cours.** Une photo 4:5 pleine largeur, puis le nom de la collection en Bodoni de 56 px qui chevauche le bas de l'image. Ensuite viennent un surtitre précédé du Fil (« NOUVELLE COLLECTION »), une ligne factuelle (« Décembre 2025 · 12 modèles · Confectionnés à Abidjan »), éventuellement l'offre en Rose Fil (« −35 % jusqu'au 31 décembre ») et le lien « Découvrir la collection ».
3. **Rail de modèles** de la collection : cartes 4:5 qui défilent horizontalement, avec deux cartes visibles et l'amorce d'une troisième pour signaler le défilement. Prix visible. La cliente peut ouvrir un modèle sans quitter l'accueil des yeux plus de deux secondes.
4. **« Comment ça se passe ».** Trois étapes reliées par le Fil : « Vous choisissez votre modèle et votre taille », « L'atelier le confectionne pour vous en 7 à 10 jours », « Nous vous livrons à Abidjan ». Cette section remplace le « C'est quoi Lacouture ? » de 2023. Elle explique le fonctionnement et rassure en même temps.
5. **Les familles.** Deux entrées asymétriques, l'une grande (Soirée et occasions), l'autre plus petite et décalée (Boubous et kaftans), chacune avec une photo et un titre en Bodoni. Elles ne prennent pas la forme de quatre cartes identiques.
6. **Offrir une box** (section noire). La photo de la box, un titre en Rose Poudre (« Faites-leur plaisir »), une phrase et un bouton contour Ivoire.
7. **Réalisations.** Une bande de photos de clientes réelles avec un prénom et une occasion (« Mariam, pour son anniversaire »). C'est la preuve sociale, issue des « Réalisations » d'Instagram.
8. **Sur mesure.** Une phrase (« Vous avez un modèle en tête ? L'atelier le réalise. ») et un lien vers la demande.
9. **Pied de page** (noir). Monogramme, slogan, liens Aide, WhatsApp, Instagram, Facebook, la mention « Atelier à Cocody, Abidjan » et les moyens de paiement acceptés.

**Hiérarchie.** Le nom de la collection domine, puis la première image, puis les prix du rail. La bannière classique (titre, sous-titre et bouton posés au milieu d'une photo) est volontairement évitée : le titre déborde de l'image et l'achat est possible juste en dessous.

```
┌──────────────────────────┐
│ ☰      LACOUTURE.     ⌂ 1 │  en-tête 56 px, Ivoire
├──────────────────────────┤
│                          │
│                          │
│    photo 4:5 de la       │
│    collection en cours   │
│                          │
│                          │
│ ICONIC                   │  Bodoni 56 px, chevauche le bord
├──────────────────────────┤
│ ── NOUVELLE COLLECTION   │  le Fil + surtitre
│ Décembre 2025 · 12 modèles│
│ Confectionnés à Abidjan  │
│ −35 % jusqu'au 31/12     │  Rose Fil
│ Découvrir la collection →│
│                          │
│ ┌────────┐ ┌────────┐ ┌─ │  rail 4:5
│ │        │ │        │ │  │
│ │        │ │        │ │  │
│ └────────┘ └────────┘ └─ │
│ Robe Awa   Robe Nadia    │
│ 45 000 FCFA ...          │
└──────────────────────────┘
```

### D.3 Boutique (catalogue)

**Objectif.** Parcourir tous les modèles disponibles à la commande et en choisir un.

**Contenu.** Un titre court (« La boutique »), une rangée de filtres en défilement horizontal (Tout · Nouveautés · Iconic · Soirée · Boubous et kaftans · Ensembles · Prêtes à porter), puis la grille.

**Cartes.** Image 4:5 sans cadre ni ombre. Dessous, le nom du modèle (Jost 500, 15 px), le prix (prix barré en Taupe et prix promotionnel en Rose Fil le cas échéant) et une ligne Taupe pour le délai (« Confection 7 à 10 j » ou « Prête »). Il n'y a pas de bouton d'achat sur la carte, car une taille doit être choisie. Au maximum un badge.

**Hiérarchie.** Les photos dominent. L'ordre par défaut place la collection en cours, puis les nouveautés, puis le reste. Une seule interruption éditoriale est permise : un bloc Couverture de collection en tête lorsqu'un filtre de collection est actif.

**Comportement mobile.** Deux colonnes, gouttière de 12 px, 32 px entre les rangées. Les filtres restent accrochés sous l'en-tête pendant le défilement. Il n'y a ni tri ni filtre de prix au lancement : avec quelques dizaines de modèles, ils sont inutiles.

### D.4 Page collection

Elle reprend la Couverture de l'accueil en grand, ajoute un court texte (trois phrases au plus sur l'inspiration de la collection), puis la grille des modèles de la collection, avec la même carte que la boutique. Une ou deux images éditoriales pleine largeur peuvent s'intercaler toutes les six cartes. C'est la page vers laquelle pointent les publications Instagram de lancement.

### D.5 Fiche modèle

C'est la page déterminante : elle doit répondre à toutes les questions qui, aujourd'hui, déclenchent un message privé.

**Contenu et ordre (mobile).**

1. **Galerie** pleine largeur 4:5, qui défile au doigt, avec le Fil comme indicateur de progression et un compteur (« 1 / 6 »). Un toucher ouvre la photo en plein écran avec zoom.
2. **Surtitre** de collection (« ICONIC · DÉCEMBRE 2025 »).
3. **Nom du modèle** en Bodoni (« Robe Awa »).
4. **Prix** (avec prix barré si promotion) et référence en Taupe (« Réf. ICO-03 »).
5. **Disponibilité** sous forme de délai : « Confectionnée pour vous en 7 à 10 jours » avec l'icône aiguille.
6. **Couleur ou tissu**, si plusieurs versions existent : de petites vignettes photo du tissu, pas des pastilles de couleur abstraites.
7. **Taille** : les tailles disponibles en cases carrées (XS, S, M, L, XL, 2XL, 3XL), le lien « Guide des tailles », puis l'option « Sur mes mesures » (section E.4).
8. **Repère** : « Le modèle mesure 1,68 m et porte un S. »
9. **Bouton principal** : « Commander ce modèle ».
10. **Lien WhatsApp** : « Une question sur ce modèle ? Écrivez-nous sur WhatsApp » (message prérempli avec la référence).
11. **Trois engagements** en ligne, avec icônes fines : « Confection à Cocody », « Retouche offerte sous 7 jours » (si validée), « Paiement sécurisé ».
12. **L'Étiquette** (matière, confection, entretien, coupe).
13. **Accordéons** : « La coupe et le tombé », « Tissu et substitution », « Livraison », « Retouches ».
14. **« Elle l'a portée »**, des photos de clientes si elles existent.
15. **« Dans la même collection »**, un rail de trois ou quatre modèles.

**Hiérarchie.** La photo d'abord, ensuite le nom et le prix, puis la taille et le bouton. Le délai est placé juste sous le prix, car il conditionne l'achat autant que le prix.

**Barre d'achat persistante.** Quand le bouton principal sort de l'écran au défilement, une barre fixe apparaît en bas, sur fond Ivoire, avec un filet Sable en haut : à gauche le nom abrégé et le prix, à droite le bouton « Commander ». Si aucune taille n'est choisie, le bouton fait remonter la page jusqu'au sélecteur de taille et le met en évidence.

```
┌──────────────────────────┐
│ ←      LACOUTURE.     ⌂ 0 │
├──────────────────────────┤
│                          │
│     galerie 4:5          │
│     (glisser)            │
│                          │
│ ━━━━━━─────────── 1 / 6  │  le Fil = progression
├──────────────────────────┤
│ ICONIC · DÉCEMBRE 2025   │
│ Robe Awa                 │  Bodoni 30 px
│ 69 000  45 000 FCFA      │  barré Taupe / Rose Fil
│ Réf. ICO-03              │
│ ✂ Confectionnée pour vous│
│   en 7 à 10 jours        │
│                          │
│ TAILLE      Guide ▸      │
│ [XS][S][M][L][XL][2XL]   │  cases 48 × 48
│ ○ Sur mes mesures        │
│ Le modèle mesure 1,68 m  │
│ et porte un S.           │
│                          │
│ ┌──────────────────────┐ │
│ │ COMMANDER CE MODÈLE  │ │  Encre, 52 px
│ └──────────────────────┘ │
│ Une question ? WhatsApp  │
│ ─────────────────────────│
│ ÉTIQUETTE (fond Lin)     │
└──────────────────────────┘
```

### D.6 Panneau de commande

**Objectif.** Confirmer l'ajout, permettre d'ajouter une autre pièce ou de passer à la finalisation.

Le panneau monte du bas de l'écran sur mobile et glisse de la droite sur desktop. Il montre la vignette, le nom, la taille ou la mention « Sur mes mesures », le prix, une commande de quantité discrète, le sous-total, le bouton « Finaliser ma commande » et le lien « Continuer à découvrir ». Il n'y a pas de suggestions de produits forcées.

### D.7 Finalisation (formulaire et paiement)

**Objectif.** Obtenir en une seule page les informations dont l'atelier a besoin, puis encaisser.

Elle tient sur **une seule page en sections successives**, pas en plusieurs écrans : sur mobile, revenir en arrière entre des étapes fait perdre des saisies et coûte des données. Le détail des champs est donné en E.5.

**Hiérarchie.** Les titres de section sont numérotés et reliés par le Fil vertical, qui se colore à mesure que les sections sont remplies. Un récapitulatif replié en haut de page (« Votre commande · 45 000 FCFA ▾ ») se déplie au toucher. Le bouton final affiche le montant exact (« Payer 47 000 FCFA »).

### D.8 Confirmation

**Objectif.** Rassurer, donner une preuve et expliquer la suite.

La page est sur fond Encre, avec le monogramme en Rose Poudre et le titre « Merci, Aïcha » en Bodoni Ivoire. Elle présente la fiche d'atelier (numéro de commande en grand, modèle, taille, livraison, date souhaitée, montant payé) puis le **suivi en étapes** relié par le Fil : Commande reçue ✓ · Confirmée par l'atelier · En confection · Prête · Livrée. Elle indique ce qui va se passer (« L'atelier vous écrit sur WhatsApp sous 24 h pour confirmer »), donne un contact et propose de partager la commande ou de l'enregistrer en image. Un message de confirmation est envoyé à la cliente avec ces mêmes informations.

### D.9 Pages de confiance

**La Maison.** Elle raconte l'atelier, les mains, Cocody et la façon de travailler, avec de vraies photos de l'atelier et de la créatrice si elle l'accepte. C'est la page qui transforme « une boutique Instagram » en « une maison ». Elle est courte : 300 mots au plus et cinq photos.

**Aide.** Une seule page découpée en sections ancrées : guide des tailles (tableau en cm et méthode de mesure illustrée), délais, livraison (zones et frais), paiement, tissus et substitution, retouches, contact. Chaque fiche produit renvoie directement à la section utile.

**Offrir.** La page présente la box, son contenu, l'option message personnalisé, la livraison directe à la personne destinataire et la possibilité de masquer le prix. Selon la décision de Lacouture, la box est un produit à part entière ou une option ajoutée à une commande.

**Sur mesure.** C'est un formulaire court : photo d'inspiration, occasion, date, budget indicatif, téléphone. Il est suivi d'un message clair : « L'atelier vous répond sur WhatsApp sous 48 h avec un devis. » Aucun paiement n'a lieu à ce stade.

**Réalisations.** C'est une galerie de clientes et d'anciens modèles, sans bouton d'achat, avec un lien « Faire réaliser un modèle similaire » vers Sur mesure. Elle conserve la valeur de preuve des anciennes publications sans encombrer la boutique de modèles qui ne sont plus confectionnés.

---

## E. Principes UX

### E.1 Le parcours complet

| Étape | Ce que la cliente doit pouvoir faire | Ce qui la rassure | Signature mobilisée |
|---|---|---|---|
| Découverte (depuis Instagram) | Arriver directement sur le modèle vu, pas sur l'accueil | La même photo que sur Instagram, le même nom, la référence | La Couverture |
| Exploration | Voir la collection et les familles sans réfléchir | Les prix visibles partout | Le Fil (filtres) |
| Sélection d'une tenue | Voir la tenue portée, de dos, en mouvement, en détail | Le repère de taille du modèle, les photos de clientes | L'Étiquette |
| Choix de la taille | Choisir une taille ou donner ses mesures | Le guide en cm, l'option mesures, la retouche | |
| Informations de commande | Remplir un formulaire court sans compte | La date vérifiée en direct | Le Fil (progression) |
| Paiement | Payer avec ses moyens habituels | Le montant exact, les règles rappelées, WhatsApp accessible | |
| Confirmation | Recevoir une preuve et savoir la suite | Le numéro, le suivi en étapes, le message reçu | Le Noir de la Box |

**Le lien Instagram vers le site est le point d'entrée principal.** Chaque publication renvoie à son modèle (lien en bio vers la collection, lien direct en story). La cohérence de référence (« Réf. ICO-03 » dans la légende et sur la fiche) supprime définitivement la capture d'écran.

### E.2 Présentation des tenues

Les règles de la section C.6 s'appliquent. Il faut ajouter deux principes. D'abord, **le catalogue ne montre que ce qui peut être commandé**, et les modèles archivés vont dans Réalisations. Ensuite, **les versions de couleur d'un même modèle forment une seule fiche** avec un sélecteur de tissu en vignettes photo, et non plusieurs fiches presque identiques. La photo principale change quand la cliente choisit une autre version.

### E.3 La fiche produit : ce qui doit y figurer

Les informations obligatoires sont le nom, la référence, le prix, le délai, les tailles, le repère de taille du modèle, la matière, la règle de substitution, l'entretien, la livraison et le contact. Les informations facultatives sont la version de couleur, les photos de clientes et les modèles associés. Les informations à proscrire au lancement sont les avis par étoiles (sans volume, des avis vides nuisent plus qu'ils ne servent), les compteurs d'urgence (« plus que 2 ! »), qui n'ont aucun sens pour de la confection, et les fenêtres surgissantes.

### E.4 La sélection de la taille

C'est le point de décision le plus sensible pour une pièce confectionnée.

**Tailles standard.** Les cases carrées XS à 3XL sont affichées dans l'ordre et toutes de la même largeur, ce qui évite de stigmatiser les grandes tailles. Une case choisie passe en aplat Encre. Si une taille n'est pas proposée pour un modèle, la case est barrée d'une diagonale Sable et reste lisible.

**Guide des tailles.** Il s'ouvre en panneau, sans quitter la fiche. Il contient un tableau en centimètres (tour de poitrine, tour de taille, tour de hanches) et un petit schéma au trait fin montrant où mesurer. Pour les robes longues et les boubous, la longueur est indiquée en cm et rapportée à la hauteur de la cliente.

**« Sur mes mesures ».** C'est une option sous les tailles, qui déplie quatre champs : tour de poitrine, tour de taille, tour de hanches, hauteur, avec un champ libre facultatif (« Une précision ? Ex. : manches plus longues »). Une case alternative indique « Je ne connais pas mes mesures, l'atelier m'appelle ». L'option rend visible un service que Lacouture rend déjà et que les grandes enseignes ne peuvent pas offrir. Le supplément éventuel doit être affiché à côté de l'option.

**Pièces amples.** Pour les kaftans et boubous en taille unique, le sélecteur est remplacé par « Taille unique, ajustée à votre hauteur » et un seul champ hauteur.

### E.5 Le formulaire de commande

Le principe est de **demander tout ce dont l'atelier a besoin, et rien d'autre**. Le formulaire compte six champs obligatoires dans le cas le plus courant.

**1. Vos coordonnées**
- Nom complet (un seul champ).
- Téléphone, avec l'indicatif +225 prérempli et modifiable, et le clavier numérique. Une case cochée par défaut indique « Ce numéro est sur WhatsApp ».
- E-mail, facultatif et présenté comme tel.

**2. Livraison**
- Mode : livraison à Abidjan, livraison hors Abidjan, ou retrait à l'atelier si c'est possible. Ce sont des options en cases larges, avec le prix affiché pour chacune.
- Commune : une liste (Cocody, Plateau, Marcory, Yopougon, Abobo, Koumassi, Treichville, Adjamé, Port-Bouët, Attécoubé, Bingerville, Anyama, Songon…). Le frais de livraison se met à jour dès le choix.
- Quartier : un champ texte.
- Point de repère : un champ texte avec un exemple (« Ex. : après la pharmacie, portail bleu »). Les adresses d'Abidjan fonctionnent par repères et non par numéro de rue. Un formulaire qui demande un code postal et une rue montre qu'il n'a pas été pensé pour ses clientes.
- La case « C'est un cadeau » déplie le nom et le téléphone de la personne destinataire, un message à joindre et l'option de masquer le prix.

**3. Votre date**
- « Pour quand en avez-vous besoin ? », un sélecteur de date facultatif. La réponse s'affiche en direct : « C'est faisable : livraison prévue avant le 14 novembre » en Palme, ou « Délai serré : l'atelier vous contacte avant de commencer » en Taupe. La commande n'est jamais bloquée, la cliente est informée.

**4. Récapitulatif et paiement**
- Les pièces avec leur taille ou leurs mesures, le sous-total, la livraison et le total.
- Le rappel des règles en trois lignes (délai, tissu, retouche), placé **au-dessus** du bouton de paiement.
- Le choix du moyen de paiement parmi ceux que la clientèle utilise au quotidien. Le choix des solutions relève d'une autre phase.
- Le bouton « Payer 47 000 FCFA ».

**Règles de formulaire.** Les libellés sont toujours visibles au-dessus des champs, jamais en placeholder seul. Les champs font au moins 52 px de haut avec un texte de 16 px (en dessous, iOS zoome automatiquement sur le champ). Chaque champ est validé quand on le quitte, pas pendant la frappe. Les erreurs sont affichées sous le champ en Garance avec une phrase qui explique comment corriger. Les saisies sont conservées si la cliente quitte la page et revient. Aucune création de compte n'est proposée.

### E.6 La réassurance

La réassurance est placée **au moment où le doute apparaît** plutôt que regroupée dans une page que personne ne lit.

| Moment | Doute | Réponse |
|---|---|---|
| Fiche, sous le prix | « Quand vais-je la recevoir ? » | Le délai de confection |
| Fiche, à la taille | « Est-ce que ça va m'aller ? » | Le guide, le repère du modèle, l'option mesures, la retouche |
| Fiche, à la photo | « La pièce sera-t-elle comme la photo ? » | La vue atelier, les photos de clientes, la règle tissu |
| Fiche, en bas | « Qui sont ces gens ? » | « Confection à Cocody », le lien La Maison, Instagram |
| Formulaire, à la date | « Ce sera prêt à temps ? » | La vérification en direct |
| Avant de payer | « Est-ce sûr ? Et s'il y a un problème ? » | Le rappel des règles, le paiement reconnu, WhatsApp à portée |
| Après le paiement | « Ça a marché ? Et maintenant ? » | Le numéro, le suivi, le message reçu, le contact |

### E.7 Après la commande : besoins fonctionnels côté atelier

Ces besoins sont décrits sans préjuger des outils.

1. **Notification immédiate** de chaque commande payée, avec toutes les informations au même endroit.
2. **Liste des commandes** triée par date de livraison promise, avec les commandes à échéance serrée signalées.
3. **Fiche de commande** qui reprend la fiche d'atelier : référence, taille ou mesures, coordonnées, livraison, date, message cadeau, montant.
4. **Contact en un geste** : ouvrir une conversation WhatsApp avec la cliente, avec un message prérempli contenant le numéro de commande.
5. **Statuts** : Reçue, Confirmée, En confection, Prête, En livraison, Livrée. Chaque changement de statut peut prévenir la cliente.
6. **Validation de substitution de tissu** : proposer une matière à la cliente et enregistrer sa réponse.
7. **Gestion du catalogue** par la vendeuse elle-même : publier, masquer ou archiver un modèle, modifier prix, délai, tailles et promotion, ajouter des photos.
8. **Demandes sur mesure** reçues séparément des commandes.

---

## F. Spécifications responsive

### F.1 Principes mobiles

Le mobile est la version de référence. La cliente arrive d'Instagram, sur son téléphone, souvent avec des données mobiles limitées.

- **Une colonne, une décision à la fois.** Chaque écran pose une question principale.
- **Les actions sont à portée du pouce.** Le bouton principal de la fiche est doublé par la barre fixe du bas, et le panneau de commande monte du bas.
- **Les zones tactiles font au moins 48 × 48 px**, cases de taille comprises, avec 8 px d'écart au minimum.
- **Les photos occupent toute la largeur.** Le catalogue est en deux colonnes, jamais trois.
- **Le menu s'ouvre en plein écran** sur fond Ivoire, avec les cinq entrées en Bodoni de 32 px. C'est un moment éditorial assumé, et non une liste de liens grise.
- **La sobriété est aussi une question de poids.** Les images sont servies à la taille de l'écran et chargées au fur et à mesure du défilement. Deux familles de caractères et quatre graisses suffisent. Il n'y a ni vidéo en lecture automatique sur l'accueil ni carrousel automatique. Une page qui charge vite sur un réseau 4G moyen à Abidjan vaut plus qu'un effet visuel.
- **Le clavier adapté** apparaît pour chaque champ (numérique pour le téléphone, e-mail pour l'e-mail).

### F.2 Principes desktop

Le desktop prolonge le système sans changer de logique.

- **En-tête** : les cinq entrées de navigation à gauche, le wordmark au centre, Aide, WhatsApp et Commande à droite.
- **Couverture** : l'image occupe les colonnes 1 à 7, le nom de collection en Bodoni de 120 à 160 px commence en colonne 6 et chevauche le bord droit de l'image. Le texte et le lien occupent les colonnes 9 à 12.
- **Boutique** : trois colonnes (quatre au-delà de 1 440 px), gouttière de 24 px.
- **Fiche** : la galerie occupe les colonnes 1 à 7, avec les images empilées verticalement deux par deux en 4:5 (la première en pleine largeur de la zone). La colonne d'information occupe les colonnes 9 à 12 et reste fixe pendant le défilement des images. Il n'y a pas de barre d'achat fixe en bas.
- **Finalisation** : le formulaire occupe les colonnes 1 à 7 et le récapitulatif fixe les colonnes 9 à 12.
- **Confirmation** : la fiche d'atelier est centrée sur 6 colonnes.
- **Survol** : sur les cartes, la seconde photo (le dos) apparaît en fondu. Sur les liens, le soulignement passe au Rose Fil.

### F.3 Tableau de correspondance

| Élément | Mobile | Desktop |
|---|---|---|
| Couverture | Image pleine largeur, titre 56 px chevauchant le bas | Image sur 7 colonnes, titre 120 à 160 px chevauchant le bord droit |
| Catalogue | 2 colonnes, gouttière 12 px | 3 ou 4 colonnes, gouttière 24 px |
| Galerie de fiche | Défilement horizontal, Fil de progression | Empilement vertical, colonne d'info fixe |
| Achat | Bouton et barre fixe en bas | Bouton dans la colonne fixe |
| Panneau de commande | Monte du bas, 85 % de la hauteur | Glisse de la droite, 420 px de large |
| Formulaire | Une colonne, récapitulatif replié en haut | Deux zones, récapitulatif fixe à droite |
| Menu | Plein écran, Bodoni 32 px | Navigation horizontale, Jost capitales 13 px |
| Espacement entre sections | 64 px | 128 px |

---

## G. Référentiel de design

Les valeurs suivantes sont les tokens de référence pour la phase de conception UI et de développement.

### G.1 Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `color.bg.default` | `#F7F2EB` Ivoire | Fond des pages |
| `color.bg.subtle` | `#EFE6DA` Lin | Sections alternées, Étiquette, récapitulatif |
| `color.bg.inverse` | `#16120F` Encre | Sections Box, confirmation, pied de page |
| `color.border.default` | `#DCCFBF` Sable | Séparateurs, cases de taille |
| `color.border.strong` | `#7A6A5B` Taupe | Contour des champs de formulaire |
| `color.text.default` | `#16120F` Encre | Texte principal |
| `color.text.muted` | `#7A6A5B` Taupe | Texte secondaire |
| `color.text.inverse` | `#F7F2EB` Ivoire | Texte sur Encre |
| `color.accent` | `#A8456B` Rose Fil | Fil, promotion, état actif sur fond clair |
| `color.accent.inverse` | `#E8C5D4` Rose Poudre | Fil, logo, titres sur fond Encre |
| `color.action.primary` | `#16120F` Encre | Bouton principal |
| `color.action.primary.hover` | `#2E2620` | Survol du bouton principal |
| `color.feedback.error` | `#B0322A` Garance | Erreurs |
| `color.feedback.success` | `#3D6B4F` Palme | Validation |

### G.2 Typographie

| Token | Famille | Taille mobile / desktop | Graisse | Interligne | Interlettrage |
|---|---|---|---|---|---|
| `type.cover` | Bodoni Moda | 56 / 120 à 160 px | 400 | 0,9 | −0,01 em |
| `type.h1` | Bodoni Moda | 32 / 48 px | 400 | 1,05 | 0 |
| `type.product-name` | Bodoni Moda | 30 / 40 px | 400 | 1,1 | 0 |
| `type.h3` | Jost | 18 / 20 px | 500 | 1,3 | 0 |
| `type.body` | Jost | 16 / 17 px | 400 | 1,55 | 0 |
| `type.small` | Jost | 14 px | 400 | 1,45 | 0 |
| `type.overline` | Jost | 12 px | 500 | 1,3 | 0,14 em, capitales |
| `type.price` | Jost | 17 / 18 px | 500 | 1,2 | 0, chiffres tabulaires |
| `type.button` | Jost | 14 px | 500 | 1 | 0,1 em, capitales |
| `type.card-name` | Jost | 15 px | 500 | 1,3 | 0 |

Règle : `Bodoni Moda` n'est jamais utilisé en dessous de 24 px.

### G.3 Espacements

| Token | Valeur | Usage type |
|---|---|---|
| `space.1` | 4 px | Écart icône/texte |
| `space.2` | 8 px | Écart entre cases de taille |
| `space.3` | 12 px | Gouttière mobile, écart image/nom de carte |
| `space.4` | 16 px | Écart entre champs liés |
| `space.5` | 24 px | Écart entre blocs d'une section, gouttière desktop |
| `space.6` | 32 px | Écart entre rangées de catalogue |
| `space.7` | 48 px | Écart entre sous-sections |
| `space.8` | 64 px | Écart entre sections (mobile) |
| `space.9` | 96 px | Écart entre sections (tablette) |
| `space.10` | 128 px | Écart entre sections (desktop) |

### G.4 Rayons, bordures, élévation, mouvement

| Token | Valeur | Note |
|---|---|---|
| `radius.none` | 0 | **Valeur unique pour tout le site** : boutons, champs, cases, images, panneaux. L'angle vif est une signature. |
| `border.hairline` | 1 px | Séparateurs, contours |
| `border.focus` | 2 px Encre, décalage 2 px | Focus clavier visible sur tous les éléments interactifs |
| `elevation` | Aucune ombre | Les panneaux et la barre fixe sont séparés par un filet `border.hairline` Sable |
| `overlay` | Encre à 40 % | Fond derrière les panneaux |
| `motion.fast` | 150 ms | Changement d'état (case sélectionnée) |
| `motion.base` | 250 ms | Panneaux, apparition d'images |
| `motion.slow` | 400 ms | Tracé du Fil |
| `motion.easing` | `cubic-bezier(0.2, 0, 0, 1)` | Courbe unique |

### G.5 Composants principaux

**Bouton principal.** Hauteur 52 px (mobile) et 48 px (desktop), marge interne horizontale 24 px, pleine largeur sur mobile dans la fiche et le formulaire, aplat Encre, texte Ivoire `type.button`, angles vifs. Au survol, il passe à `#2E2620`. Désactivé, il est sur fond Lin avec texte Taupe, et un texte d'aide explique pourquoi (« Choisissez une taille »). Pendant le chargement, le texte est remplacé par « Un instant… » et la largeur ne change pas.

**Bouton secondaire.** Mêmes dimensions, fond transparent, contour 1 px Encre, texte Encre. Sur fond Encre, il a un contour et un texte Ivoire.

**Lien.** Texte `type.body` ou `type.small` avec soulignement 1 px décalé de 4 px. À l'état actif ou au survol, le soulignement passe au Rose Fil.

**Case de taille.** 48 × 48 px minimum (s'élargit pour « 2XL »), contour 1 px Sable, texte Jost 15 px Encre. Sélectionnée, elle passe en aplat Encre avec texte Ivoire. Indisponible, elle porte une diagonale Sable et un texte Taupe. Le focus clavier est indiqué par `border.focus`.

**Champ de saisie.** Libellé `type.small` 500 Encre au-dessus, champ de 52 px de haut, contour 1 px Taupe, fond Ivoire, texte 16 px. Au focus, le contour passe à 2 px Encre. En erreur, le contour passe en Garance avec le message dessous en `type.small` Garance. Le texte d'aide est en `type.small` Taupe sous le champ.

**Option en case large** (mode de livraison, moyen de paiement). Rectangle pleine largeur, contour 1 px Sable, marge interne 16 px, libellé à gauche, prix à droite. Sélectionnée, elle a un contour 2 px Encre et un repère rond rempli.

**Carte modèle.** Image 4:5 sans contour, puis `space.3`, puis le nom en `type.card-name`, puis le prix en `type.price` (ou prix barré Taupe suivi du prix Rose Fil), puis le délai en `type.small` Taupe. Au plus un badge.

**Badge.** Rectangle Ivoire, marge interne 4 × 8 px, Jost 500 11 px capitales, interlettrage 0,12 em, posé à 8 px du coin haut gauche de l'image.

**Étiquette.** Fond Lin, marge interne 20 px, lignes de 44 px minimum séparées par des filets Sable. Le libellé `type.overline` Taupe occupe une colonne de 110 px et la valeur `type.body` Encre le reste.

**Fil.** Ligne de 1 px en `color.accent` (ou `color.accent.inverse` sur Encre). Comme indicateur de galerie, la portion parcourue est en Rose et le reste en Sable. Comme progression de commande, une ligne verticale relie les numéros de section. Comme ouverture de surtitre, un trait de 32 px est suivi de 12 px d'espace.

**Barre d'achat fixe (mobile).** Hauteur 72 px avec la zone de sécurité du téléphone en plus, fond Ivoire, filet Sable en haut, nom abrégé et prix à gauche, bouton principal compact (44 px de haut) à droite.

**Accordéon.** Titre `type.h3` avec icône plus/moins à droite, ligne de 56 px de haut, filet Sable entre chaque élément, ouverture en 250 ms.

**Panneau.** Fond Ivoire, angles vifs, en-tête 56 px avec titre et bouton fermer, fond de page assombri par `overlay`.

**Lien WhatsApp.** Icône monochrome Encre de 20 px suivie du texte « Écrivez-nous sur WhatsApp » en lien souligné. Le message prérempli est : « Bonjour Lacouture, j'ai une question sur le modèle [Nom] (Réf. [REF]). »

**Suivi de commande.** Étapes verticales reliées par le Fil : un cercle de 12 px plein en Rose Poudre pour une étape franchie, un contour seul pour une étape à venir, un libellé `type.body` et la date en `type.small`.

### G.6 Accessibilité

Tous les textes respectent un contraste d'au moins 4,5:1 (et 3:1 pour les éléments graphiques). Le focus clavier est visible partout. Chaque photo produit a une description utile (« Robe Awa portée de dos, décolleté licou, crêpe jaune pâle »). Aucune information ne repose sur la couleur seule : une promotion est à la fois en Rose Fil et barrée, une erreur est à la fois en Garance et accompagnée d'un texte. La structure des titres est correcte et les animations respectent la préférence de mouvement réduit.

---

## H. Justification des décisions

| Décision | Pourquoi elle correspond à Lacouture | Problème résolu |
|---|---|---|
| Afficher un délai de confection plutôt qu'un stock | Lacouture se définit elle-même comme une maison de confection | La cliente sait quand elle sera servie, ce qui évite les questions privées et les déceptions |
| Demander la date de l'événement | Les tenues sont des tenues d'occasion | La faisabilité est vérifiée avant le paiement et l'atelier peut prioriser |
| Option « Sur mes mesures » | L'atelier fait déjà du sur-mesure et propose XS à 2XL et plus | La peur de la mauvaise taille diminue sur une pièce non retournable |
| Règle tissu écrite et validée | La story de 2023 admet la substitution des imprimés | L'écart entre photo et pièce reçue devient un service plutôt qu'une mauvaise surprise |
| Retouche offerte (à valider) | C'est un savoir-faire d'atelier, peu coûteux pour Lacouture | C'est la réassurance la plus forte avant un prépaiement |
| Garder WhatsApp comme canal de conseil | La relation humaine est l'atout principal de la marque et le canal de confiance local | Les hésitantes ne sont pas perdues et les commandes ne s'y dispersent plus |
| Demande « Sur mesure » séparée du panier | L'Option 1 est un vrai service mais n'a ni prix fixe ni photo maison | Le catalogue reste propre et les créations d'autres marques n'y figurent pas |
| Fond Ivoire plutôt que noir | La collection la plus récente se déroule dans un salon beige | Les photos, les peaux foncées et les tissus sombres sont lisibles, et la commande est confortable |
| Noir réservé à la Box, à la confirmation et au pied de page | La box noire est l'objet que la cliente reçoit | Le noir garde sa force et fait le lien entre le site et l'objet reçu |
| Rose limité au Fil (5 % au plus) | Le monogramme est une ligne rose fine, pas un aplat | Le cliché de la boutique féminine rose est évité tout en gardant la couleur de la marque |
| Bodoni Moda, jamais sous 24 px | Prolonge la couverture ICONIC | Une identité éditoriale sans perte de lisibilité sur les petits écrans Android |
| Jost pour l'interface | Écho direct au logotype géométrique | Cohérence avec le logo et lisibilité des prix et des formulaires |
| Angles vifs partout | La coupe nette du tailleur | Une rupture avec les pastilles de 2023 et les templates arrondis |
| Format 4:5 comme format maître | C'est le format natif des publications Instagram | Les photos existantes sont réutilisées sans recadrage destructeur |
| Photos produit toujours en couleur | On achète une couleur | Le noir et blanc d'ICONIC reste éditorial et ne trompe pas sur la pièce |
| Couverture qui déborde de l'image | Reprend le geste typographique d'ICONIC | Un accueil reconnaissable qui n'est pas une bannière de template |
| L'Étiquette | L'étiquette cousue est visible sur les pièces Lacouture | Les informations produit sont lisibles et rappellent la confection |
| Référence de modèle partagée avec Instagram | Les clientes découvrent par Instagram | La capture d'écran disparaît et la vendeuse identifie le modèle sans erreur |
| Formulaire avec commune et point de repère | Les adresses d'Abidjan fonctionnent par repères | La livraison est possible du premier coup, sans appel de clarification |
| Une page de finalisation, sans compte | Les achats sont ponctuels et la clientèle est sur mobile | Moins d'abandons, moins de données mobiles consommées |
| Pas d'avis notés, de recherche ni de liste d'envies au lancement | Le catalogue est réduit et l'activité est à taille humaine | Le site reste simple à utiliser et à tenir à jour par la vendeuse |
| Promotions réservées à des moments précis | La marque monte en gamme (« maison ») | Le prix normal reste crédible |

---

## 9. Questions à valider avec Lacouture

Ces réponses conditionnent plusieurs écrans. Elles doivent être obtenues avant la conception UI.

1. **Délais.** Quel est le délai réel de confection par famille (soirée, boubous, ensembles) ? Existe-t-il des pièces déjà prêtes en stock ?
2. **Prix.** Quelle est la fourchette de prix ? Le sur-mesure coûte-t-il plus cher qu'une taille standard ?
3. **Tailles.** Existe-t-il un tableau de mesures interne pour XS à 2XL ? Jusqu'à quelle taille va « ou plus » ?
4. **Tissus.** Chaque modèle existe-t-il dans plusieurs tissus ou couleurs ? Comment la substitution est-elle décidée aujourd'hui ?
5. **Après livraison.** Que se passe-t-il aujourd'hui si la taille ne va pas ? Une retouche offerte est-elle envisageable, et dans quel délai ?
6. **Livraison.** Quelles zones sont desservies (Abidjan, intérieur du pays, diaspora) et à quel prix ? Le retrait à l'atelier est-il possible ? Existe-t-il un lieu d'accueil à Cocody ?
7. **La box.** Est-ce un produit composé, un emballage premium systématique ou une option payante ? Que contient-elle ?
8. **Sur mesure (Option 1).** Quelle part des commandes représente-t-il ? Demandez-vous un acompte ?
9. **Volume.** Combien de commandes par semaine, et combien de modèles actifs à la fois ?
10. **Contenu.** Les fichiers originaux des shootings (ICONIC et autres) et le logo vectoriel sont-ils disponibles ?
11. **Nom public.** Quel nom de marque unique adopter : « Lacouture », « Lacouture Abidjan » ou « Maison Lacouture » ? Le double « e » de `maison.lacouturee` est difficile à retenir et à taper, ce qui compte pour l'adresse du futur site.
12. **Gestion.** Qui gérera le catalogue et les commandes au quotidien, et depuis quel appareil ?

### Actions rapides indépendantes du site

Ces actions améliorent la marque dès maintenant, avant le lancement du site :

- corriger les fautes des stories « About us » (« standarts », « LACOUTUTRE ») ou les remplacer ;
- fusionner les à la une « Réalisations » et « RÉALISATION », les renommer en français et refaire leurs couvertures dans la nouvelle palette (monogramme Rose Poudre sur Encre) ;
- donner un nom et une référence à chaque modèle publié, dès maintenant, dans les légendes Instagram.
