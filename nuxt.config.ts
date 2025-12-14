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

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
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
    // Externalize native modules for Netlify
    externals: {
      inline: ["better-sqlite3"],
    },
  },
});
