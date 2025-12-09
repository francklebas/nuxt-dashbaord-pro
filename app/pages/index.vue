<script lang="ts" setup>
import DpButton from "@ui/DpButton.vue";
import DpModal from "@ui/components/DpModal.vue";

useHead({
  title: "Dashboard Pro - Modern Nuxt Template",
  meta: [
    {
      name: "description",
      content:
        "Professional Nuxt 4 dashboard template with Vue 3, TypeScript, and Tailwind CSS. Features dark mode, i18n, responsive design, and complete UI component library.",
    },
  ],
});

// Modal states
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
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="space-y-6">
      <section>
        <h2 class="text-2xl font-bold mb-4">Button Variants</h2>
        <div class="flex flex-wrap gap-4">
          <DpButton variant="primary">Primary</DpButton>
          <DpButton variant="secondary">Secondary</DpButton>
          <DpButton variant="outline">Outline</DpButton>
          <DpButton variant="ghost">Ghost</DpButton>
          <DpButton variant="destructive">Destructive</DpButton>
        </div>
      </section>

      <section>
        <h2 class="text-2xl font-bold mb-4">Button Sizes</h2>
        <div class="flex flex-wrap items-center gap-4">
          <DpButton size="sm">Small</DpButton>
          <DpButton size="md">Medium</DpButton>
          <DpButton size="lg">Large</DpButton>
        </div>
      </section>

      <section>
        <h2 class="text-2xl font-bold mb-4">Disabled State</h2>
        <div class="flex flex-wrap gap-4">
          <DpButton disabled>Disabled Primary</DpButton>
          <DpButton variant="outline" disabled>Disabled Outline</DpButton>
        </div>
      </section>

      <section>
        <h2 class="text-2xl font-bold mb-4">Modal Examples</h2>
        <div class="flex flex-wrap gap-4">
          <!-- Simple Modal with Trigger Slot -->
          <DpModal v-model:open="simpleModalOpen" title="Simple Modal Title" description="This is a simple modal example with a title and description.">
            <template #trigger>
              <DpButton variant="primary">
                <Icon name="lucide:eye" class="w-4 h-4" />
                Open Simple Modal
              </DpButton>
            </template>

            <div class="space-y-4">
              <p class="text-foreground">
                This is the content of the modal. You can add any content here.
              </p>
              <p class="text-muted-foreground text-sm">
                Click the X button or press Escape to close the modal.
              </p>
            </div>
          </DpModal>

          <!-- Modal with Form and Footer -->
          <DpButton variant="secondary" @click="formModalOpen = true">
            <Icon name="lucide:edit" class="w-4 h-4" />
            Open Form Modal
          </DpButton>

          <DpModal v-model:open="formModalOpen" title="Edit Profile" description="Make changes to your profile here." size="lg">
            <form @submit.prevent="handleFormSubmit" class="space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-foreground mb-1">
                  Name
                </label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-foreground mb-1">
                  Email
                </label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter your email"
                />
              </div>
            </form>

            <template #footer>
              <div class="flex justify-end gap-3">
                <DpButton variant="outline" @click="formModalOpen = false">
                  Cancel
                </DpButton>
                <DpButton variant="primary" @click="handleFormSubmit">
                  <Icon name="lucide:save" class="w-4 h-4" />
                  Save Changes
                </DpButton>
              </div>
            </template>
          </DpModal>
        </div>
      </section>
    </div>
  </main>
</template>
