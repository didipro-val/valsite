# Valmeo Creation

Site vitrine et boutique statique pour Valmeo Creation, inspire du compte public Instagram `@valmeo.creation`.

## Ouvrir le site

Ouvrir `index.html` dans un navigateur.

## Remplacer les visuels

La photo de profil publique Instagram est stockee dans `assets/valmeo-profile.jpg`. Les visuels produit sont copies depuis `C:\Users\vileurbanne\Pictures\valmeo` vers `assets/valmeo`.

1. creer un dossier `assets`;
2. y ajouter les photos produit;
3. remplacer les URLs `image` dans `script.js` par des chemins comme `assets/bracelet-soline.jpg`;
4. remplacer les images de `index.html` pour le hero et l'atelier.

## Fonctionnement boutique

Le panier et les filtres fonctionnent cote navigateur. Les quantites sont synchronisees avec le Google Sheet `catalogue-sites-saugardevalerie` par le service contenu dans `google-apps-script/`. Le paiement passe par Stripe Checkout via le Cloudflare Worker contenu dans `worker/`. Le Worker reserve le stock avant le paiement, puis le webhook Stripe confirme la commande ou libere la reservation. L'integration publiee utilise actuellement l'environnement de test Stripe.

## Ajouter des articles « Esprit nature »

1. Dans le Google Sheet `catalogue-sites-saugardevalerie`, ouvrir l'onglet `Ajout articles`.
2. Ajouter les photos dans le dossier Drive « Esprit nature » accessible depuis le lien en haut de l'onglet.
3. Compléter une ligne par article. La catégorie `Esprit nature` est déjà sélectionnée par défaut.
4. Quand la colonne `Contrôle` indique `Prêt`, cocher `À publier`.
5. Attendre que la colonne `Contrôle` affiche `Publié`. L'article, ses photos, sa miniature, son stock et son prix sont alors disponibles automatiquement sur le site et pour le paiement.

La publication automatique est assurée par le déclencheur Apps Script `publierArticles_` et le catalogue dynamique Cloudflare KV. La fonction `installerPublicationAutomatique` doit être exécutée une seule fois après l'installation ou une réautorisation du script.

## Modifier un article existant

Dans l'onglet `Catalogue`, corriger les informations de la ligne sans changer la colonne `Référence`. Ajouter facultativement de nouveaux liens Google Drive dans les colonnes `Nouvelle photo principale`, `Nouvelle photo 2` et `Nouvelle photo 3`, puis cocher `Mettre à jour`. La colonne `Statut mise à jour` confirme la synchronisation avec le site ou contient une note détaillant l'erreur. Sans nouveau lien photo, les images actuelles sont conservées.

La valeur `Esprit nature` du catalogue est convertie en identifiant technique `esprit-nature` pour le filtre du site. Les articles importés doivent donc conserver exactement ce nom de catégorie dans le Google Sheet.
