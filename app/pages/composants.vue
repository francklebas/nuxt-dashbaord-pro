<script setup lang="ts">
import DpButton from "@ui/DpButton.vue";
import DpModal from "@ui/components/DpModal.vue";
import DpComponentPlayground from "@ui/components/DpComponentPlayground.vue";
import DpTabs from "@ui/components/DpTabs.vue";
import DpTooltip from "@ui/components/DpTooltip.vue";
import type { PlaygroundControl } from "@ui/components/DpComponentPlayground.vue";
import type { DpTab } from "@ui/components/DpTabs.vue";

const { t } = useI18n();

useHead({
  title: t("components.title"),
  meta: [
    {
      name: "description",
      content:
        "Explore the complete UI component library with interactive examples. Includes buttons, modals, tabs, tooltips, and more. Built with Vue 3 and Tailwind CSS.",
    },
  ],
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
  {
    id: "tabs",
    name: "components.tabs",
    description: "components.tabsDesc",
  },
  {
    id: "tooltips",
    name: "components.tooltips",
    description: "components.tooltipsDesc",
  },
];

// Active section for scrollspy
const activeSection = ref("buttons");

// Tabs configuration
const componentTabs: DpTab[] = [
  { id: "playground", label: "Playground", icon: "lucide:sparkles" },
  { id: "examples", label: "Examples", icon: "lucide:grid-3x3" },
];

// Modal state for demo
const demoModalOpen = ref(false);

// Copy feedback state
const copiedTabs = ref(false);
const copiedTooltip = ref(false);

// Button playground controls
const buttonControls: PlaygroundControl[] = [
  {
    name: "variant",
    type: "select",
    label: "Variant",
    options: ["primary", "secondary", "outline", "ghost", "destructive"],
  },
  {
    name: "size",
    type: "select",
    label: "Size",
    options: ["sm", "md", "lg"],
  },
  {
    name: "disabled",
    type: "boolean",
    label: "Disabled",
  },
];

// Modal playground controls
const modalControls: PlaygroundControl[] = [
  {
    name: "title",
    type: "text",
    label: "Title",
    default: "Modal Title",
    placeholder: "Enter modal title",
  },
  {
    name: "description",
    type: "text",
    label: "Description",
    default: "This is a modal description",
    placeholder: "Enter modal description",
  },
  {
    name: "size",
    type: "select",
    label: "Size",
    options: ["sm", "md", "lg", "xl", "full"],
  },
  {
    name: "showClose",
    type: "boolean",
    label: "Show Close Button",
    default: true,
  },
];

// Tabs playground - demo tabs configuration
const demoTabs: DpTab[] = [
  { id: "tab1", label: "Tab 1", icon: "lucide:home" },
  { id: "tab2", label: "Tab 2", icon: "lucide:settings" },
  { id: "tab3", label: "Tab 3", icon: "lucide:user" },
];

// Playground modal state
const playgroundModalOpen = ref(false);

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

// Copy tabs code to clipboard
const copyTabsCode = async () => {
  const code = `<script setup>
const tabs = [
  { id: "tab1", label: "Home", icon: "lucide:home" },
  { id: "tab2", label: "Settings", icon: "lucide:settings" },
  { id: "tab3", label: "User", icon: "lucide:user" }
];
<\/script>

<DpTabs :tabs="tabs" default-tab="tab1">
  <template #tab1>
    <div>Home content</div>
  </template>
  <template #tab2>
    <div>Settings content</div>
  </template>
  <template #tab3>
    <div>User content</div>
  </template>
</DpTabs>`;

  try {
    await navigator.clipboard.writeText(code);
    copiedTabs.value = true;
    setTimeout(() => {
      copiedTabs.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy code:", err);
  }
};

// Copy tooltip code to clipboard
const copyTooltipCode = async () => {
  const code = `<DpTooltip content="Helpful information" side="top">
  <DpButton>Hover me</DpButton>
</DpTooltip>`;

  try {
    await navigator.clipboard.writeText(code);
    copiedTooltip.value = true;
    setTimeout(() => {
      copiedTooltip.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy code:", err);
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
            <div class="mb-6">
              <h2 class="text-2xl font-bold text-foreground mb-2">
                {{ $t("components.buttons") }}
              </h2>
              <p class="text-sm text-muted-foreground">
                {{ $t("components.buttonsDesc") }}
              </p>
            </div>

            <!-- Tabs -->
            <DpTabs :tabs="componentTabs" default-tab="playground">
              <!-- Playground Tab -->
              <template #playground>
                <DpComponentPlayground
                  component-name="DpButton"
                  :controls="buttonControls"
                  :default-props="{ variant: 'primary', size: 'md' }"
                  default-slot="Click me"
                >
                  <template #preview="{ props: componentProps, slotContent }">
                    <DpButton
                      :variant="componentProps.variant"
                      :size="componentProps.size"
                      :disabled="componentProps.disabled"
                    >
                      {{ slotContent }}
                    </DpButton>
                  </template>
                </DpComponentPlayground>
              </template>

              <!-- Examples Tab -->
              <template #examples>
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

                <!-- Features List -->
                <div>
                  <h3 class="text-lg font-semibold text-foreground mb-4">Features</h3>
                  <ul class="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Multiple variants (primary, secondary, outline, ghost, destructive)</li>
                    <li>Three sizes (small, medium, large)</li>
                    <li>Disabled state support</li>
                    <li>Icon support with flexible slot composition</li>
                    <li>Fully accessible with proper ARIA attributes</li>
                    <li>Responsive design with TailwindCSS</li>
                    <li>Hover and focus states</li>
                  </ul>
                </div>
              </div>
              </template>
            </DpTabs>
          </section>

          <!-- Modals Section -->
          <section id="modals" class="scroll-mt-20">
            <div class="mb-6">
              <h2 class="text-2xl font-bold text-foreground mb-2">
                {{ $t("components.modals") }}
              </h2>
              <p class="text-sm text-muted-foreground">
                {{ $t("components.modalsDesc") }}
              </p>
            </div>

            <!-- Tabs -->
            <DpTabs :tabs="componentTabs" default-tab="playground">
              <!-- Playground Tab -->
              <template #playground>
                <DpComponentPlayground
                  component-name="DpModal"
                  :controls="modalControls"
                  :default-props="{ title: 'Modal Title', description: 'This is a modal description', size: 'md', showClose: true }"
                  default-slot="Modal content goes here"
                >
                  <template #preview="{ props: componentProps, slotContent }">
                    <DpModal
                      v-model:open="playgroundModalOpen"
                      :title="componentProps.title"
                      :description="componentProps.description"
                      :size="componentProps.size"
                      :show-close="componentProps.showClose"
                    >
                      <template #trigger>
                        <DpButton variant="primary">Open Playground Modal</DpButton>
                      </template>
                      <div class="text-foreground">
                        {{ slotContent }}
                      </div>
                    </DpModal>
                  </template>
                </DpComponentPlayground>
              </template>

              <!-- Examples Tab -->
              <template #examples>
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

                <!-- Features List -->
                <div>
                  <h3 class="text-lg font-semibold text-foreground mb-4">Features</h3>
                  <ul class="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Multiple sizes (sm, md, lg, xl, full)</li>
                    <li>Customizable title and description</li>
                    <li>Optional close button</li>
                    <li>Trigger slot for flexible activation</li>
                    <li>Backdrop overlay with click-to-close</li>
                    <li>Keyboard support (Escape to close)</li>
                    <li>Built with Reka UI Dialog (Radix Vue)</li>
                    <li>Full ARIA accessibility compliance</li>
                    <li>Focus trap and focus return</li>
                    <li>Portal-based rendering</li>
                  </ul>
                </div>
              </div>
              </template>
            </DpTabs>
          </section>

          <!-- Tabs Section -->
          <section id="tabs" class="scroll-mt-20">
            <div class="mb-6">
              <h2 class="text-2xl font-bold text-foreground mb-2">
                {{ $t("components.tabs") }}
              </h2>
              <p class="text-sm text-muted-foreground">
                {{ $t("components.tabsDesc") }}
              </p>
            </div>

            <!-- Tabs component tabs -->
            <DpTabs :tabs="componentTabs" default-tab="playground">
              <!-- Playground Tab -->
              <template #playground>
                <div class="bg-background border border-border rounded-lg shadow-sm overflow-hidden">
                  <!-- Info Section -->
                  <div class="border-b border-border bg-muted/30 p-6">
                    <h3 class="text-lg font-semibold text-foreground mb-4">Playground</h3>
                    <p class="text-sm text-muted-foreground mb-4">
                      The DpTabs component is demonstrated on this page itself. Each component section (Buttons, Modals, and Tabs) uses the tabs component to organize Playground and Examples content.
                    </p>
                  </div>

                  <!-- Preview Section -->
                  <div class="p-6 bg-background">
                    <div class="flex items-center justify-between mb-4">
                      <h4 class="text-sm font-semibold text-foreground">Live Preview</h4>
                    </div>

                    <div class="flex items-center justify-center p-8 border-2 border-dashed border-border rounded-lg bg-muted/20">
                      <div class="w-full max-w-2xl">
                        <DpTabs :tabs="demoTabs" default-tab="tab1">
                          <template #tab1>
                            <div class="p-6 bg-background border border-border rounded-lg">
                              <h4 class="text-lg font-semibold text-foreground mb-2">Home Tab</h4>
                              <p class="text-muted-foreground">This is the content for the home tab.</p>
                            </div>
                          </template>
                          <template #tab2>
                            <div class="p-6 bg-background border border-border rounded-lg">
                              <h4 class="text-lg font-semibold text-foreground mb-2">Settings Tab</h4>
                              <p class="text-muted-foreground">This is the content for the settings tab.</p>
                            </div>
                          </template>
                          <template #tab3>
                            <div class="p-6 bg-background border border-border rounded-lg">
                              <h4 class="text-lg font-semibold text-foreground mb-2">User Tab</h4>
                              <p class="text-muted-foreground">This is the content for the user tab.</p>
                            </div>
                          </template>
                        </DpTabs>
                      </div>
                    </div>
                  </div>

                  <!-- Code Section -->
                  <div class="border-t border-border bg-muted/30 p-6">
                    <div class="flex items-center justify-between mb-3">
                      <h4 class="text-sm font-semibold text-foreground">Usage Example</h4>
                      <button
                        @click="copyTabsCode"
                        class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
                      >
                        <Icon :name="copiedTabs ? 'lucide:check' : 'lucide:copy'" class="w-4 h-4" />
                        {{ copiedTabs ? $t('components.copied') : $t('components.copy') }}
                      </button>
                    </div>

                    <pre class="p-4 bg-background border border-border rounded-md overflow-x-auto text-sm"><code class="text-foreground font-mono">&lt;script setup&gt;
const tabs = [
  { id: "tab1", label: "Home", icon: "lucide:home" },
  { id: "tab2", label: "Settings", icon: "lucide:settings" },
  { id: "tab3", label: "User", icon: "lucide:user" }
];
&lt;/script&gt;

&lt;DpTabs :tabs="tabs" default-tab="tab1"&gt;
  &lt;template #tab1&gt;
    &lt;div&gt;Home content&lt;/div&gt;
  &lt;/template&gt;
  &lt;template #tab2&gt;
    &lt;div&gt;Settings content&lt;/div&gt;
  &lt;/template&gt;
  &lt;template #tab3&gt;
    &lt;div&gt;User content&lt;/div&gt;
  &lt;/template&gt;
&lt;/DpTabs&gt;</code></pre>
                  </div>
                </div>
              </template>

              <!-- Examples Tab -->
              <template #examples>
                <div class="space-y-8">
                  <!-- Basic Tabs -->
                  <div>
                    <h3 class="text-lg font-semibold text-foreground mb-4">Basic Tabs</h3>
                    <DpTabs
                      :tabs="[
                        { id: 'overview', label: 'Overview' },
                        { id: 'details', label: 'Details' },
                        { id: 'settings', label: 'Settings' }
                      ]"
                      default-tab="overview"
                    >
                      <template #overview>
                        <div class="p-4 bg-muted/20 rounded-lg">
                          <p class="text-foreground">Overview content goes here.</p>
                        </div>
                      </template>
                      <template #details>
                        <div class="p-4 bg-muted/20 rounded-lg">
                          <p class="text-foreground">Detailed information goes here.</p>
                        </div>
                      </template>
                      <template #settings>
                        <div class="p-4 bg-muted/20 rounded-lg">
                          <p class="text-foreground">Settings panel goes here.</p>
                        </div>
                      </template>
                    </DpTabs>
                  </div>

                  <!-- Tabs with Icons -->
                  <div>
                    <h3 class="text-lg font-semibold text-foreground mb-4">Tabs with Icons</h3>
                    <DpTabs
                      :tabs="[
                        { id: 'files', label: 'Files', icon: 'lucide:folder' },
                        { id: 'images', label: 'Images', icon: 'lucide:image' },
                        { id: 'documents', label: 'Documents', icon: 'lucide:file-text' }
                      ]"
                      default-tab="files"
                    >
                      <template #files>
                        <div class="p-4 bg-muted/20 rounded-lg">
                          <p class="text-foreground">📁 File manager interface</p>
                        </div>
                      </template>
                      <template #images>
                        <div class="p-4 bg-muted/20 rounded-lg">
                          <p class="text-foreground">🖼️ Image gallery interface</p>
                        </div>
                      </template>
                      <template #documents>
                        <div class="p-4 bg-muted/20 rounded-lg">
                          <p class="text-foreground">📄 Document list interface</p>
                        </div>
                      </template>
                    </DpTabs>
                  </div>

                  <!-- Features List -->
                  <div>
                    <h3 class="text-lg font-semibold text-foreground mb-4">Features</h3>
                    <ul class="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Full ARIA accessibility support (role, aria-selected, aria-controls)</li>
                      <li>Keyboard navigation (Arrow keys, Tab, Enter)</li>
                      <li>Optional icons with Nuxt Icon</li>
                      <li>v-model support for external state control</li>
                      <li>Named slots for flexible content organization</li>
                      <li>Independent state for multiple instances</li>
                      <li>Automatic focus management</li>
                    </ul>
                  </div>
                </div>
              </template>
            </DpTabs>
          </section>

          <!-- Tooltips Section -->
          <section id="tooltips" class="scroll-mt-20">
            <div class="mb-6">
              <h2 class="text-2xl font-bold text-foreground mb-2">
                {{ $t("components.tooltips") }}
              </h2>
              <p class="text-sm text-muted-foreground">
                {{ $t("components.tooltipsDesc") }}
              </p>
            </div>

            <!-- Tabs component tabs -->
            <DpTabs :tabs="componentTabs" default-tab="playground">
              <!-- Playground Tab -->
              <template #playground>
                <div class="bg-background border border-border rounded-lg shadow-sm overflow-hidden">
                  <!-- Info Section -->
                  <div class="border-b border-border bg-muted/30 p-6">
                    <h3 class="text-lg font-semibold text-foreground mb-4">Playground</h3>
                    <p class="text-sm text-muted-foreground mb-4">
                      Hover over the elements below to see tooltips in action. Tooltips provide contextual information on hover or focus.
                    </p>
                  </div>

                  <!-- Preview Section -->
                  <div class="p-6 bg-background">
                    <div class="flex items-center justify-between mb-4">
                      <h4 class="text-sm font-semibold text-foreground">Live Preview</h4>
                    </div>

                    <div class="flex items-center justify-center p-8 border-2 border-dashed border-border rounded-lg bg-muted/20">
                      <div class="flex flex-wrap gap-8 items-center justify-center">
                        <!-- Top Tooltip -->
                        <DpTooltip content="This is a top tooltip" side="top">
                          <DpButton variant="outline">Top</DpButton>
                        </DpTooltip>

                        <!-- Right Tooltip -->
                        <DpTooltip content="This is a right tooltip" side="right">
                          <DpButton variant="outline">Right</DpButton>
                        </DpTooltip>

                        <!-- Bottom Tooltip -->
                        <DpTooltip content="This is a bottom tooltip" side="bottom">
                          <DpButton variant="outline">Bottom</DpButton>
                        </DpTooltip>

                        <!-- Left Tooltip -->
                        <DpTooltip content="This is a left tooltip" side="left">
                          <DpButton variant="outline">Left</DpButton>
                        </DpTooltip>
                      </div>
                    </div>
                  </div>

                  <!-- Code Section -->
                  <div class="border-t border-border bg-muted/30 p-6">
                    <div class="flex items-center justify-between mb-3">
                      <h4 class="text-sm font-semibold text-foreground">Usage Example</h4>
                      <button
                        @click="copyTooltipCode"
                        class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
                      >
                        <Icon :name="copiedTooltip ? 'lucide:check' : 'lucide:copy'" class="w-4 h-4" />
                        {{ copiedTooltip ? $t('components.copied') : $t('components.copy') }}
                      </button>
                    </div>

                    <pre class="p-4 bg-background border border-border rounded-md overflow-x-auto text-sm"><code class="text-foreground font-mono">&lt;DpTooltip content="Helpful information" side="top"&gt;
  &lt;DpButton&gt;Hover me&lt;/DpButton&gt;
&lt;/DpTooltip&gt;</code></pre>
                  </div>
                </div>
              </template>

              <!-- Examples Tab -->
              <template #examples>
                <div class="space-y-8">
                  <!-- Basic Tooltip -->
                  <div>
                    <h3 class="text-lg font-semibold text-foreground mb-4">Basic Tooltip</h3>
                    <div class="flex gap-4">
                      <DpTooltip content="Simple tooltip">
                        <DpButton variant="primary">Hover for tooltip</DpButton>
                      </DpTooltip>
                    </div>
                  </div>

                  <!-- Tooltip Positions -->
                  <div>
                    <h3 class="text-lg font-semibold text-foreground mb-4">Positions</h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <DpTooltip content="Top tooltip" side="top">
                        <DpButton variant="outline" class="w-full">Top</DpButton>
                      </DpTooltip>
                      <DpTooltip content="Right tooltip" side="right">
                        <DpButton variant="outline" class="w-full">Right</DpButton>
                      </DpTooltip>
                      <DpTooltip content="Bottom tooltip" side="bottom">
                        <DpButton variant="outline" class="w-full">Bottom</DpButton>
                      </DpTooltip>
                      <DpTooltip content="Left tooltip" side="left">
                        <DpButton variant="outline" class="w-full">Left</DpButton>
                      </DpTooltip>
                    </div>
                  </div>

                  <!-- Icon with Tooltip -->
                  <div>
                    <h3 class="text-lg font-semibold text-foreground mb-4">Icon with Tooltip</h3>
                    <div class="flex gap-4">
                      <DpTooltip content="Information">
                        <button class="p-2 rounded-md hover:bg-muted transition-colors">
                          <Icon name="lucide:info" class="w-5 h-5 text-muted-foreground" />
                        </button>
                      </DpTooltip>
                      <DpTooltip content="Settings">
                        <button class="p-2 rounded-md hover:bg-muted transition-colors">
                          <Icon name="lucide:settings" class="w-5 h-5 text-muted-foreground" />
                        </button>
                      </DpTooltip>
                      <DpTooltip content="Help">
                        <button class="p-2 rounded-md hover:bg-muted transition-colors">
                          <Icon name="lucide:help-circle" class="w-5 h-5 text-muted-foreground" />
                        </button>
                      </DpTooltip>
                    </div>
                  </div>

                  <!-- With Different Content -->
                  <div>
                    <h3 class="text-lg font-semibold text-foreground mb-4">Different Content Lengths</h3>
                    <div class="flex flex-wrap gap-4">
                      <DpTooltip content="Short">
                        <DpButton variant="secondary" size="sm">Short</DpButton>
                      </DpTooltip>
                      <DpTooltip content="This is a medium length tooltip message">
                        <DpButton variant="secondary" size="sm">Medium</DpButton>
                      </DpTooltip>
                      <DpTooltip content="This is a much longer tooltip message that provides detailed information to the user about what this element does">
                        <DpButton variant="secondary" size="sm">Long</DpButton>
                      </DpTooltip>
                    </div>
                  </div>

                  <!-- Features List -->
                  <div>
                    <h3 class="text-lg font-semibold text-foreground mb-4">Features</h3>
                    <ul class="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Four positioning options (top, right, bottom, left)</li>
                      <li>Alignment control (start, center, end)</li>
                      <li>Configurable delay duration</li>
                      <li>Built with Reka UI Tooltip (Radix Vue)</li>
                      <li>Full ARIA accessibility compliance</li>
                      <li>Keyboard navigation support</li>
                      <li>Smooth animations with fade and zoom effects</li>
                      <li>Portal-based rendering to avoid z-index issues</li>
                      <li>Automatic collision detection and repositioning</li>
                      <li>Hover and focus trigger support</li>
                    </ul>
                  </div>
                </div>
              </template>
            </DpTabs>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>
