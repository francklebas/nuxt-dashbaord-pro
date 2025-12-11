# E2E Tests - Nuxt Dashboard Pro

Tests end-to-end utilisant Playwright pour valider le fonctionnement complet de l'application.

## Structure

```
tests/e2e/
├── utils/           # Utilitaires réutilisables
│   ├── auth.ts      # Helpers d'authentification
│   ├── i18n.ts      # Helpers d'internationalisation
│   └── helpers.ts   # Helpers généraux
├── fixtures/        # Données de test
├── screenshots/     # Screenshots des tests échoués
├── auth.spec.ts     # Tests d'authentification
├── navigation.spec.ts  # Tests de navigation
├── settings.spec.ts    # Tests de la page Settings
├── dashboard.spec.ts   # Tests de la page Dashboard
└── i18n.spec.ts        # Tests d'internationalisation
```

## Prérequis

1. **Installation de Playwright**
   ```bash
   npm install
   npx playwright install chromium
   ```

2. **Arch Linux - Dépendances système**
   ```bash
   # Installer les dépendances si nécessaire
   sudo pacman -S nss atk cups libxcomposite libxrandr \
                  libxscrnsaver pango gtk3 alsa-lib
   ```

## Lancer les tests

### Mode développement (UI interactive)
```bash
npm run test:e2e:ui
```
Ouvre une interface graphique pour exécuter et déboguer les tests.

### Mode headless (CI)
```bash
npm run test:e2e
```
Exécute tous les tests en mode headless (sans interface).

### Tests spécifiques
```bash
# Un seul fichier de test
npx playwright test auth.spec.ts

# Un seul test
npx playwright test -g "should login successfully"

# Mode debug
npx playwright test --debug
```

## Utilitaires disponibles

### Authentication (utils/auth.ts)
```typescript
import { login, logout, TEST_USER } from './utils/auth';

// Login avec les credentials par défaut
await login(page);

// Login avec credentials personnalisés
await login(page, { 
  email: 'custom@example.com', 
  password: 'custom123',
  rememberMe: true 
});

// Logout
await logout(page);

// Vérifier si authentifié
const isAuth = await isAuthenticated(page);

// Naviguer vers settings avec un tab spécifique
await goToSettings(page, 'preferences');
```

### i18n (utils/i18n.ts)
```typescript
import { switchLocale, getCurrentLocale } from './utils/i18n';

// Changer la langue
await switchLocale(page, 'fr');

// Obtenir la langue actuelle
const locale = await getCurrentLocale(page);

// Vérifier une traduction
await expectTranslation(
  page, 
  'h1', 
  'Welcome',  // EN
  'Bienvenue' // FR
);
```

### Helpers généraux (utils/helpers.ts)
```typescript
import { 
  waitForHydration, 
  fillField, 
  waitForSuccessMessage 
} from './utils/helpers';

// Attendre l'hydration Nuxt
await waitForHydration(page);

// Remplir un champ de formulaire
await fillField(page, /email/i, 'test@example.com');

// Attendre un message de succès
await waitForSuccessMessage(page);

// Attendre un message d'erreur
await waitForErrorMessage(page);
```

## Credentials de test

Les credentials par défaut pour les tests :
- **Email**: `demo@example.com`
- **Password**: `password123`

Ces credentials sont définis dans `utils/auth.ts` et fonctionnent avec l'API mock.

## Configuration

La configuration Playwright se trouve dans `playwright.config.ts` à la racine du projet.

### Options importantes:
- **baseURL**: `http://localhost:3000`
- **timeout**: 60 secondes par test
- **retries**: 2 en CI, 0 en local
- **workers**: 1 en CI (séquentiel), parallèle en local
- **trace**: Activé en cas d'échec
- **screenshots**: Automatiques en cas d'échec
- **video**: Enregistré en cas d'échec

## CI/CD

Les tests s'exécutent automatiquement via GitHub Actions sur:
- Push vers `main` ou `develop`
- Pull requests vers `main` ou `develop`
- Déclenchement manuel (workflow_dispatch)

Voir `.github/workflows/e2e-tests.yml` pour la configuration complète.

### Artifacts disponibles après chaque run:
- **playwright-report**: Rapport HTML complet (30 jours)
- **test-screenshots**: Screenshots des tests échoués (7 jours)

## Debugging

### Mode debug interactif
```bash
npx playwright test --debug
```
Ouvre l'inspecteur Playwright pour un debugging pas-à-pas.

### Voir les traces
```bash
npx playwright show-trace test-results/path-to-trace.zip
```

### Générer un rapport local
```bash
npx playwright show-report
```

## Bonnes pratiques

1. **Sélecteurs**: Préférer les sélecteurs accessibles
   ```typescript
   // ✅ Bon
   page.getByRole('button', { name: /submit/i })
   page.getByLabel(/email/i)
   
   // ❌ Éviter
   page.locator('#submit-btn')
   page.locator('.email-input')
   ```

2. **Attentes**: Toujours utiliser des attentes explicites
   ```typescript
   // ✅ Bon
   await expect(page.getByText('Success')).toBeVisible()
   
   // ❌ Éviter
   await page.waitForTimeout(2000) // timing fragile
   ```

3. **Isolation**: Chaque test doit être indépendant
   ```typescript
   test.beforeEach(async ({ page }) => {
     // Setup propre à chaque test
     await login(page);
   });
   ```

4. **Nettoyage**: Utiliser beforeEach/afterEach
   ```typescript
   test.afterEach(async ({ page }) => {
     // Nettoyage si nécessaire
     await logout(page);
   });
   ```

## Arch Linux - Notes spécifiques

Playwright utilise un build Ubuntu par défaut. Sur Arch Linux:
- Les navigateurs fonctionnent généralement sans problème
- Les dépendances système peuvent être nécessaires (voir Prérequis)
- Pas de support officiel mais fonctionne de manière stable

En cas de problème de dépendances:
```bash
# Vérifier les dépendances manquantes
ldd ~/.cache/ms-playwright/chromium-*/chrome-linux/chrome

# Installer via pacman si nécessaire
sudo pacman -S <package-name>
```

## Ressources

- [Documentation Playwright](https://playwright.dev/)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Nuxt Test Utils](https://nuxt.com/docs/getting-started/testing)
