<script setup lang="ts">
import DpButton from "../DpButton.vue";
import DpThemeToggle from "./DpThemeToggle.vue";

const { t, locale, locales, setLocale } = useI18n();

interface NavLink {
  to: string;
  label: string;
  icon: string;
}

interface Props {
  onNavigate?: () => void;
  navLinks?: NavLink[];
  showAuthButtons?: boolean;
  showThemeToggle?: boolean;
  ctaButton?: { label: string; to: string; icon?: string };
}

const props = withDefaults(defineProps<Props>(), {
  showAuthButtons: false,
  showThemeToggle: true,
});

// Default links for backwards compatibility
const defaultNavLinks: NavLink[] = [
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
];

const navLinks = computed(() => props.navLinks || defaultNavLinks);

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
      <NuxtLink to="/" @click="handleLinkClick" class="flex items-center">
        <img src="/dash.svg" alt="Logo" class="h-10 w-auto" />
      </NuxtLink>
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

    <!-- Theme Toggle Section -->
    <template v-if="showThemeToggle">
      <!-- Divider -->
      <div class="my-4 border-t border-border" />

      <!-- Theme Toggle -->
      <div class="flex items-center gap-3 px-4 py-2">
        <Icon name="lucide:palette" class="w-5 h-5 text-muted-foreground" />
        <span class="flex-1 text-foreground">{{ $t("common.theme") }}</span>
        <DpThemeToggle />
      </div>
    </template>

    <!-- Language Switcher Section -->
    <div class="my-4 border-t border-border" />
    <div class="px-4 py-2">
      <div class="flex items-center gap-3 mb-3">
        <Icon name="lucide:globe" class="w-5 h-5 text-muted-foreground" />
        <span class="text-sm font-medium text-foreground">{{ $t("common.language") }}</span>
      </div>
      <div class="flex gap-2">
        <button
          v-for="loc in locales"
          :key="loc.code"
          @click="setLocale(loc.code)"
          :class="[
            'flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors',
            locale === loc.code
              ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
              : 'bg-muted text-muted-foreground hover:bg-muted/80',
          ]"
        >
          {{ loc.name }}
        </button>
      </div>
    </div>

    <!-- CTA Button Section -->
    <template v-if="ctaButton">
      <!-- Divider -->
      <div class="my-4 border-t border-border" />

      <!-- CTA Button -->
      <NuxtLink :to="ctaButton.to" @click="handleLinkClick">
        <DpButton variant="primary" size="lg" class="w-full">
          <Icon v-if="ctaButton.icon" :name="ctaButton.icon" class="w-5 h-5 mr-2" />
          {{ ctaButton.label }}
        </DpButton>
      </NuxtLink>
    </template>
  </nav>
</template>
