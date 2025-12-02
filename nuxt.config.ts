// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
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
  ],

  extends: [
    "./layers/content",
    "./layers/core",
    "./layers/features",
    "./layers/ui-kit",
  ],

  // Custom import aliases
  alias: {
    "@ui": fileURLToPath(new URL("./layers/ui-kit", import.meta.url)),
    "@components": fileURLToPath(new URL("./app/components/", import.meta.url)),
  },

  // CSS
  css: ["~/assets/css/main.css"],

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
});

