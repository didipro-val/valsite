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
