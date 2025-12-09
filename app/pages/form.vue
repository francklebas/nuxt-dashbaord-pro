<script setup lang="ts">
import DpButton from "@ui/DpButton.vue";

const { t } = useI18n();

useHead({
  title: t("form.title"),
  meta: [
    {
      name: "description",
      content:
        "Contact form example with client-side validation, error handling, and success messages. Built with Vue 3 Composition API and TypeScript.",
    },
  ],
});

// Form state
const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  message: "",
});

const errors = ref<Record<string, string>>({});
const isSubmitting = ref(false);
const submitSuccess = ref(false);
const submitError = ref(false);

// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateForm = (): boolean => {
  errors.value = {};
  let isValid = true;

  // First name validation
  if (!formData.value.firstName.trim()) {
    errors.value.firstName = t("form.required");
    isValid = false;
  }

  // Last name validation
  if (!formData.value.lastName.trim()) {
    errors.value.lastName = t("form.required");
    isValid = false;
  }

  // Email validation
  if (!formData.value.email.trim()) {
    errors.value.email = t("form.required");
    isValid = false;
  } else if (!validateEmail(formData.value.email)) {
    errors.value.email = t("form.invalidEmail");
    isValid = false;
  }

  // Message validation
  if (!formData.value.message.trim()) {
    errors.value.message = t("form.required");
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;
  submitSuccess.value = false;
  submitError.value = false;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form submitted:", formData.value);

    submitSuccess.value = true;

    // Reset form after success
    formData.value = {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    };
  } catch (error) {
    console.error("Submit error:", error);
    submitError.value = true;
  } finally {
    isSubmitting.value = false;

    // Clear success/error message after 5 seconds
    setTimeout(() => {
      submitSuccess.value = false;
      submitError.value = false;
    }, 5000);
  }
};

const handleCancel = () => {
  formData.value = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  };
  errors.value = {};
  submitSuccess.value = false;
  submitError.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-background">
    <main class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Back to home link -->
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <Icon name="lucide:arrow-left" class="w-4 h-4" />
        {{ $t("welcome") }}
      </NuxtLink>

      <!-- Form card -->
      <div class="bg-background border border-border rounded-lg shadow-lg p-6 sm:p-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-foreground mb-2">
            {{ $t("form.title") }}
          </h1>
          <p class="text-muted-foreground">
            {{ $t("form.description") }}
          </p>
        </div>

        <!-- Success/Error messages -->
        <div v-if="submitSuccess" class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
          <div class="flex items-center gap-2">
            <Icon name="lucide:check-circle" class="w-5 h-5 text-green-600 dark:text-green-400" />
            <p class="text-sm font-medium text-green-800 dark:text-green-200">
              {{ $t("form.success") }}
            </p>
          </div>
        </div>

        <div v-if="submitError" class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <div class="flex items-center gap-2">
            <Icon name="lucide:alert-circle" class="w-5 h-5 text-red-600 dark:text-red-400" />
            <p class="text-sm font-medium text-red-800 dark:text-red-200">
              {{ $t("form.error") }}
            </p>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name fields row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- First Name -->
            <div>
              <label for="firstName" class="block text-sm font-medium text-foreground mb-2">
                {{ $t("form.firstName") }}
                <span class="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                v-model="formData.firstName"
                type="text"
                :placeholder="$t('form.firstNamePlaceholder')"
                :class="[
                  'w-full px-4 py-2 border rounded-md bg-background text-foreground transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
                  errors.firstName ? 'border-red-500' : 'border-input',
                ]"
              />
              <p v-if="errors.firstName" class="mt-1 text-sm text-red-500">
                {{ errors.firstName }}
              </p>
            </div>

            <!-- Last Name -->
            <div>
              <label for="lastName" class="block text-sm font-medium text-foreground mb-2">
                {{ $t("form.lastName") }}
                <span class="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                v-model="formData.lastName"
                type="text"
                :placeholder="$t('form.lastNamePlaceholder')"
                :class="[
                  'w-full px-4 py-2 border rounded-md bg-background text-foreground transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
                  errors.lastName ? 'border-red-500' : 'border-input',
                ]"
              />
              <p v-if="errors.lastName" class="mt-1 text-sm text-red-500">
                {{ errors.lastName }}
              </p>
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-foreground mb-2">
              {{ $t("form.email") }}
              <span class="text-red-500">*</span>
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="text"
              :placeholder="$t('form.emailPlaceholder')"
              :class="[
                'w-full px-4 py-2 border rounded-md bg-background text-foreground transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
                errors.email ? 'border-red-500' : 'border-input',
              ]"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-500">
              {{ errors.email }}
            </p>
          </div>

          <!-- Message -->
          <div>
            <label for="message" class="block text-sm font-medium text-foreground mb-2">
              {{ $t("form.message") }}
              <span class="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              v-model="formData.message"
              rows="5"
              :placeholder="$t('form.messagePlaceholder')"
              :class="[
                'w-full px-4 py-2 border rounded-md bg-background text-foreground transition-colors resize-none',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
                errors.message ? 'border-red-500' : 'border-input',
              ]"
            />
            <p v-if="errors.message" class="mt-1 text-sm text-red-500">
              {{ errors.message }}
            </p>
          </div>

          <!-- Form actions -->
          <div class="flex flex-col sm:flex-row gap-4 justify-end">
            <DpButton
              type="button"
              variant="outline"
              @click="handleCancel"
              :disabled="isSubmitting"
            >
              {{ $t("form.cancel") }}
            </DpButton>
            <DpButton
              type="submit"
              variant="primary"
              :disabled="isSubmitting"
            >
              <Icon v-if="isSubmitting" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
              <Icon v-else name="lucide:send" class="w-4 h-4" />
              {{ $t("form.submit") }}
            </DpButton>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>
