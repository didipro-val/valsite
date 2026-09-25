# Service de stock Valmeo

Ce projet Google Apps Script expose la lecture publique des stocks et des opérations privées pour le Worker de paiement :

- `GET ?action=stocks` : lecture des stocks de l'onglet `Catalogue` ;
- `POST action=reserve` : réservation atomique couvrant la session Stripe de 30 minutes ;
- `POST action=confirm` : décrémentation après confirmation Stripe puis envoi des e-mails client et vendeur ;
- `POST action=release` : libération après annulation ou expiration.
- `POST action=status` : statut interne de la commande et de l’e-mail de confirmation.

Le script utilise la colonne `K` (`Référence`) comme identifiant stable et la colonne `F` (`Stock`) comme quantité disponible. Les commandes déjà traitées sont reconnues par leur `orderId`, ce qui évite une double décrémentation lors d'un nouvel envoi réseau.

## Suivi des expéditions La Poste

Exécuter une seule fois la fonction `installerSuiviExpeditions` dans Apps Script, puis accepter les autorisations demandées. Cette fonction :

- crée l'onglet `Expéditions` dans le classeur ;
- installe un déclencheur lié au tableur ;
- permet l'envoi automatique de l'e-mail de suivi.

Chaque commande payée ajoute une ligne dans cet onglet. Lorsque le colis est affranchi, saisir le numéro La Poste dans la colonne `Numéro de suivi`. Le client reçoit alors automatiquement un e-mail avec sa référence, son numéro de suivi et un bouton vers le suivi La Poste. La colonne `E-mail de suivi envoyé le` empêche les doublons ; l'effacer permet un nouvel envoi après correction du numéro.

Avant le déploiement, ajouter une propriété de script `INVENTORY_API_SECRET` contenant un secret aléatoire long. La même valeur doit être enregistrée comme secret `INVENTORY_API_SECRET` dans Cloudflare. Ne jamais placer cette valeur dans le site public ou dans Git.

La notification vendeur est envoyée au compte Google propriétaire du déploiement. Pour utiliser une autre adresse, ajouter la propriété de script facultative `ORDER_NOTIFICATION_EMAIL`.

Déploiement attendu : application web exécutée avec le compte propriétaire du classeur. L'URL `/exec` doit être configurée dans `script.js` pour la lecture publique des stocks et dans `worker/wrangler.jsonc` pour les opérations privées.
