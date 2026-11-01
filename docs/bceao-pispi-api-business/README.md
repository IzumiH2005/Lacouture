# PI-SPI (BCEAO) — API Business v1.5.0

Source : https://developer.pispi.bceao.int/api-business/ (récupéré le 2026-11-01)

- `spec-source/` : spécification OpenAPI 3.0.3 originale (`openapi.yml` + 245 fichiers référencés : schémas, paramètres, réponses, exemples) et `CHANGELOG.md`
- `openapi-bundled.yml` / `.json` : spécification en un seul fichier, toutes références externes résolues (importable dans Postman, Swagger UI, générateurs de code)

**Serveur sandbox** : `https://sandbox.api.pi-bceao.com/piz/v1`
**Sécurité** : en-tête `x-api-key` + OAuth2 client credentials (scopes `compte.read`, `compte_transaction.read/write`, `alias.read/write/delete`, `enrolement_alias.read`, `participant.read`, `webhook.*`, `paiement.*`, `demande_paiement.*`…)

## Endpoints (41)

| Domaine | Méthode | Chemin | Rôle |
|---|---|---|---|
| Comptes | GET | /comptes | Lister les comptes |
| | GET | /comptes/{numero} | Détails d'un compte |
| | POST / GET | /comptes/transactions | Transfert intra-comptes / lister |
| Alias | POST / GET | /comptes/{numero}/alias | Créer / lister des alias |
| | DELETE | /comptes/{numero}/alias/{cle} | Supprimer un alias |
| | GET | /alias/{cle} | Rechercher un alias |
| Participants | GET | /participants | Liste des participants PI |
| Webhooks | POST / GET | /webhooks | Créer / lister |
| | GET / PUT / DELETE | /webhooks/{id} | Lire / modifier / supprimer |
| | POST | /webhooks/{id}/secrets | Renouveler le secret |
| Demandes de paiement | POST / GET | /demandes-paiements | Envoyer / lister |
| | GET | /demandes-paiements/{txId} | Consulter |
| | PUT | /demandes-paiements/{txId}/confirmations | Confirmer |
| Demandes reçues | GET | /demandes-paiements-recues[/{end2endId}] | Lister / consulter |
| | PUT | /demandes-paiements-recues/{end2endId}/reponses | Accepter / rejeter |
| Demandes en masse | POST / GET | /demandes-paiements-groupes | Envoyer / lister |
| | GET | /demandes-paiements-groupes/{instructionId} | Détails |
| | PUT | /demandes-paiements-groupes/{instructionId}/confirmations | Confirmer |
| Paiements envoyés | POST / GET | /paiements-envoyes | Envoyer (alias, IBAN ou n° compte) / lister |
| | GET | /paiements-envoyes/{txId} | Détails |
| | PUT | /paiements-envoyes/{txId}/confirmations | Confirmer |
| Paiements reçus | GET | /paiements-recus[/{txId}] | Lister / détails |
| Vérification | GET | /paiements/{end2endId} | Vérifier un paiement |
| Paiements en masse | POST / GET | /paiements-groupes | Envoyer / lister |
| | GET | /paiements-groupes/{instructionId} | Détails |
| | PUT | /paiements-groupes/{instructionId}/confirmations | Confirmer |
| Retours | PUT | /paiements/{end2endId}/retours | Retourner les fonds |
| Annulations | POST | /paiements/{end2endId}/annulations | Demander l'annulation |
| | PUT | /paiements/{end2endId}/annulations/reponses | Répondre |

Erreurs au format RFC 7807 (Problem Details). Voir la description de `openapi.yml` pour la gestion des versions, l'idempotence, les webhooks et les codes de rejet (AC01, AB05, BE23, DU03…).
