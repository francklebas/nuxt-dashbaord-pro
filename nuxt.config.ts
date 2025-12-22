// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  // HTML lang attribute for accessibility
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
    },
  },

  // Route Rules - SWR Cache Strategy for Performance
  routeRules: {
    // Pages marketing - cache long
    '/': {
      swr: 3600, // 1 heure de cache
      headers: { 'cache-control': 'public, max-age=3600, stale-while-revalidate=7200' }
    },
    '/pricing': {
      swr: 3600,
      headers: { 'cache-control': 'public, max-age=3600, stale-while-revalidate=7200' }
    },
    '/composants': {
      swr: 1800, // 30 minutes
      headers: { 'cache-control': 'public, max-age=1800, stale-while-revalidate=3600' }
    },
    '/form': {
      swr: 1800,
      headers: { 'cache-control': 'public, max-age=1800, stale-while-revalidate=3600' }
    },

    // Auth pages - cache moyen
    '/auth/**': {
      swr: 600, // 10 minutes
      headers: { 'cache-control': 'public, max-age=600, stale-while-revalidate=1200' }
    },

    // Dashboard - cache court mais efficace
    '/dashboard': {
      swr: 60, // 60 secondes
      headers: { 'cache-control': 'public, max-age=60, stale-while-revalidate=120' }
    },

    // Data tables - cache moyen
    '/users': {
      swr: 120,
      headers: { 'cache-control': 'public, max-age=120, stale-while-revalidate=240' }
    },
    '/products': {
      swr: 120,
      headers: { 'cache-control': 'public, max-age=120, stale-while-revalidate=240' }
    },
    '/orders': {
      swr: 120,
      headers: { 'cache-control': 'public, max-age=120, stale-while-revalidate=240' }
    },
    '/settings': {
      swr: 300,
      headers: { 'cache-control': 'public, max-age=300, stale-while-revalidate=600' }
    },

    // API routes - cache pour mock data
    '/api/products/**': {
      swr: 300, // 5 minutes (données mock)
      headers: { 'cache-control': 'public, max-age=300, stale-while-revalidate=600' }
    },
    '/api/orders/**': {
      swr: 300,
      headers: { 'cache-control': 'public, max-age=300, stale-while-revalidate=600' }
    },
    '/api/users/**': {
      swr: 300,
      headers: { 'cache-control': 'public, max-age=300, stale-while-revalidate=600' }
    },

    // Auth APIs - PAS de cache
    '/api/auth/**': {
      swr: false,
      headers: { 'cache-control': 'no-store, no-cache, must-revalidate' }
    },
  },

  devtools: {
    enabled: false, // Temporarily disabled to debug error overlay issue

    timeline: {
      enabled: false,
    },
  },

  // Disable error overlay to see real errors
  vite: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => false,
        },
      },
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/hints",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "reka-ui/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "nuxt-echarts",
  ],

  // ECharts configuration
  echarts: {
    renderer: "canvas",
    charts: ["LineChart"],
    components: ["GridComponent", "TooltipComponent", "LegendComponent"],
  },

  extends: [
    "./layers/content",
    "./layers/core",
    "./layers/features",
    "./layers/ui-kit",
  ],

  // Custom import aliases
  alias: {
    // Map "@/" to the project root so imports like "@/server/..." or "@/app/..." work
    "@": fileURLToPath(new URL("./", import.meta.url)),
    // Keep Nuxt's conventional "~" alias equivalent to project root, for TS and tooling
    "~": fileURLToPath(new URL("./", import.meta.url)),
    "@core": fileURLToPath(new URL("./layers/core", import.meta.url)),
    "@ui": fileURLToPath(new URL("./layers/ui-kit", import.meta.url)),
    "@components": fileURLToPath(new URL("./app/components/", import.meta.url)),
  },

  // CSS
  // Point to the actual location of the main stylesheet
  css: ["@/app/assets/css/main.css"],

  // Modules configuration
  i18n: {
    defaultLocale: "en",
    langDir: "locales",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "fr", name: "Français", file: "fr.json" },
    ],
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      alwaysRedirect: false,
      fallbackLocale: "en",
    },
  },

  // Color mode configuration
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },

  // Nitro configuration for deployment
  nitro: {
    preset: "netlify",
    compressPublicAssets: true, // Enable Brotli/Gzip compression
    netlify: {
      images: {
        remote_images: ['https://*'],
      },
    },
    // Externalize native modules for Netlify
    externals: {
      inline: ["better-sqlite3"],
    },
  },
});
