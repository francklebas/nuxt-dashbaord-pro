<script lang="ts" setup>
import DpHero from "@ui/components/DpHero.vue";
import DpButton from "@ui/DpButton.vue";
import DpModal from "@ui/components/DpModal.vue";
import DpCard from "@ui/components/DpCard.vue";
import DpThemeToggle from "@ui/components/DpThemeToggle.vue";
import DpMobileDrawer from "@ui/components/DpMobileDrawer.vue";
import DpMobileNav from "@ui/components/DpMobileNav.vue";

const { t } = useI18n();

useHead({
  title: t("home.meta.title"),
  meta: [
    {
      name: "description",
      content: t("home.meta.description"),
    },
  ],
});

// Modal states for component demos
const simpleModalOpen = ref(false);
const formModalOpen = ref(false);
const formData = ref({
  name: "",
  email: "",
});

const handleFormSubmit = () => {
  console.log("Form submitted:", formData.value);
  formModalOpen.value = false;
  formData.value = { name: "", email: "" };
};

// Mobile menu state
const mobileMenuOpen = ref(false);

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

// Auto-close menu on resize to desktop
onMounted(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768 && mobileMenuOpen.value) {
      mobileMenuOpen.value = false;
    }
  };
  window.addEventListener("resize", handleResize);
  onUnmounted(() => window.removeEventListener("resize", handleResize));
});

// Features data
const features = computed(() => [
  {
    icon: "lucide:layout-dashboard",
    title: t("home.features.dashboard.title"),
    description: t("home.features.dashboard.description"),
  },
  {
    icon: "lucide:shield-check",
    title: t("home.features.auth.title"),
    description: t("home.features.auth.description"),
  },
  {
    icon: "lucide:palette",
    title: t("home.features.darkMode.title"),
    description: t("home.features.darkMode.description"),
  },
  {
    icon: "lucide:table",
    title: t("home.features.dataTables.title"),
    description: t("home.features.dataTables.description"),
  },
  {
    icon: "lucide:smartphone",
    title: t("home.features.responsive.title"),
    description: t("home.features.responsive.description"),
  },
  {
    icon: "lucide:zap",
    title: t("home.features.performance.title"),
    description: t("home.features.performance.description"),
  },
]);
</script>

<template>
  <div class="min-h-screen">
    <!-- Simple Navigation -->
    <nav
      class="fixed left-0 right-0 top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <!-- Logo -->
          <NuxtLink
            to="/"
            class="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div
              class="bg-primary flex h-8 w-8 items-center justify-center rounded-lg"
            >
              <span class="text-sm font-bold text-white">ND</span>
            </div>
            <span class="hidden font-bold text-foreground sm:inline"
              >Nuxt Dashboard Pro</span
            >
          </NuxtLink>

          <!-- Desktop Navigation -->
          <div class="hidden items-center gap-6 md:flex">
            <NuxtLink
              to="/dashboard-preview"
              class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {{ $t("home.nav.demo") }}
            </NuxtLink>
            <NuxtLink
              to="/pricing"
              class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {{ $t("home.nav.pricing") }}
            </NuxtLink>
            <DpThemeToggle />
            <NuxtLink
              to="/auth/login"
              class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {{ $t("home.nav.login") }}
            </NuxtLink>
            <NuxtLink to="/auth/register">
              <DpButton variant="primary" size="sm">
                {{ $t("home.nav.getStarted") }}
              </DpButton>
            </NuxtLink>
          </div>

          <!-- Mobile Hamburger Button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            :aria-expanded="mobileMenuOpen"
            :aria-label="
              mobileMenuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            "
          >
            <Icon
              :name="mobileMenuOpen ? 'lucide:x' : 'lucide:menu'"
              class="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </nav>

    <!-- Add padding to account for fixed nav -->
    <div class="h-16" />

    <!-- Mobile Drawer -->
    <DpMobileDrawer v-model:open="mobileMenuOpen">
      <DpMobileNav :on-navigate="closeMobileMenu" />
    </DpMobileDrawer>

    <!-- Hero Section -->
    <DpHero
      :title="$t('home.hero.title')"
      :subtitle="$t('home.hero.subtitle')"
      :demo-button-text="$t('home.hero.demoButtonText')"
      demo-button-link="/dashboard-preview"
      :show-waitlist="true"
      :show-theme-toggle="false"
      :show-tech-badge="true"
    />

    <!-- Features Section -->
    <section class="bg-muted/30 py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-16 text-center sm:mb-20">
          <h2 class="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            {{ $t("home.features.sectionTitle") }}
          </h2>
          <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
            {{ $t("home.features.sectionDescription") }}
          </p>
        </div>

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="hover:border-primary/50 group rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:shadow-lg"
          >
            <div class="flex items-start gap-4">
              <div
                class="bg-primary/10 group-hover:bg-primary/20 rounded-lg p-3 transition-colors"
              >
                <Icon :name="feature.icon" class="text-primary h-6 w-6" />
              </div>
              <div>
                <h3 class="mb-2 text-xl font-semibold text-foreground">
                  {{ feature.title }}
                </h3>
                <p class="text-muted-foreground">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Demo Credentials Section -->
    <section class="bg-background py-16 sm:py-24">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div
          class="from-primary/10 to-secondary/10 border-primary/20 rounded-2xl border bg-gradient-to-r p-8 text-center"
        >
          <div class="mb-4">
            <Icon name="lucide:key" class="text-primary mx-auto h-12 w-12" />
          </div>
          <h3 class="mb-4 text-2xl font-bold text-foreground">
            {{ $t("home.demo.title") }}
          </h3>
          <p class="mb-6 text-muted-foreground">
            {{ $t("home.demo.subtitle") }}
          </p>
          <div
            class="mb-6 rounded-lg border border-border bg-background/80 p-6 backdrop-blur-sm"
          >
            <p class="mb-3 text-sm text-muted-foreground">
              <strong>{{ $t("home.demo.credentialsLabel") }}</strong>
            </p>
            <div
              class="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <div class="flex items-center gap-2">
                <Icon name="lucide:mail" class="text-primary h-4 w-4" />
                <code class="rounded bg-muted px-3 py-1.5 font-mono text-sm">
                  demo@example.com
                </code>
              </div>
              <div class="hidden text-muted-foreground sm:block">|</div>
              <div class="flex items-center gap-2">
                <Icon name="lucide:lock" class="text-primary h-4 w-4" />
                <code class="rounded bg-muted px-3 py-1.5 font-mono text-sm">
                  Password123
                </code>
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center gap-4 sm:flex-row">
            <NuxtLink to="/auth/login">
              <DpButton variant="primary" size="lg" class="w-full sm:w-auto">
                <Icon name="lucide:log-in" class="mr-2 h-5 w-5" />
                {{ $t("home.demo.loginButton") }}
              </DpButton>
            </NuxtLink>
            <NuxtLink to="/dashboard-preview">
              <DpButton variant="outline" size="lg" class="w-full sm:w-auto">
                <Icon name="lucide:play-circle" class="mr-2 h-5 w-5" />
                {{ $t("home.demo.demoButton") }}
              </DpButton>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Components Demo Section -->
    <section class="bg-muted/30 py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-16 text-center sm:mb-20">
          <h2 class="mb-2 text-3xl font-bold text-foreground">
            {{ $t("home.components.sectionTitle") }}
          </h2>
          <p class="text-muted-foreground">
            {{ $t("home.components.sectionDescription") }}
          </p>
        </div>

        <div class="space-y-12">
          <!-- Button Variants -->
          <div class="rounded-xl border border-border bg-background p-8">
            <h3 class="mb-6 text-xl font-bold text-foreground">
              {{ $t("home.components.buttonVariants") }}
            </h3>
            <div class="flex flex-wrap gap-4">
              <DpButton variant="primary">Primary</DpButton>
              <DpButton variant="secondary">Secondary</DpButton>
              <DpButton variant="outline">Outline</DpButton>
              <DpButton variant="ghost">Ghost</DpButton>
              <DpButton variant="danger">Danger</DpButton>
            </div>
          </div>

          <!-- Button Sizes -->
          <div class="rounded-xl border border-border bg-background p-8">
            <h3 class="mb-6 text-xl font-bold text-foreground">
              {{ $t("home.components.buttonSizes") }}
            </h3>
            <div class="flex flex-wrap items-center gap-4">
              <DpButton size="sm">Small</DpButton>
              <DpButton size="md">Medium</DpButton>
              <DpButton size="lg">Large</DpButton>
            </div>
          </div>

          <!-- Modal Examples -->
          <div class="rounded-xl border border-border bg-background p-8">
            <h3 class="mb-6 text-xl font-bold text-foreground">
              {{ $t("home.components.modalExamples") }}
            </h3>
            <div class="flex flex-wrap gap-4">
              <!-- Simple Modal -->
              <DpModal
                v-model:open="simpleModalOpen"
                :title="$t('home.components.simpleModalTitle')"
                :description="$t('home.components.simpleModalDescription')"
              >
                <template #trigger>
                  <DpButton variant="primary">
                    <Icon name="lucide:eye" class="mr-2 h-4 w-4" />
                    {{ $t("home.components.openSimpleModal") }}
                  </DpButton>
                </template>

                <div class="space-y-4">
                  <p class="text-foreground">
                    {{ $t("home.components.simpleModalContent") }}
                  </p>
                  <p class="text-sm text-muted-foreground">
                    {{ $t("home.components.simpleModalHint") }}
                  </p>
                </div>
              </DpModal>

              <!-- Modal with Form -->
              <DpButton variant="secondary" @click="formModalOpen = true">
                <Icon name="lucide:edit" class="mr-2 h-4 w-4" />
                {{ $t("home.components.openFormModal") }}
              </DpButton>

              <DpModal
                v-model:open="formModalOpen"
                :title="$t('home.components.editProfile')"
                :description="$t('home.components.editProfileDescription')"
                size="lg"
              >
                <form class="space-y-4" @submit.prevent="handleFormSubmit">
                  <div>
                    <label
                      for="name"
                      class="mb-1 block text-sm font-medium text-foreground"
                    >
                      {{ $t("home.components.name") }}
                    </label>
                    <input
                      id="name"
                      v-model="formData.name"
                      type="text"
                      required
                      class="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      :placeholder="$t('home.components.namePlaceholder')"
                    />
                  </div>

                  <div>
                    <label
                      for="email"
                      class="mb-1 block text-sm font-medium text-foreground"
                    >
                      {{ $t("home.components.email") }}
                    </label>
                    <input
                      id="email"
                      v-model="formData.email"
                      type="email"
                      required
                      class="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      :placeholder="$t('home.components.emailPlaceholder')"
                    />
                  </div>
                </form>

                <template #footer>
                  <div class="flex justify-end gap-3">
                    <DpButton variant="outline" @click="formModalOpen = false">
                      {{ $t("home.components.cancel") }}
                    </DpButton>
                    <DpButton variant="primary" @click="handleFormSubmit">
                      <Icon name="lucide:save" class="mr-2 h-4 w-4" />
                      {{ $t("home.components.saveChanges") }}
                    </DpButton>
                  </div>
                </template>
              </DpModal>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final Section -->
    <section
      class="from-primary/10 to-secondary/10 bg-gradient-to-r py-16 sm:py-24"
    >
      <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 class="mb-6 text-3xl font-bold text-foreground sm:text-4xl">
          Lancez Votre Projet Aujourd'hui
        </h2>
        <p class="mb-8 text-xl text-muted-foreground">
          Gagnez des semaines de développement avec notre template professionnel
        </p>
        <div class="flex flex-col justify-center gap-4 sm:flex-row">
          <NuxtLink to="/auth/register">
            <DpButton variant="primary" size="lg" class="w-full sm:w-auto">
              <Icon name="lucide:rocket" class="mr-2 h-5 w-5" />
              Créer un Compte
            </DpButton>
          </NuxtLink>
          <NuxtLink to="/pricing">
            <DpButton variant="outline" size="lg" class="w-full sm:w-auto">
              <Icon name="lucide:tag" class="mr-2 h-5 w-5" />
              Voir les Tarifs
            </DpButton>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
