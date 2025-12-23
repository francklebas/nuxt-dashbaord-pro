<script setup lang="ts">
import DpThemeToggle from "./DpThemeToggle.vue";
import DpAvatarDropdown from "./DpAvatarDropdown.vue";
import DpMobileDrawer from "./DpMobileDrawer.vue";
import DpMobileNav from "./DpMobileNav.vue";

const { t, locale, locales } = useI18n();
const { isAuthenticated } = useAuth();
const switchLocalePath = useSwitchLocalePath();

// Handle language change via URL navigation
const changeLanguage = (localeCode: string) => {
  const path = switchLocalePath(localeCode);
  navigateTo(path);
};

// Mobile menu state
const mobileMenuOpen = ref(false);

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

// Auto-close on resize to desktop
onMounted(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768 && mobileMenuOpen.value) {
      closeMobileMenu();
    }
  };
  window.addEventListener("resize", handleResize);
  onUnmounted(() => window.removeEventListener("resize", handleResize));
});

// Mobile navigation links
const mobileNavLinks = computed(() => [
  { to: "/", label: t("nav.home"), icon: "lucide:home" },
  { to: "/dashboard", label: t("nav.dashboard"), icon: "lucide:layout-dashboard" },
  { to: "/composants", label: t("nav.components"), icon: "lucide:package" },
  { to: "/pricing", label: t("nav.pricing"), icon: "lucide:tag" },
  { to: "/form", label: t("nav.form"), icon: "lucide:file-text" },
  { to: "/products", label: t("nav.products"), icon: "lucide:shopping-bag" },
  { to: "/users", label: t("nav.users"), icon: "lucide:users" },
  { to: "/orders", label: t("nav.orders"), icon: "lucide:shopping-cart" },
]);
</script>

<template>
  <nav class="border-b border-border bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo / Brand -->
        <div class="flex items-center gap-8">
          <NuxtLink to="/" class="flex-shrink-0">
            <img src="/dash.svg" alt="Logo" class="h-8 w-auto" />
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
            <NuxtLink
              to="/products"
              class="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              active-class="bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
            >
              Products
            </NuxtLink>
            <NuxtLink
              to="/users"
              class="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              active-class="bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
            >
              Users
            </NuxtLink>
            <NuxtLink
              to="/orders"
              class="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              active-class="bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
            >
              Orders
            </NuxtLink>
          </div>
        </div>

        <!-- Navigation items -->
        <div class="flex items-center space-x-4">
          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            :aria-expanded="mobileMenuOpen"
            :aria-label="mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
          >
            <Icon :name="mobileMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-6 h-6" />
          </button>

          <!-- Language selector -->
          <div class="hidden md:flex md:items-center gap-2">
            <button
              v-for="loc in locales"
              :key="loc.code"
              @click="changeLanguage(loc.code)"
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

  <!-- Mobile Navigation Drawer -->
  <DpMobileDrawer v-model:open="mobileMenuOpen">
    <DpMobileNav
      :nav-links="mobileNavLinks"
      :show-auth-buttons="!isAuthenticated"
      :show-theme-toggle="true"
      :on-navigate="closeMobileMenu"
      :cta-button="isAuthenticated ? undefined : {
        label: $t('auth.register.title'),
        to: '/auth/register',
        icon: 'lucide:rocket'
      }"
    />
  </DpMobileDrawer>
</template>
