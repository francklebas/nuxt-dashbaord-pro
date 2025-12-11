<script setup lang="ts">
import DpThemeToggle from "./DpThemeToggle.vue";
import DpAvatarDropdown from "./DpAvatarDropdown.vue";

const { locale, locales, setLocale } = useI18n();
const { isAuthenticated } = useAuth();
</script>

<template>
  <nav class="border-b border-border bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo / Brand -->
        <div class="flex items-center gap-8">
          <NuxtLink to="/" class="flex-shrink-0">
            <h1 class="text-xl font-bold text-foreground">
              {{ $t("welcome") }}
            </h1>
          </NuxtLink>

          <!-- Navigation links -->
          <div class="hidden md:flex md:items-center md:gap-1">
            <NuxtLink
              to="/"
              class="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              active-class="bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
            >
              {{ $t("nav.home") }}
            </NuxtLink>
            <NuxtLink
              to="/dashboard"
              class="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              active-class="bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
            >
              {{ $t("nav.dashboard") }}
            </NuxtLink>
            <NuxtLink
              to="/composants"
              class="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              active-class="bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
            >
              {{ $t("nav.components") }}
            </NuxtLink>
            <NuxtLink
              to="/pricing"
              class="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              active-class="bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
            >
              {{ $t("nav.pricing") }}
            </NuxtLink>
            <NuxtLink
              to="/form"
              class="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              active-class="bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
            >
              {{ $t("nav.form") }}
            </NuxtLink>
          </div>
        </div>

        <!-- Navigation items -->
        <div class="hidden md:flex md:items-center md:space-x-4">
          <!-- Language selector -->
          <div class="flex items-center gap-2">
            <button
              v-for="loc in locales"
              :key="loc.code"
              @click="setLocale(loc.code)"
              :class="[
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                locale === loc.code
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              ]"
            >
              {{ loc.name }}
            </button>
          </div>

          <!-- Theme toggle -->
          <DpThemeToggle />

          <!-- Auth section -->
          <div v-if="!isAuthenticated" class="flex items-center gap-2">
            <NuxtLink
              to="/auth/login"
              class="px-4 py-2 text-sm font-medium text-foreground hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {{ $t('auth.login.title') }}
            </NuxtLink>
            <NuxtLink
              to="/auth/register"
              class="px-4 py-2 rounded-md text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors"
            >
              {{ $t('auth.register.title') }}
            </NuxtLink>
          </div>
          <DpAvatarDropdown v-else />
        </div>
      </div>
    </div>
  </nav>
</template>
