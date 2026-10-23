# Valmeo Creation

Site vitrine et boutique statique pour Valmeo Creation, inspire du compte public Instagram `@valmeo.creation`.

## Ouvrir le site

Ouvrir `index.html` dans un navigateur.

## Référencement Google

Le fichier `sitemap.xml`, publié à la racine du domaine, liste les neuf pages publiques à proposer à Google. `robots.txt` autorise l'exploration et indique l'adresse du sitemap : `https://valmeocreation.fr/sitemap.xml`. Envoyer cette adresse dans le rapport « Sitemaps » de Google Search Console après validation du domaine.

Lors de la création d'une nouvelle page publique à référencer, ajouter son URL HTTPS complète au sitemap. Le parcours de paiement `commande.html` n'y figure pas. Les sections de l'accueil et les fiches produits ouvertes en fenêtre restent rattachées à la page d'accueil : elles n'ont actuellement pas d'URL de page distincte à ajouter. L'ajout d'un article par Google Sheets ne nécessite donc pas de modifier ce sitemap.

## Remplacer les visuels

La photo de profil publique Instagram est stockee dans `assets/valmeo-profile.jpg`. Les visuels produit sont copies depuis `C:\Users\vileurbanne\Pictures\valmeo` vers `assets/valmeo`.

1. creer un dossier `assets`;
2. y ajouter les photos produit;
3. remplacer les URLs `image` dans `script.js` par des chemins comme `assets/bracelet-soline.jpg`;
4. remplacer les images de `index.html` pour le hero et l'atelier.

## Fonctionnement boutique

### Nouveautés

Le filtre « Nouveautés », sélectionné à l’ouverture, réunit les 12 derniers modèles ajoutés de toutes les collections. Les nouveaux articles du catalogue dynamique sont classés selon leur première publication : une modification de prix, de stock ou de description ne remet pas un ancien modèle en tête. Les articles du catalogue initial servent de complément, dans l’ordre inverse de leurs lignes d’origine. Les autres filtres conservent leur classement habituel. Les prochains articles publiés depuis Google Sheets apparaissent automatiquement dans cette sélection ; aucune catégorie « Nouveautés » n’est à saisir dans le tableau.

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

## Statistiques de fréquentation (23 octobre 2026)

Cloudflare Web Analytics est installé sur les dix pages publiques via `analytics.js`. Tableau de bord (compte didipro@gmail.com) : https://dash.cloudflare.com/03d56eb619d7422eaec084d5e42a0425/web-analytics/overview?siteTag~in=af89415e17b84359b840592b85af6a00&excludeBots=Yes

Choisir la période dans le calendrier, puis « Visits » pour les visites ou « Page views » pour les pages consultées. Les statistiques débutent à l’installation ; aucun historique antérieur ne peut être reconstruit. Une visite n’est pas une personne unique. Les robots connus sont exclus par le filtre du tableau de bord ; refus du consentement et bloqueurs peuvent réduire la mesure. Les visites de vérification peuvent apparaître dans les premiers chiffres.

Le chargement du beacon officiel est conditionné au consentement. Le choix est mémorisé 180 jours dans `valmeo-analytics-consent-v1` ; il peut être changé sur `cookies.html`. Le retrait recharge la page pour arrêter le script. Ne pas insérer directement un deuxième beacon. Toute nouvelle page doit inclure `<script defer src="./analytics.js?v=1"></script>` avant `</body>`. Ne jamais ajouter de données client aux chemins des URL ou aux noms d’événements. Cloudflare conserve ces statistiques six mois ; prévoir des exports si une conservation plus longue est souhaitée.
