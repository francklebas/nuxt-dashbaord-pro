# API Documentation

Cette section documente les endpoints API disponibles dans l'application Nuxt Dashboard Pro.

## 📨 Waitlist (Liste d'attente)

Gestion des inscriptions à la liste d'attente.

### Inscription

Ajoute un nouvel utilisateur à la liste d'attente. Les données sont validées via Zod avant d'être traitées.

- **URL** : `/api/waitlist`
- **Méthode** : `POST`
- **Accès** : Public

#### Corps de la requête (JSON)

| Champ | Type | Requis | Description | Validation |
| :--- | :--- | :--- | :--- | :--- |
| `email` | `string` | **Oui** | Adresse email de l'utilisateur. | Format email valide. |
| `name` | `string` | Non | Nom complet. | Minimum 2 caractères. |
| `plan` | `string` | Non | Plan d'intérêt sélectionné. | Valeurs : `"current"`, `"v1"`, `"v2"`. |

#### Réponses

**✅ 200 OK - Succès**

```json
{
  "success": true,
  "message": "Successfully added to waitlist",
  "data": {
    "email": "exemple@domaine.com"
  }
}
```
**❌ 400 Bad Request - Erreur de validation**
```json
{
  "statusCode": 400,
  "statusMessage": "Validation error",
  "data": {
    "errors": [
      {
        "field": "email",
        "message": "Invalid email address"
      }
    ]
  }
}
```
**❌ 500 Internal Server Error**
```json
{
  "statusCode": 500,
  "statusMessage": "Internal server error"
}
```
**🛠 Extension Future**
Pour ajouter de nouveaux endpoints, créez de nouveaux fichiers dans le dossier server/api/. Nuxt générera automatiquement les routes correspondantes.

Exemple : server/api/users.get.ts créera une route GET /api/users.
