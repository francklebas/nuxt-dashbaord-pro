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
      // Resource hints for better performance
      link: [
        // Preconnect to Netlify CDN
        { rel: 'dns-prefetch', href: 'https://nuxtdashashboardpro.netlify.app' },
        { rel: 'preconnect', href: 'https://nuxtdashashboardpro.netlify.app', crossorigin: 'anonymous' },
      ],
    },
  },

  // Performance optimizations
  experimental: {
    payloadExtraction: true, // Extract payload for better caching
    renderJsonPayloads: true, // Render JSON payloads
    viewTransition: false, // Disable view transitions if not needed
  },

  // Build optimizations
  optimization: {
    minimize: true,
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },
  },

  // Enable tree-shaking for better bundle size
  features: {
    inlineStyles: false, // Disabled: causes issues with Tailwind CSS on Netlify
  },

  // Route Rules - SWR Cache Strategy for Performance
  routeRules: {
    // Pages marketing - cache long (with i18n support)
    '/': {
      swr: 3600, // 1 heure de cache
      headers: {
        'cache-control': 'public, max-age=3600, stale-while-revalidate=7200',
        'vary': 'Cookie' // Support i18n cookie
      }
    },
    '/pricing': {
      swr: 3600,
      headers: {
        'cache-control': 'public, max-age=3600, stale-while-revalidate=7200',
        'vary': 'Cookie'
      }
    },
    '/composants': {
      swr: 1800, // 30 minutes
      headers: {
        'cache-control': 'public, max-age=1800, stale-while-revalidate=3600',
        'vary': 'Cookie'
      }
    },
    '/form': {
      swr: 1800,
      headers: {
        'cache-control': 'public, max-age=1800, stale-while-revalidate=3600',
        'vary': 'Cookie'
      }
    },

    // Auth pages - cache moyen
    '/auth/**': {
      swr: 600, // 10 minutes
      headers: {
        'cache-control': 'public, max-age=600, stale-while-revalidate=1200',
        'vary': 'Cookie'
      }
    },

    // Dashboard - cache court mais efficace
    '/dashboard': {
      swr: 60, // 60 secondes
      headers: {
        'cache-control': 'public, max-age=60, stale-while-revalidate=120',
        'vary': 'Cookie'
      }
    },

    // Data tables - cache moyen
    '/users': {
      swr: 120,
      headers: {
        'cache-control': 'public, max-age=120, stale-while-revalidate=240',
        'vary': 'Cookie'
      }
    },
    '/products': {
      swr: 120,
      headers: {
        'cache-control': 'public, max-age=120, stale-while-revalidate=240',
        'vary': 'Cookie'
      }
    },
    '/orders': {
      swr: 120,
      headers: {
        'cache-control': 'public, max-age=120, stale-while-revalidate=240',
        'vary': 'Cookie'
      }
    },
    '/settings': {
      swr: 300,
      headers: {
        'cache-control': 'public, max-age=300, stale-while-revalidate=600',
        'vary': 'Cookie'
      }
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
    build: {
      // Minification optimizations
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.log in production
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
        },
      },
      // Optimize chunk size
      chunkSizeWarningLimit: 1000,
      // Inline small CSS chunks
      assetsInlineLimit: 8192, // 8kb - inline assets smaller than this
    },
    css: {
      preprocessorOptions: {
        css: {
          // Enable CSS minification
          minify: true,
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
    strategy: "prefix_except_default", // URLs: /pricing (en), /fr/pricing (fr)
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

  // Image optimization
  image: {
    formats: ['webp', 'avif'], // Use modern formats
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  // Nitro configuration for deployment
  nitro: {
    preset: process.env.NETLIFY ? "netlify" : "node-server",
    compressPublicAssets: true, // Enable Brotli/Gzip compression
    minify: true, // Minify server output
    netlify: {
      images: {
        remote_images: ['https://*'],
      },
    },
    // Externalize native modules for Netlify
    externals: {
      inline: ["better-sqlite3"],
    },
    // Prerendering for better performance
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
});
