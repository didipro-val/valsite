# Backend de paiement Valmeo

Cloudflare Worker pour Stripe Checkout. Le site public ne reçoit jamais les numéros de carte et ne contient aucune clé Stripe.

## Architecture

- `POST /create-checkout-session` valide le panier avec `src/catalog.json`, réserve le stock et crée une session Stripe Checkout de 30 minutes.
- `GET /checkout-session` vérifie le statut du paiement au retour de Stripe.
- `POST /webhook` vérifie la signature Stripe, confirme le stock après paiement et libère une réservation expirée ou échouée.
- `GET /health` fournit un contrôle de disponibilité sans secret.

Le catalogue serveur est dérivé de `../script.js`. Après une modification de prix ou de produit, exécuter `pnpm run catalog` avant le déploiement.

## Configuration non secrète

Les variables suivantes sont dans `wrangler.jsonc` :

- `SITE_URL` : URL publique du site ;
- `ALLOWED_ORIGIN` : origine autorisée par CORS ;
- `INVENTORY_API_URL` : URL `/exec` publique du service Google Apps Script ;
- `SHIPPING_RATE_CENTS` : frais de port en centimes (`490`, soit 4,90 €) ;
- `SHIPPING_LABEL` : libellé affiché par Stripe.

## Secrets Cloudflare obligatoires

Créer une clé Stripe restreinte dans le sandbox avec uniquement :

- Checkout Sessions : écriture, pour créer les sessions ;
- Checkout Sessions : lecture, pour vérifier le paiement au retour.
- Customers : écriture, pour transmettre à Stripe les coordonnées saisies sur la page de livraison et préremplir le paiement.

Les secrets sont enregistrés dans le Secrets Store Cloudflare avec la portée `workers`, puis reliés au Worker dans `wrangler.jsonc` :

- `STRIPE_RESTRICTED_KEY` ;
- `INVENTORY_API_SECRET` ;
- `STRIPE_WEBHOOK_SECRET`.

`INVENTORY_API_SECRET` doit être identique à la propriété de script Google Apps Script du même nom. `STRIPE_WEBHOOK_SECRET` est fourni par Stripe après la création de l’endpoint `https://<worker>/webhook`.

## Déploiement de test

```powershell
pnpm install
pnpm run catalog
pnpm run check
pnpm exec wrangler login
pnpm run deploy
```

L’URL du Worker configurée dans `../script.js` est `https://valmeo-checkout.valmeo-creation.workers.dev`. Configurer ensuite le webhook Stripe avec les événements :

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`
- `checkout.session.expired`

Tester dans le sandbox avant de créer une clé restreinte et un webhook séparés pour la production.
