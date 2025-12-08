/**
 * Theme Configuration
 *
 * Centralized configuration for theme customization.
 * Modify these values to customize the appearance of your dashboard.
 */

export const themeConfig = {
  // Brand
  brand: {
    name: "Dashboard Pro",
    tagline: "Professional Nuxt Dashboard Template",
  },

  // Colors (Tailwind CSS variables defined in app/assets/css/main.css)
  colors: {
    primary: {
      light: "hsl(221.2 83.2% 53.3%)",  // Blue
      dark: "hsl(217.2 91.2% 59.8%)",
    },
    secondary: {
      light: "hsl(210 40% 96.1%)",
      dark: "hsl(222.2 47.4% 11.2%)",
    },
    accent: {
      light: "hsl(210 40% 96.1%)",
      dark: "hsl(217.2 32.6% 17.5%)",
    },
  },

  // Typography
  typography: {
    fontFamily: {
      sans: "Inter, system-ui, -apple-system, sans-serif",
      mono: "JetBrains Mono, Consolas, monospace",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
  },

  // Layout
  layout: {
    maxWidth: "1280px", // max-w-7xl
    containerPadding: {
      mobile: "1rem", // px-4
      tablet: "1.5rem", // sm:px-6
      desktop: "2rem", // lg:px-8
    },
    headerHeight: "4rem", // h-16
  },

  // Components
  components: {
    button: {
      borderRadius: "0.5rem", // rounded-lg
      paddingSm: "0.5rem 1rem", // px-4 py-2
      paddingMd: "0.625rem 1.25rem", // px-5 py-2.5
      paddingLg: "0.75rem 1.5rem", // px-6 py-3
    },
    card: {
      borderRadius: "0.5rem", // rounded-lg
      padding: "1.5rem", // p-6
      shadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
    },
    modal: {
      borderRadius: "0.75rem", // rounded-xl
      maxWidthSm: "24rem", // max-w-sm
      maxWidthMd: "28rem", // max-w-md
      maxWidthLg: "32rem", // max-w-lg
      maxWidthXl: "36rem", // max-w-xl
    },
  },

  // Navigation
  navigation: {
    links: [
      { to: "/", label: "nav.home" },
      { to: "/composants", label: "nav.components" },
      { to: "/pricing", label: "nav.pricing" },
      { to: "/form", label: "nav.form" },
    ],
  },

  // Features
  features: {
    darkMode: true,
    i18n: true,
    animations: true,
  },

  // Social Links (optional)
  social: {
    github: "https://github.com/yourusername/your-repo",
    twitter: "https://twitter.com/yourusername",
    discord: "https://discord.gg/yourserver",
  },
} as const;

export type ThemeConfig = typeof themeConfig;

export default themeConfig;
