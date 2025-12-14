import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

import { defineVitestProject } from "@nuxt/test-utils/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
      "~": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  test: {
    projects: [
      {
        // unit tests "pures" (stores, services, utils)
        name: "unit",
        include: ["tests/unit/**/*.spec.{ts,js}"],
        environment: "node",
      },
      // tests if needed runtime Nuxt (pages, composables)
      await defineVitestProject({
        test: {
          name: "nuxt",
          include: ["tests/nuxt/**/*.spec.{ts,js}"],
          environment: "nuxt",
        },
      }),
    ],
  },
});
