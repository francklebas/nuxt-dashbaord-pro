<script setup lang="ts">
definePageMeta({
  layout: false,
});

useHead({
  title: "Dashboard Preview - Nuxt Dashboard Pro",
  meta: [
    {
      name: "description",
      content: "Explorez toutes les fonctionnalités du Nuxt Dashboard Pro avec notre démo interactive.",
    },
  ],
});

const features = [
  {
    icon: "lucide:layout-dashboard",
    title: "Dashboard Analytics",
    description: "Visualisez vos métriques avec des graphiques interactifs et des KPIs en temps réel.",
    image: "/screenshots/dashboard.png",
  },
  {
    icon: "lucide:table",
    title: "Data Tables",
    description: "Tables de données avancées avec tri, filtrage, pagination et export.",
    image: "/screenshots/data-table.png",
  },
  {
    icon: "lucide:palette",
    title: "Dark Mode",
    description: "Thème sombre/clair avec transition fluide et personnalisation complète.",
    image: "/screenshots/dark-mode.png",
  },
  {
    icon: "lucide:shield-check",
    title: "Authentication",
    description: "Système d'authentification complet avec login, register et gestion de profil.",
    image: "/screenshots/auth.png",
  },
  {
    icon: "lucide:settings",
    title: "Settings",
    description: "Panneau de paramètres avec tabs, formulaires et validation.",
    image: "/screenshots/settings.png",
  },
  {
    icon: "lucide:smartphone",
    title: "Responsive Design",
    description: "Interface parfaitement adaptée à tous les écrans (mobile, tablette, desktop).",
    image: "/screenshots/responsive.png",
  },
];
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center gap-2">
            <NuxtLink to="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Icon name="lucide:arrow-left" class="w-5 h-5" />
              <span class="font-semibold">Retour</span>
            </NuxtLink>
          </div>
          <div class="flex items-center gap-4">
            <DpThemeToggle />
            <NuxtLink to="/auth/login">
              <DpButton variant="primary">
                Essayer Maintenant
              </DpButton>
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative py-20 overflow-hidden">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <div class="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span class="text-sm font-medium">Démo Interactive</span>
        </div>

        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
          Découvrez Nuxt Dashboard Pro
        </h1>
        <p class="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Explorez toutes les fonctionnalités de notre template premium et voyez comment il peut accélérer votre développement.
        </p>

        <!-- Live Demo Button -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <NuxtLink to="/dashboard">
            <DpButton variant="primary" size="lg" class="group">
              <Icon name="lucide:external-link" class="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              Ouvrir le Dashboard
            </DpButton>
          </NuxtLink>
          <NuxtLink to="/auth/login">
            <DpButton variant="outline" size="lg">
              <Icon name="lucide:log-in" class="w-5 h-5 mr-2" />
              Se Connecter
            </DpButton>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Showcase -->
    <section class="py-20 bg-muted/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Fonctionnalités Principales
          </h2>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tout ce dont vous avez besoin pour créer une application professionnelle
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="group relative bg-background border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300"
          >
            <div class="flex items-start gap-4 mb-4">
              <div class="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Icon :name="feature.icon" class="w-6 h-6 text-primary" />
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-foreground mb-2">
                  {{ feature.title }}
                </h3>
                <p class="text-muted-foreground">
                  {{ feature.description }}
                </p>
              </div>
            </div>

            <!-- Screenshot placeholder -->
            <div class="mt-4 aspect-video bg-muted rounded-lg border border-border overflow-hidden">
              <div class="w-full h-full flex items-center justify-center">
                <Icon :name="feature.icon" class="w-12 h-12 text-muted-foreground/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Stack Technique Moderne
          </h2>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
            Construit avec les meilleures technologies web
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center space-y-4">
            <div class="w-16 h-16 mx-auto bg-primary/10 rounded-xl flex items-center justify-center">
              <Icon name="logos:nuxt-icon" class="w-10 h-10" />
            </div>
            <div>
              <div class="font-semibold text-foreground">Nuxt 3</div>
              <div class="text-sm text-muted-foreground">Framework Vue</div>
            </div>
          </div>

          <div class="text-center space-y-4">
            <div class="w-16 h-16 mx-auto bg-primary/10 rounded-xl flex items-center justify-center">
              <Icon name="logos:vue" class="w-10 h-10" />
            </div>
            <div>
              <div class="font-semibold text-foreground">Vue 3</div>
              <div class="text-sm text-muted-foreground">Composition API</div>
            </div>
          </div>

          <div class="text-center space-y-4">
            <div class="w-16 h-16 mx-auto bg-primary/10 rounded-xl flex items-center justify-center">
              <Icon name="logos:typescript-icon" class="w-10 h-10" />
            </div>
            <div>
              <div class="font-semibold text-foreground">TypeScript</div>
              <div class="text-sm text-muted-foreground">Type Safety</div>
            </div>
          </div>

          <div class="text-center space-y-4">
            <div class="w-16 h-16 mx-auto bg-primary/10 rounded-xl flex items-center justify-center">
              <Icon name="logos:tailwindcss-icon" class="w-10 h-10" />
            </div>
            <div>
              <div class="font-semibold text-foreground">Tailwind CSS</div>
              <div class="text-sm text-muted-foreground">Utility First</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-foreground mb-6">
          Prêt à Commencer ?
        </h2>
        <p class="text-xl text-muted-foreground mb-8">
          Lancez votre projet en quelques minutes avec Nuxt Dashboard Pro
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/auth/register">
            <DpButton variant="primary" size="lg">
              <Icon name="lucide:rocket" class="w-5 h-5 mr-2" />
              Créer un Compte
            </DpButton>
          </NuxtLink>
          <NuxtLink to="/">
            <DpButton variant="outline" size="lg">
              <Icon name="lucide:arrow-left" class="w-5 h-5 mr-2" />
              Retour à l'Accueil
            </DpButton>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-border py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center text-muted-foreground">
          <p>&copy; 2024 Nuxt Dashboard Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
