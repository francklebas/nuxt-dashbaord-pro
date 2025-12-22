<script setup lang="ts">
import DpButton from "../DpButton.vue";
import DpThemeToggle from "./DpThemeToggle.vue";

const { t } = useI18n();

interface Props {
  onNavigate?: () => void;
}

const props = defineProps<Props>();

const navLinks = computed(() => [
  {
    to: "/dashboard-preview",
    label: t("home.nav.demo"),
    icon: "lucide:play-circle",
  },
  {
    to: "/pricing",
    label: t("home.nav.pricing"),
    icon: "lucide:tag",
  },
  {
    to: "/auth/login",
    label: t("home.nav.login"),
    icon: "lucide:log-in",
  },
]);

const handleLinkClick = () => {
  if (props.onNavigate) {
    props.onNavigate();
  }
};
</script>

<template>
  <nav class="flex flex-col gap-2">
    <!-- Logo -->
    <div class="mb-6">
      <div class="flex items-center gap-2">
        <div
          class="bg-primary flex h-10 w-10 items-center justify-center rounded-lg"
        >
          <span class="text-base font-bold text-white">ND</span>
        </div>
        <span class="font-bold text-foreground">Nuxt Dashboard Pro</span>
      </div>
    </div>

    <!-- Navigation Links -->
    <NuxtLink
      v-for="link in navLinks"
      :key="link.to"
      :to="link.to"
      @click="handleLinkClick"
      class="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors"
      active-class="bg-primary/10 text-primary font-medium"
    >
      <Icon :name="link.icon" class="w-5 h-5" />
      <span>{{ link.label }}</span>
    </NuxtLink>

    <!-- Divider -->
    <div class="my-4 border-t border-border" />

    <!-- Theme Toggle -->
    <div class="flex items-center gap-3 px-4 py-2">
      <Icon name="lucide:palette" class="w-5 h-5 text-muted-foreground" />
      <span class="flex-1 text-foreground">{{ $t("common.theme") }}</span>
      <DpThemeToggle />
    </div>

    <!-- Divider -->
    <div class="my-4 border-t border-border" />

    <!-- CTA Button -->
    <NuxtLink to="/auth/register" @click="handleLinkClick">
      <DpButton variant="primary" size="lg" class="w-full">
        <Icon name="lucide:rocket" class="w-5 h-5 mr-2" />
        {{ $t("home.nav.getStarted") }}
      </DpButton>
    </NuxtLink>
  </nav>
</template>
