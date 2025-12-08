<script setup lang="ts">
import DpButton from "../DpButton.vue";

export interface DpWaitlistFormProps {
  plan?: "current" | "v1" | "v2";
  buttonText?: string;
  placeholder?: string;
  successMessage?: string;
  errorMessage?: string;
}

const props = withDefaults(defineProps<DpWaitlistFormProps>(), {
  buttonText: "Join Waitlist",
  placeholder: "Enter your email",
  successMessage: "You're on the list! We'll notify you soon.",
  errorMessage: "Something went wrong. Please try again.",
});

const emit = defineEmits<{
  success: [email: string];
  error: [error: Error];
}>();

const email = ref("");
const isLoading = ref(false);
const status = ref<"idle" | "success" | "error">("idle");
const message = ref("");

const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.value);
});

const handleSubmit = async () => {
  if (!isValidEmail.value || isLoading.value) return;

  isLoading.value = true;
  status.value = "idle";
  message.value = "";

  try {
    const response = await $fetch("/api/waitlist", {
      method: "POST",
      body: {
        email: email.value,
        plan: props.plan,
      },
    });

    status.value = "success";
    message.value = props.successMessage;
    emit("success", email.value);
    email.value = "";
  } catch (error: any) {
    status.value = "error";
    message.value = error.data?.errors?.[0]?.message || props.errorMessage;
    emit("error", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="w-full">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="flex flex-col sm:flex-row gap-3">
        <input
          v-model="email"
          type="email"
          :placeholder="placeholder"
          required
          class="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          :disabled="isLoading"
        />
        <DpButton
          type="submit"
          variant="primary"
          size="lg"
          :disabled="!isValidEmail || isLoading"
          class="sm:w-auto w-full whitespace-nowrap"
        >
          <span v-if="isLoading">Joining...</span>
          <span v-else>{{ buttonText }}</span>
        </DpButton>
      </div>

      <!-- Status messages -->
      <Transition
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="status !== 'idle'"
          class="text-sm rounded-lg p-3"
          :class="[
            status === 'success'
              ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800',
          ]"
        >
          {{ message }}
        </div>
      </Transition>
    </form>
  </div>
</template>
