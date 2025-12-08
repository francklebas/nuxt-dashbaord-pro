<script setup lang="ts">
import DpPricingCard from "@ui/components/DpPricingCard.vue";
import type { PricingFeature } from "@ui/components/DpPricingCard.vue";

const { t } = useI18n();

useHead({
  title: "Pricing",
});

// Pricing plans data
const plans = computed(() => [
  {
    title: t("pricing.starter.title"),
    description: t("pricing.starter.description"),
    price: "$29",
    period: t("pricing.period"),
    buttonText: t("pricing.starter.cta"),
    buttonVariant: "outline" as const,
    popular: false,
    features: [
      { text: t("pricing.starter.features.users"), included: true },
      { text: t("pricing.starter.features.projects"), included: true },
      { text: t("pricing.starter.features.storage"), included: true },
      { text: t("pricing.starter.features.support"), included: true },
      { text: t("pricing.starter.features.analytics"), included: true },
      { text: t("pricing.starter.features.api"), included: false },
      { text: t("pricing.starter.features.customDomain"), included: false },
    ] as PricingFeature[],
  },
  {
    title: t("pricing.professional.title"),
    description: t("pricing.professional.description"),
    price: "$49",
    period: t("pricing.period"),
    buttonText: t("pricing.professional.cta"),
    buttonVariant: "primary" as const,
    popular: true,
    badgeText: t("pricing.popularBadge"),
    features: [
      { text: t("pricing.professional.features.users"), included: true },
      { text: t("pricing.professional.features.projects"), included: true },
      { text: t("pricing.professional.features.storage"), included: true },
      { text: t("pricing.professional.features.support"), included: true },
      { text: t("pricing.professional.features.analytics"), included: true },
      { text: t("pricing.professional.features.api"), included: true },
      { text: t("pricing.professional.features.customDomain"), included: true },
    ] as PricingFeature[],
  },
  {
    title: t("pricing.enterprise.title"),
    description: t("pricing.enterprise.description"),
    price: "$99",
    period: t("pricing.period"),
    buttonText: t("pricing.enterprise.cta"),
    buttonVariant: "outline" as const,
    popular: false,
    features: [
      { text: t("pricing.enterprise.features.users"), included: true },
      { text: t("pricing.enterprise.features.projects"), included: true },
      { text: t("pricing.enterprise.features.storage"), included: true },
      { text: t("pricing.enterprise.features.support"), included: true },
      { text: t("pricing.enterprise.features.analytics"), included: true },
      { text: t("pricing.enterprise.features.api"), included: true },
      { text: t("pricing.enterprise.features.customDomain"), included: true },
    ] as PricingFeature[],
  },
]);

const handlePlanClick = (planTitle: string) => {
  console.log(`Selected plan: ${planTitle}`);
  // Add your logic here (e.g., navigate to checkout, open modal, etc.)
};
</script>

<template>
  <main class="min-h-screen bg-background">
    <!-- Header section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div class="text-center mb-16">
        <h1 class="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          {{ t("pricing.title") }}
        </h1>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          {{ t("pricing.subtitle") }}
        </p>
      </div>

      <!-- Pricing cards grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 items-start max-w-7xl mx-auto"
      >
        <DpPricingCard
          v-for="(plan, index) in plans"
          :key="index"
          :title="plan.title"
          :description="plan.description"
          :price="plan.price"
          :period="plan.period"
          :features="plan.features"
          :button-text="plan.buttonText"
          :button-variant="plan.buttonVariant"
          :popular="plan.popular"
          :badge-text="plan.badgeText"
          @click="handlePlanClick(plan.title)"
        />
      </div>

      <!-- FAQ or additional info section -->
      <div class="mt-20 text-center">
        <p class="text-sm text-muted-foreground">
          {{ t("pricing.footer") }}
        </p>
      </div>
    </div>
  </main>
</template>
