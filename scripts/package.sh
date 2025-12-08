#!/bin/bash

# Script to create a clean package of the Nuxt Dashboard Pro template
# This creates a ZIP file ready for distribution/sale

set -e

echo "📦 Creating Nuxt Dashboard Pro package..."

# Define the package name and version
PACKAGE_NAME="nuxt-dashboard-pro"
VERSION=$(node -p "require('./package.json').version || '1.0.0'")
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
OUTPUT_NAME="${PACKAGE_NAME}-${VERSION}"
OUTPUT_DIR="dist-package"

# Create temporary directory for packaging
echo "🗂️  Creating temporary package directory..."
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR/$OUTPUT_NAME"

# Copy project files, excluding development artifacts
echo "📋 Copying project files..."
rsync -av --progress \
  --exclude='node_modules' \
  --exclude='.nuxt' \
  --exclude='.output' \
  --exclude='.cache' \
  --exclude='dist' \
  --exclude='dist-package' \
  --exclude='.git' \
  --exclude='.DS_Store' \
  --exclude='*.log' \
  --exclude='data' \
  --exclude='test-results' \
  --exclude='.fleet' \
  --exclude='.idea' \
  --exclude='bun.lock' \
  --exclude='playwright-report' \
  --exclude='.env' \
  --exclude='.env.local' \
  ./ "$OUTPUT_DIR/$OUTPUT_NAME/"

# Create a LICENSE file if it doesn't exist
if [ ! -f "$OUTPUT_DIR/$OUTPUT_NAME/LICENSE" ]; then
  echo "📄 Creating LICENSE file..."
  cat > "$OUTPUT_DIR/$OUTPUT_NAME/LICENSE" << 'EOF'
COMMERCIAL LICENSE

Copyright (c) 2024 Dashboard Pro

This software is licensed for commercial use under the following terms:

1. The licensee is granted the right to use this template to create applications
   for personal or commercial use.

2. The licensee may modify the template code as needed for their projects.

3. The licensee may NOT:
   - Redistribute, resell, or sublicense this template
   - Make the template available as-is or in modified form to others
   - Create derivative templates for sale or distribution

4. Each license permits use by a single developer or organization.

5. Updates and support may be provided at the discretion of the licensor.

For questions about licensing, please contact: [YOUR_EMAIL]
EOF
fi

# Create a CHANGELOG file
echo "📝 Creating CHANGELOG..."
cat > "$OUTPUT_DIR/$OUTPUT_NAME/CHANGELOG.md" << 'EOF'
# Changelog

## [1.0.0] - Current Release

### Features
- ✅ Nuxt 4.2.1 with Vue 3.5 and TypeScript
- ✅ Complete UI component library (Buttons, Modals, Tabs, Tooltips, Cards, Badges)
- ✅ Dark mode support with smooth transitions
- ✅ i18n ready (English & French)
- ✅ Responsive design (mobile-first)
- ✅ Tailwind CSS styling
- ✅ API routes (waitlist endpoint)
- ✅ Pricing page with 3-tier structure
- ✅ Form examples with validation
- ✅ Component showcase page
- ✅ Centralized theme configuration
- ✅ E2E tests with Playwright
- ✅ Unit tests with Vitest

### Pages
- Home page with component showcase
- Components library page
- Pricing page
- Contact form page

### Known Limitations
- Some forms need additional completion
- Dashboard page placeholder

### Future Roadmap
- V1 Complete: Production-ready forms, enhanced showcase
- V2 Premium: Dashboard page, advanced animations, hero variants
EOF

# Create SETUP_GUIDE.md for customers
echo "📖 Creating setup guide..."
cat > "$OUTPUT_DIR/$OUTPUT_NAME/SETUP_GUIDE.md" << 'EOF'
# 🚀 Quick Setup Guide

Thank you for purchasing Nuxt Dashboard Pro!

## Prerequisites
- Node.js 18 or higher
- npm, pnpm, or yarn

## Installation (5 minutes)

1. **Extract the template**
   ```bash
   unzip nuxt-dashboard-pro-*.zip
   cd nuxt-dashboard-pro-*
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to http://localhost:3000

## Customization

### 1. Update Brand Name
Edit `theme-config.ts`:
```typescript
export const themeConfig = {
  brand: {
    name: "Your Brand",
    tagline: "Your tagline",
  },
}
```

### 2. Customize Colors
Edit `app/assets/css/main.css`:
```css
:root {
  --primary: 221.2 83.2% 53.3%;  /* Change to your primary color */
}
```

### 3. Update Navigation
Edit `theme-config.ts`:
```typescript
navigation: {
  links: [
    { to: "/", label: "nav.home" },
    { to: "/dashboard", label: "Your Page" },
  ],
}
```

### 4. Configure i18n
Edit translations in:
- `i18n/locales/en.json` (English)
- `i18n/locales/fr.json` (French)

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test:e2e     # Run E2E tests
npm run test:unit    # Run unit tests
```

## Project Structure

```
nuxt-dashboard-pro/
├── app/
│   ├── assets/css/          # Global styles
│   ├── layouts/             # Layout components
│   └── pages/               # Application pages
├── layers/
│   └── ui-kit/              # UI components
├── i18n/locales/            # Translation files
├── server/api/              # API routes
└── theme-config.ts          # Theme configuration
```

## Support

For documentation, see README.md
For issues, check the code comments or contact support

---

Happy coding! 🎉
EOF

# Create a clean package.json (remove dev-specific fields)
echo "🔧 Cleaning package.json..."
node -e "
const pkg = require('./package.json');
delete pkg.scripts['test:e2e:ui'];
pkg.version = '1.0.0';
pkg.description = 'Professional Nuxt 4 dashboard template with TypeScript, Tailwind CSS, and dark mode';
pkg.author = 'Dashboard Pro';
pkg.license = 'SEE LICENSE IN LICENSE';
require('fs').writeFileSync(
  '$OUTPUT_DIR/$OUTPUT_NAME/package.json',
  JSON.stringify(pkg, null, 2)
);
"

# Create the ZIP file
echo "🗜️  Creating ZIP archive..."
cd "$OUTPUT_DIR"
zip -r "../${OUTPUT_NAME}.zip" "$OUTPUT_NAME" -x "*.DS_Store"
cd ..

# Clean up temporary directory
echo "🧹 Cleaning up..."
rm -rf "$OUTPUT_DIR"

# Calculate file size
FILE_SIZE=$(du -h "${OUTPUT_NAME}.zip" | cut -f1)

echo ""
echo "✅ Package created successfully!"
echo "📦 File: ${OUTPUT_NAME}.zip"
echo "💾 Size: ${FILE_SIZE}"
echo ""
echo "🎉 Your template is ready for distribution!"
echo ""
echo "Contents:"
echo "  - Complete source code"
echo "  - README.md with documentation"
echo "  - SETUP_GUIDE.md for customers"
echo "  - CHANGELOG.md with version history"
echo "  - LICENSE file"
echo ""
