<script setup lang="ts">
import DpButton from "@ui/DpButton.vue";
import DpModal from "@ui/components/DpModal.vue";

const { t } = useI18n();

useHead({
  title: t("components.title"),
});

// Component sections
const sections = [
  {
    id: "buttons",
    name: "components.buttons",
    description: "components.buttonsDesc",
  },
  {
    id: "modals",
    name: "components.modals",
    description: "components.modalsDesc",
  },
];

// Active section for scrollspy
const activeSection = ref("buttons");

// Modal state for demo
const demoModalOpen = ref(false);

// Scroll spy - update active section based on scroll position
const handleScroll = () => {
  const scrollPosition = window.scrollY + 100;

  for (const section of sections) {
    const element = document.getElementById(section.id);
    if (element) {
      const { offsetTop, offsetHeight } = element;
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = section.id;
        break;
      }
    }
  }
};

// Smooth scroll to section
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 80; // Account for fixed header
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-foreground mb-2">
          {{ $t("components.title") }}
        </h1>
        <p class="text-muted-foreground">
          {{ $t("components.description") }}
        </p>
      </div>

      <!-- Layout: Sidebar + Content -->
      <div class="flex gap-8">
        <!-- Sidebar Navigation -->
        <aside class="hidden lg:block w-64 flex-shrink-0">
          <nav class="sticky top-20 space-y-1">
            <button
              v-for="section in sections"
              :key="section.id"
              @click="scrollToSection(section.id)"
              :class="[
                'w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors',
                activeSection === section.id
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              ]"
            >
              {{ $t(section.name) }}
            </button>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 space-y-12">
          <!-- Buttons Section -->
          <section id="buttons" class="scroll-mt-20">
            <div class="bg-background border border-border rounded-lg shadow-sm p-6">
              <div class="mb-6">
                <h2 class="text-2xl font-bold text-foreground mb-2">
                  {{ $t("components.buttons") }}
                </h2>
                <p class="text-sm text-muted-foreground">
                  {{ $t("components.buttonsDesc") }}
                </p>
              </div>

              <div class="space-y-8">
                <!-- Variants -->
                <div>
                  <h3 class="text-lg font-semibold text-foreground mb-4">Variants</h3>
                  <div class="flex flex-wrap gap-4">
                    <DpButton variant="primary">Primary</DpButton>
                    <DpButton variant="secondary">Secondary</DpButton>
                    <DpButton variant="outline">Outline</DpButton>
                    <DpButton variant="ghost">Ghost</DpButton>
                    <DpButton variant="destructive">Destructive</DpButton>
                  </div>
                </div>

                <!-- Sizes -->
                <div>
                  <h3 class="text-lg font-semibold text-foreground mb-4">Sizes</h3>
                  <div class="flex flex-wrap items-center gap-4">
                    <DpButton size="sm">Small</DpButton>
                    <DpButton size="md">Medium</DpButton>
                    <DpButton size="lg">Large</DpButton>
                  </div>
                </div>

                <!-- States -->
                <div>
                  <h3 class="text-lg font-semibold text-foreground mb-4">States</h3>
                  <div class="flex flex-wrap gap-4">
                    <DpButton>Normal</DpButton>
                    <DpButton disabled>Disabled</DpButton>
                  </div>
                </div>

                <!-- With Icons -->
                <div>
                  <h3 class="text-lg font-semibold text-foreground mb-4">With Icons</h3>
                  <div class="flex flex-wrap gap-4">
                    <DpButton variant="primary">
                      <Icon name="lucide:check" class="w-4 h-4" />
                      Confirm
                    </DpButton>
                    <DpButton variant="outline">
                      <Icon name="lucide:trash-2" class="w-4 h-4" />
                      Delete
                    </DpButton>
                    <DpButton variant="secondary">
                      <Icon name="lucide:download" class="w-4 h-4" />
                      Download
                    </DpButton>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Modals Section -->
          <section id="modals" class="scroll-mt-20">
            <div class="bg-background border border-border rounded-lg shadow-sm p-6">
              <div class="mb-6">
                <h2 class="text-2xl font-bold text-foreground mb-2">
                  {{ $t("components.modals") }}
                </h2>
                <p class="text-sm text-muted-foreground">
                  {{ $t("components.modalsDesc") }}
                </p>
              </div>

              <div class="space-y-8">
                <!-- Basic Modal -->
                <div>
                  <h3 class="text-lg font-semibold text-foreground mb-4">Basic Modal</h3>
                  <DpModal
                    v-model:open="demoModalOpen"
                    title="Example Modal"
                    description="This is a demonstration modal component"
                  >
                    <template #trigger>
                      <DpButton variant="primary">
                        <Icon name="lucide:square" class="w-4 h-4" />
                        Open Modal
                      </DpButton>
                    </template>

                    <div class="space-y-4">
                      <p class="text-foreground">
                        This modal can contain any content you want to display.
                      </p>
                      <p class="text-muted-foreground text-sm">
                        Click outside or press Escape to close.
                      </p>
                    </div>
                  </DpModal>
                </div>

                <!-- Modal Sizes -->
                <div>
                  <h3 class="text-lg font-semibold text-foreground mb-4">Sizes</h3>
                  <div class="flex flex-wrap gap-4">
                    <DpModal title="Small Modal" size="sm">
                      <template #trigger>
                        <DpButton variant="outline" size="sm">Small</DpButton>
                      </template>
                      <p class="text-foreground">Small modal content</p>
                    </DpModal>

                    <DpModal title="Medium Modal" size="md">
                      <template #trigger>
                        <DpButton variant="outline" size="md">Medium</DpButton>
                      </template>
                      <p class="text-foreground">Medium modal content</p>
                    </DpModal>

                    <DpModal title="Large Modal" size="lg">
                      <template #trigger>
                        <DpButton variant="outline" size="lg">Large</DpButton>
                      </template>
                      <p class="text-foreground">Large modal content</p>
                    </DpModal>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>
