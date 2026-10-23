# Service de stock Valmeo

Ce projet Google Apps Script expose la lecture publique des stocks et des opérations privées pour le Worker de paiement :

- `GET ?action=stocks` : lecture des stocks de l'onglet `Catalogue` ;
- `POST action=reserve` : réservation atomique couvrant la session Stripe de 30 minutes ;
- `POST action=confirm` : décrémentation après confirmation Stripe puis envoi des e-mails client et vendeur ;
- `POST action=release` : libération après annulation ou expiration.
- `POST action=status` : statut interne de la commande et de l’e-mail de confirmation.

Le script utilise la colonne `K` (`Référence`) comme identifiant stable et la colonne `F` (`Stock`) comme quantité disponible. Les commandes déjà traitées sont reconnues par leur `orderId`, ce qui évite une double décrémentation lors d'un nouvel envoi réseau.

## Publication automatique des articles

Exécuter une seule fois la fonction `installerPublicationAutomatique` puis accepter les autorisations Google demandées. Quand une case `À publier` est cochée sur une ligne dont le contrôle affiche `Prêt`, le script :

- lit les informations et les photos Drive de la ligne ;
- publie le produit et ses images dans le catalogue dynamique Cloudflare ;
- ajoute la ligne et la miniature dans l'onglet `Catalogue` ;
- laisse la formule de contrôle confirmer le statut `Publié`.

En cas d'échec, la case est décochée et le détail de l'erreur est ajouté comme note dans la cellule `Contrôle`.

### Noms déjà utilisés

Dans `Ajout articles`, la formule de contrôle en `B5` vérifie les noms saisis en `F5:F300` contre les titres de `Catalogue!E2:E` et les autres lignes d’ajout. Elle ignore la casse, les accents et les espaces superflus. Un doublon affiche `Nom déjà utilisé` dans `Contrôle`, avec le nom et le contrôle en rouge et un avertissement de validation sur le nom. Comme le déclencheur ne publie que les lignes `Prêt`, une nouvelle ligne en doublon ne peut pas être publiée. Les lignes déjà publiées restent `Publié`.

Le 23 octobre 2026, les doublons ont été distingués dans les titres et descriptions : Cléa des Florales devient Clém (`clea-2`), Violetta à 12 € devient Violine (`violetta-2`), Violetta à 8 € devient Amethyste (`violetta`), et Rosélia des Façonnées devient Lyséa (`roselia`). La Cléa des Façonnées, la Violetta à 10 € et la Rosélia des Florales conservent leur nom. Les références techniques restent stables pour les stocks, paniers et commandes. Les galeries du site ont aussi été séparées pour ne plus mélanger les photos des modèles homonymes.

Les codes de choix d’attache sont transmis au service de publication pour les ajouts et les mises à jour :

- `Aucun` : aucun choix ;
- `C1` : Attache dorée ou Attache argentée ;
- `C2` : Attache dorée ou Pince à vis dorée ;
- `C3` : Attache argent ou Pince à vis argent.

Les listes Google Sheets sont dans `Ajout articles!E5:E300` et `Catalogue!D2:D1000`. Le client doit choisir une option avant l’ajout au panier pour C1, C2 et C3.

Le même déclencheur gère les modifications depuis l'onglet `Catalogue` :

- modifier les informations sans jamais changer la `Référence` ;
- renseigner facultativement `Nouvelle photo principale`, `Nouvelle photo 2` et `Nouvelle photo 3` avec des liens Google Drive ;
- cocher `Mettre à jour` ;
- consulter `Statut mise à jour` pour confirmer la publication ou lire le détail d'une erreur.

Relancer `installerPublicationAutomatique()` prépare automatiquement ces colonnes et conserve un seul déclencheur `Lors d'une modification`.

## Suivi des expéditions La Poste

Exécuter une seule fois la fonction `installerSuiviExpeditions` dans Apps Script, puis accepter les autorisations demandées. Cette fonction :

- crée l'onglet `Expéditions` dans le classeur ;
- installe un déclencheur lié au tableur ;
- permet l'envoi automatique de l'e-mail de suivi.

Chaque commande payée ajoute une ligne dans cet onglet. Lorsque le colis est affranchi, saisir le numéro La Poste dans la colonne `Numéro de suivi`. Le client reçoit alors automatiquement un e-mail avec sa référence, son numéro de suivi et un bouton vers le suivi La Poste. La colonne `E-mail de suivi envoyé le` empêche les doublons ; l'effacer permet un nouvel envoi après correction du numéro.

Avant le déploiement, ajouter une propriété de script `INVENTORY_API_SECRET` contenant un secret aléatoire long. La même valeur doit être enregistrée comme secret `INVENTORY_API_SECRET` dans Cloudflare. Ne jamais placer cette valeur dans le site public ou dans Git.

La notification vendeur est envoyée au compte Google propriétaire du déploiement. Pour utiliser une autre adresse, ajouter la propriété de script facultative `ORDER_NOTIFICATION_EMAIL`.

Déploiement attendu : application web exécutée avec le compte propriétaire du classeur. L'URL `/exec` doit être configurée dans `script.js` pour la lecture publique des stocks et dans `worker/wrangler.jsonc` pour les opérations privées.
