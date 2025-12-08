# 🚀 Nuxt Dashboard Pro

> Professional dashboard template built with Nuxt 4, Vue 3, TypeScript, and Tailwind CSS

[![Nuxt 4](https://img.shields.io/badge/Nuxt-4.2-00DC82?logo=nuxt.js)](https://nuxt.com/)
[![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Features

- 🎨 **Modern UI Components** - Buttons, Modals, Tabs, Tooltips, Cards, Badges, and more
- 🌙 **Dark Mode** - Built-in dark mode support with smooth transitions
- 🌍 **i18n Ready** - Multi-language support (English & French included)
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- ⚡ **Fast & Optimized** - Built with Nuxt 4 and Vite for lightning-fast performance
- 🎯 **TypeScript** - Full type safety across the entire codebase
- 🧩 **Component Library** - Reusable, composable, and customizable components
- 🎨 **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- 📦 **Modular Architecture** - Clean layer-based structure for easy maintenance

## 📦 What's Included

### UI Components
- ✅ **DpButton** - Multiple variants (primary, secondary, outline, ghost) and sizes
- ✅ **DpModal** - Accessible modal dialogs with size variants
- ✅ **DpTabs** - Tab navigation with icon support
- ✅ **DpTooltip** - Contextual tooltips with flexible positioning
- ✅ **DpCard** - Versatile card component with multiple variants
- ✅ **DpBadge** - Status badges with color variants
- ✅ **DpPricingCard** - Pricing cards with feature lists
- ✅ **DpWaitlistForm** - Email collection form with validation
- ✅ **DpThemeToggle** - Dark/light mode switcher
- ✅ **DpNavigation** - Responsive navigation bar

### Pages
- 🏠 **Home** - Landing page with component showcase
- 📋 **Components** - Interactive component library
- 💰 **Pricing** - Three-tier pricing page
- 📧 **Contact Form** - Form example with validation

### API Routes
- 📨 **POST /api/waitlist** - Waitlist signup endpoint with validation

## 🚀 5-Minute Setup

### Prerequisites
- Node.js 18+
- npm, pnpm, or bun

### Installation

```bash
# 1. Clone or extract the template
cd nuxt-dashboard-pro

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Your dashboard will be available at `http://localhost:3000` 🎉

### Quick Customization

#### 1. Update Brand Name
Edit `theme-config.ts`:
```typescript
export const themeConfig = {
  brand: {
    name: "Your Dashboard",  // Change this
    tagline: "Your tagline",  // Change this
  },
}
```

#### 2. Customize Colors
Edit `app/assets/css/main.css`:
```css
:root {
  --primary: 221.2 83.2% 53.3%;  /* Your primary color */
}
```

#### 3. Update Navigation
Edit `theme-config.ts`:
```typescript
navigation: {
  links: [
    { to: "/", label: "nav.home" },
    { to: "/dashboard", label: "nav.dashboard" },  // Add your pages
  ],
}
```

## 📁 Project Structure

```
nuxt-dashboard-pro/
├── app/
│   ├── assets/css/          # Global styles
│   ├── layouts/             # Layout components
│   └── pages/               # Application pages
├── layers/
│   ├── ui-kit/              # UI components layer
│   └── components/          # Reusable UI components
├── i18n/locales/            # Translation files
├── server/api/              # API routes
├── theme-config.ts          # Theme configuration
└── nuxt.config.ts           # Nuxt configuration
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev                  # Start dev server
npm run build                # Build for production
npm run preview              # Preview production build

# Testing
npm run test:e2e             # Run E2E tests
```

## 📄 License

Commercial license - see LICENSE file for details.

---

Made with ❤️ using [Nuxt](https://nuxt.com/)
