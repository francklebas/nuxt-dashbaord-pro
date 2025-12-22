<script setup lang="ts">
import DpButton from "../DpButton.vue";
import DpThemeToggle from "./DpThemeToggle.vue";
import DpWaitlistForm from "./DpWaitlistForm.vue";

export interface DpHeroProps {
  title?: string;
  subtitle?: string;
  demoButtonText?: string;
  demoButtonLink?: string;
  showWaitlist?: boolean;
  showThemeToggle?: boolean;
  showTechBadge?: boolean;
  backgroundImage?: string;
  backgroundImageDark?: string;
}

const props = withDefaults(defineProps<DpHeroProps>(), {
  title: "Nuxt Dashboard Pro – Le template élégant et performant pour vos apps business",
  subtitle: "UI moderne, composants accessibles, dark mode, responsive, customisation facile – Prêt à lancer votre SaaS ou admin en jours au lieu de mois.",
  demoButtonText: "Voir la Demo Interactive",
  demoButtonLink: "/dashboard-preview",
  showWaitlist: true,
  showThemeToggle: true,
  showTechBadge: true,
});

const colorMode = useColorMode();
const showWaitlistModal = ref(false);

const handleWaitlistSuccess = (email: string) => {
  console.log("Waitlist signup successful:", email);
  showWaitlistModal.value = false;
};
</script>

<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
    <!-- Background Pattern -->
    <div class="absolute inset-0 -z-10">
      <!-- Grid Pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <!-- Gradient Orbs -->
      <div class="absolute top-0 -left-4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div class="absolute top-0 -right-4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-20 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>

    <!-- Theme Toggle - Fixed Top Right -->
    <div v-if="showThemeToggle" class="fixed top-6 right-6 z-50">
      <DpThemeToggle />
    </div>

    <!-- Content Container -->
    <div class="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          <!-- Left Column - Content -->
          <div class="space-y-10 text-center lg:text-left">
          <!-- Tech Badge -->
          <div v-if="showTechBadge" class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <div class="flex items-center gap-2">
              <div class="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span class="text-sm font-medium text-foreground">
                Built with Nuxt 3 • Vue 3 • TypeScript • Tailwind
              </span>
            </div>
          </div>

          <!-- Title -->
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            {{ title }}
          </h1>

          <!-- Subtitle -->
          <p class="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
            {{ subtitle }}
          </p>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
            <!-- Demo Button -->
            <NuxtLink :to="demoButtonLink" class="w-full sm:w-auto">
              <DpButton variant="primary" size="lg" class="w-full sm:w-auto group">
                <Icon name="lucide:play-circle" class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                {{ demoButtonText }}
              </DpButton>
            </NuxtLink>

            <!-- Waitlist Button -->
            <DpButton
              v-if="showWaitlist"
              variant="outline"
              size="lg"
              class="w-full sm:w-auto"
              @click="showWaitlistModal = true"
            >
              <Icon name="lucide:mail" class="w-5 h-5 mr-2" />
              Rejoindre la Waitlist
            </DpButton>
          </div>

          <!-- Social Proof / Stats -->
          <div class="flex flex-wrap gap-8 justify-center lg:justify-start pt-6">
            <div class="text-center lg:text-left">
              <div class="text-3xl font-bold text-foreground">50+</div>
              <div class="text-sm text-muted-foreground">Composants UI</div>
            </div>
            <div class="text-center lg:text-left">
              <div class="text-3xl font-bold text-foreground">100%</div>
              <div class="text-sm text-muted-foreground">TypeScript</div>
            </div>
            <div class="text-center lg:text-left">
              <div class="text-3xl font-bold text-foreground">A11y</div>
              <div class="text-sm text-muted-foreground">Accessible</div>
            </div>
          </div>
        </div>

        <!-- Right Column - Dashboard Preview -->
        <div class="relative">
          <!-- Glow Effect -->
          <div class="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl opacity-75"></div>

          <!-- Dashboard Screenshot Container -->
          <div class="relative rounded-2xl border-2 border-border/50 shadow-2xl overflow-hidden bg-background backdrop-blur-sm">
            <!-- Browser Chrome -->
            <div class="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
              <div class="flex gap-2">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>

            <!-- Screenshot Placeholder (you'll replace this with actual screenshots) -->
            <div class="relative aspect-[16/10] bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
              <ClientOnly>
                <!-- Light Mode Screenshot -->
                <div v-if="colorMode.value === 'light'" class="absolute inset-0">
                  <div v-if="backgroundImage" class="w-full h-full">
                    <img :src="backgroundImage" alt="Dashboard Preview Light" class="w-full h-full object-cover" />
                  </div>
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <!-- Placeholder when no image -->
                    <div class="text-center space-y-4 p-8">
                      <Icon name="lucide:layout-dashboard" class="w-24 h-24 text-primary/40 mx-auto" />
                      <p class="text-sm text-muted-foreground">Dashboard Preview (Light Mode)</p>
                    </div>
                  </div>
                </div>

                <!-- Dark Mode Screenshot -->
                <div v-else class="absolute inset-0">
                  <div v-if="backgroundImageDark" class="w-full h-full">
                    <img :src="backgroundImageDark" alt="Dashboard Preview Dark" class="w-full h-full object-cover" />
                  </div>
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <!-- Placeholder when no image -->
                    <div class="text-center space-y-4 p-8">
                      <Icon name="lucide:layout-dashboard" class="w-24 h-24 text-primary/40 mx-auto" />
                      <p class="text-sm text-muted-foreground">Dashboard Preview (Dark Mode)</p>
                    </div>
                  </div>
                </div>
              </ClientOnly>

              <!-- Floating Theme Toggle Indicator -->
              <div class="absolute top-4 right-4 z-10">
                <div class="px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-lg flex items-center gap-2">
                  <Icon name="lucide:sun" class="w-4 h-4 text-yellow-500" />
                  <Icon name="lucide:arrow-right-left" class="w-3 h-3 text-muted-foreground" />
                  <Icon name="lucide:moon" class="w-4 h-4 text-blue-500" />
                </div>
              </div>
            </div>
          </div>

          <!-- Floating Feature Cards -->
          <div class="hidden lg:block absolute -right-8 top-1/4 w-48 p-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg shadow-lg">
            <div class="flex items-start gap-3">
              <div class="p-2 bg-primary/10 rounded-lg">
                <Icon name="lucide:zap" class="w-5 h-5 text-primary" />
              </div>
              <div>
                <div class="text-sm font-semibold text-foreground">Performance</div>
                <div class="text-xs text-muted-foreground">Lighthouse 95+</div>
              </div>
            </div>
          </div>

          <div class="hidden lg:block absolute -left-8 bottom-1/4 w-48 p-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg shadow-lg">
            <div class="flex items-start gap-3">
              <div class="p-2 bg-secondary/10 rounded-lg">
                <Icon name="lucide:palette" class="w-5 h-5 text-secondary" />
              </div>
              <div>
                <div class="text-sm font-semibold text-foreground">Customizable</div>
                <div class="text-xs text-muted-foreground">Thème CSS Variables</div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>

    <!-- Waitlist Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showWaitlistModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          @click.self="showWaitlistModal = false"
        >
          <div
            class="relative w-full max-w-md bg-background rounded-2xl shadow-2xl border border-border p-6 space-y-6"
            @click.stop
          >
            <button
              @click="showWaitlistModal = false"
              class="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Icon name="lucide:x" class="w-5 h-5" />
            </button>

            <div class="space-y-2">
              <h2 class="text-2xl font-bold text-foreground">Rejoignez la Waitlist</h2>
              <p class="text-muted-foreground">
                Soyez parmi les premiers à découvrir Nuxt Dashboard Pro et recevez des offres exclusives.
              </p>
            </div>

            <DpWaitlistForm
              button-text="S'inscrire"
              placeholder="votre@email.com"
              success-message="Merci ! Nous vous contacterons bientôt."
              @success="handleWaitlistSuccess"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
@keyframes blob {
  0%, 100% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
