# Changelog
Toutes les modifications notables de l'API Business seront documentées dans ce fichier.

## [1.5.0] - 2026-08-27
### Added
- Endpoint `GET /participants` : consultation de la liste des participants raccordés à PI-SPI (code membre, nom, code banque si banque, statut PI)
- Scope OAuth2 `participant.read` : autorisation de consulter la liste des participants PI
- Endpoint `POST /paiements-envoyes` : parcours de paiement par IBAN (`payeIban` + `payeParticipant`) ou par numéro de compte (`payeOther` + `payeParticipant`), exclusifs avec le parcours par alias (`payeAlias`)
- La confirmation en deux étapes (`confirmation`) s'applique également aux parcours IBAN et numéro de compte
- Raisons de rejet `AC01` (compte inexistant chez le participant) et `AB05` (timeout de vérification d'identité) ajoutées à `PaiementStatutRaison` pour les paiements par IBAN ou numéro de compte

## [1.4.1] - 2026-07-22
### Changed
- Endpoint `GET /webhooks` : éléments de la liste basés sur le schéma `WebhookData` (sans le champ `secret`)

### Fixed
- Endpoint `GET /alias/{cle}` : réintégration du champ `categorie` dans la réponse
- Documentation de l'endpoint `PUT /paiements/{end2endId}/retours` : référence corrigée vers `GET /paiements/{end2endId}` (au lieu de `GET /paiements/{end2endId}/statuts`)
- Schéma `CompteTransfertIntraReponse` : correction de la valeur `REJJETE` en `REJETE`
- Exemple `CompteListe` : alignement du bloc `meta` sur le schéma `ListeMeta`

### Removed
- Paramètres de pagination de l'endpoint `GET /paiements-groupes` : la liste n'est pas paginée et ne supporte que le filtre `statut`

## [1.4.0] - 2026-02-20
### Added
- Contrôles dans la demande de paiement `DemandePaiementRequestBase`:
  - txId : longueur minimale de 1 caractère, longueur maximale de 35 caractères
  - logoUrl : longueur minimale de 1 caractère, longueur maximale de 140 caractères
  - motif : longueur minimale de 2 caractères, longueur maximale de 140 caractères
  - refDocNumero : longueur minimale de 1 caractère, longueur maximale de 35 caractères
  - montant : valeur minimale de 1
- Réponse `HTTP 409` si une transaction avec le même txId existe déja dans l'endpoint `POST /comptes/transactions`

### Fixed
- Modèle `ListeMeta`: champ `length` renommé en `total`
- Modèle `CompteOperationListe`: champ `length` renommé en `total`
- Noms des champs de recherche des transferts intra-comptes: `comptePayeur` en `payeurNumero`, `comptePaye` en `payeNumero`
- Champ `montantFrais` des champs requis pour les demandes de paiement PICO et PICASH

### Removed
- Champ `end2endId` des transferts intra-comptes
- Opérateur de recherche `endsWith` dans la documentation générale
- Champ `catégorie` des données retournées par l'endpoint `GET /alias/{cle}`


## [1.3.0] - 2025-12-17
### Added
- Séparation des endpoints de demande de paiement reçu et de demande de paiement envoyé
  - Ajout de l'endpoint `GET /demandes-paiements-recues`pour consulter les demandes de paiement reçues
  - Ajout de l'endpoint `GET /demandes-paiements-recues/{end2endId}`pour consulter une demande de paiement reçue
  - Remplacement de l'endpoint `PUT /demandes-paiements/{txId}/reponses` en `PUT /demandes-paiements-recus/{end2endId}/reponses`
- Séparation des endpoints de paiement reçu et de paiement envoyé
  - Ajout de l'endpoint `GET /paiements-recues`pour consulter les paiements reçues
  - Ajout de l'endpoint `GET /paiements-recues/{txId}`pour consulter un paiement reçu
  - Remplacement de l'endpoint `POST /paiements` en `POST /paiements-envoyes`
  - Remplacement de l'endpoint `POST /paiements/{txId}/confirmations` en `POST /paiements-envoyes/{txId}/confirmations`
  - Remplacement de l'endpoint `GET /paiements` en `GET /paiements-envoyes`
  - Remplacement de l'endpoint `GET /paiements/{txId}` en `GET /paiements-envoyes/{txId}`
- Ajout de la réponse `HTTP 409` si le webhook est déjà créé dans l'endpoint `POST /webhooks` pour la création d'un webhook
- Valeur `ACCEPTE` dans le schéma `AnnulationStatut` 
  
### Changed
- Remplacement de l'endpoint `GET /paiements/{end2endId}/statuts` en `GET /paiements/{end2endId}`
- L'endpoint `GET /demandes-paiements/{txId}` permet de consulter uniquement une demande de paiement envoyée
- Le champ `txId` dans le modèle `WebhookEvent` est désormais optionnel (retiré des champs requis)
- Le format du champ `dateOuverture` dans les modèles de compte (`Compte`, `CompteItem`, `CompteSolde`) est désormais au format `date` (YYYY-MM-DD)

### Fixed
- Correction de l'exemple de réponse d'annulation d'envoi d'un paiement à la confirmation - champ statutRaison supprimé
- Correction de l'exemple de demande de paiement acceptée: ajout des champs manquants endtoendId et payeAlias
- Correction de l'exemple de demande de paiement rejetée: ajout des champs manquants endtoendId et payeAlias
- Correction de l'exemple d'une liste de paiements reçus: le nombre d'elements est de 4 au lieu de 2
- Correction du format des champs `dateDemande` et `dateConfirmation` dans les exemples de paiement
- Correction du format des champs `dateDemande` et `dateLimitePaiement` dans les exemples de demande de paiement
- Correction de l'exemple de liste des webhooks
- Endpoint `PUT /paiements/{end2endId}/annulations/reponses` : remplacement de `"ACCEPTEE"` par `"ACCEPTE"` et `"REJETEE"` par `"REJETE"` dans les exemples

### Removed
- Champ `ville` du modèle d'enrôlement d'alias dans l'endpoint `GET /alias/{cle}`
- Valeur `IRREVOCABLE` du schéma `AnnulationStatut`


## [1.2.0] - 2025-11-25

### Added
- Endpoint `GET /comptes` qui permet de lister les comptes d'un client business 
- Endpoint `GET /alias/{cle}` qui permet au business de vérifier l'existence d'un alias
- Endpoint `GET /demandes-paiements-groupes` qui permet de lister les demandes de paiement en masse 
- Endpoint `GET /paiements-groupes` qui permet de lister les paiements en masse 
  

## [1.1.0] - 2025-10-27

### Added
- Exemple de réponse avec le statut `REJETE` pour l'endpoint `POST /comptes/transactions`
- Champ `statutRaison` ajouté à l'objet `CompteTransfertIntraReponse`
- Paramètre `txId` ajouté aux paramètres de requête de l'endpoint `GET /comptes/transactions` permettant de lister les transferts intra-comptes
- Endpoint `POST /webhooks/{id}/secrets` pour renouveler le secret utilisé pour un webhook
- Documentation sur l'idempotence pour l'endpoint `PUT /demandes-paiements/{txId}/reponses` de réponse aux demandes de paiement
- Liste des réponses possibles que le business peut retourner au participant lors de l'appel de l'endpoint configuré pour un webhook
- Raisons de rejet `AG01` et `AG08` pour les demandes d'annulation via l'endpoint `POST /paiements/{end2endId}/annulations/reponses`
- Raison de rejet `FF10` pour les demandes de paiement
- Raisons de rejet `FF10` et `AG07` ajoutées à `PaiementStatutRaison` et `RetourStatutRaison`
- Exemple de réponse pour la liste des alias `GET /comptes/{numero}/alias`
- Modèle de données de réponse à l'acceptation ou au rejet d'une demande de paiement
- Exemple de réponse à l'acceptation d'une demande de paiement
- Exemple de réponse au rejet d'une demnde de paiement
- Modèle de données de réponse à la modification d'un webhook
- Exemples de requêtes de modification de webhooks 
- Exemple de réponse `200` à la modification d'un webhook
- Attribut `dateModification` aux données d'un webhook `WebhookData`

### Changed
- L'endpoint `POST /comptes/transactions` retourne désormais un code HTTP 200 au lieu de 201 lors de l'envoi d'un transfert intra-comptes
- L'endpoint `/demandes-paiements/{txId}/reponses` utilise désormais la méthode HTTP PUT au lieu de POST pour répondre à une demande de paiement

### Fixed
- Correction du scope OAuth `compte_transaction.write` pour l'envoi d'un transfert intra-comptes via l'endpoint `POST /comptes/transactions`
- Correction du détail de l'erreur dans l'exemple de réponse 403 pour l'acceptation d'une demande de paiement déjà rejetée (endpoint `PUT /demandes-paiements/{txId}/reponses`)
- Correction du détail de l'erreur dans l'exemple de réponse 403 pour le rejet d'une demande de paiement déjà acceptée (endpoint `PUT /demandes-paiements/{txId}/reponses`)
- Ajout de la liste des valeurs possibles du champ type de l'alias  `type` dans le modèle `AliasCreationReponse`
- Ajout des états `IRREVOCABLE` et `REJETE` à la liste des états d'un transfert intra-comptes `CompteOperation.yml`
