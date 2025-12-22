<script setup lang="ts">
export interface DpMobileDrawerProps {
  open: boolean;
  position?: "left" | "right";
  width?: string;
}

const props = withDefaults(defineProps<DpMobileDrawerProps>(), {
  position: "right",
  width: "280px",
});

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

// Close drawer
const close = () => {
  emit("update:open", false);
};

// ESC key handler
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.open) {
    close();
  }
};

// Body scroll lock and keyboard handler
watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    }
  },
);

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = "";
  document.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-250 ease-in-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        @click="close"
        aria-hidden="true"
      />
    </Transition>

    <!-- Drawer -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      :enter-from-class="
        position === 'right' ? 'translate-x-full' : '-translate-x-full'
      "
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0"
      :leave-to-class="
        position === 'right' ? 'translate-x-full' : '-translate-x-full'
      "
    >
      <div
        v-if="open"
        :class="[
          'fixed top-0 bottom-0 z-50 bg-background border-border shadow-2xl overflow-y-auto',
          position === 'right'
            ? 'right-0 border-l'
            : 'left-0 border-r',
        ]"
        :style="{ width: width }"
        role="dialog"
        aria-modal="true"
        @click.stop
      >
        <!-- Close button -->
        <button
          @click="close"
          class="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring z-10"
          aria-label="Close navigation menu"
        >
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>

        <!-- Content -->
        <div class="p-6 pt-16">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
