<script lang="ts" setup>
import DpButton from "@ui/DpButton.vue";
import DpNavigation from "@ui/components/DpNavigation.vue";

// Set a default document title so E2E can assert it
useHead({
  title: "Dashboard",
});
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <NuxtRouteAnnouncer />
    <DpNavigation />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="space-y-6">
        <section>
          <h2 class="text-2xl font-bold mb-4">Button Variants</h2>
          <div class="flex flex-wrap gap-4">
            <DpButton variant="primary">Primary</DpButton>
            <DpButton variant="secondary">Secondary</DpButton>
            <DpButton variant="outline">Outline</DpButton>
            <DpButton variant="ghost">Ghost</DpButton>
            <DpButton variant="destructive">Destructive</DpButton>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Button Sizes</h2>
          <div class="flex flex-wrap items-center gap-4">
            <DpButton size="sm">Small</DpButton>
            <DpButton size="md">Medium</DpButton>
            <DpButton size="lg">Large</DpButton>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4">Disabled State</h2>
          <div class="flex flex-wrap gap-4">
            <DpButton disabled>Disabled Primary</DpButton>
            <DpButton variant="outline" disabled>Disabled Outline</DpButton>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
