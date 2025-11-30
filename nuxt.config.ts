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
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "reka-ui/nuxt",
    "@nuxtjs/tailwindcss",
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
  },
});