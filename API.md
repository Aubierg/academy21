# ATO Paris — Documentation API Backend

Base URL : `http://localhost:3001`

## Auth

### Register
POST /api/auth/register
```json
{ "email": "user@ato.com", "password": "motdepasse" }
```
Réponse : `{ token, user: { id, email, role } }`

### Login
POST /api/auth/login
```json
{ "email": "user@ato.com", "password": "motdepasse" }
```
Réponse : `{ token, user: { id, email, role } }`

### Mon profil
GET /api/auth/me
Header : `Authorization: Bearer TOKEN`

---

## Formations

### Liste toutes les formations
GET /api/formations

### Une formation
GET /api/formations/:id

### Créer (admin)
POST /api/formations
Header : `Authorization: Bearer TOKEN`
```json
{
  "title": "Business Show Paris",
  "description": "Formation entrepreneuriat",
  "price": 299.00,
  "imageUrl": "https://..."
}
```

### Modifier (admin)
PUT /api/formations/:id
Header : `Authorization: Bearer TOKEN`

### Supprimer (admin)
DELETE /api/formations/:id
Header : `Authorization: Bearer TOKEN`

---

## Événements

### Liste tous les événements
GET /api/events

### Un événement
GET /api/events/:id

### Créer (admin)
POST /api/events
Header : `Authorization: Bearer TOKEN`
```json
{
  "title": "Leadercamp Paris 2026",
  "description": "Événement annuel",
  "date": "2026-06-15",
  "price": 149.00
}
```

---

## Paiements

### Stripe Checkout
POST /api/payments/checkout
Header : `Authorization: Bearer TOKEN`
```json
{
  "formationId": "uuid-de-la-formation",
  "amount": 299.00,
  "title": "Business Show Paris"
}
```
Réponse : `{ url }` → rediriger le navigateur vers cette URL

### PayPal
POST /api/payments/paypal/create
Header : `Authorization: Bearer TOKEN`
```json
{
  "formationId": "uuid-de-la-formation",
  "amount": 299.00,
  "title": "Business Show Paris"
}
```
Réponse : `{ url, orderId }` → rediriger vers url

### Historique paiements
GET /api/payments/my
Header : `Authorization: Bearer TOKEN`

---

## Espace Membre

### Dashboard
GET /api/member/dashboard
Header : `Authorization: Bearer TOKEN`
Réponse :
```json
{
  "user": { "id", "email", "role", "memberSince" },
  "payments": [...],
  "totalSpent": 299
}
```

### Historique paiements confirmés
GET /api/member/payments
Header : `Authorization: Bearer TOKEN`

---

## Codes d'erreur

| Code | Signification |
|------|--------------|
| 401 | Token manquant ou invalide |
| 403 | Accès réservé aux membres |
| 404 | Ressource introuvable |
| 429 | Trop de requêtes |
| 500 | Erreur serveur |

---

## URLs de redirection paiement

Après paiement réussi : `FRONTEND_URL/paiement/succes?session_id=xxx`
Après paiement échoué : `FRONTEND_URL/paiement/echec`

## Token
Stocker dans localStorage sous la clé `ato_token`
Header pour routes protégées : `Authorization: Bearer TOKEN`