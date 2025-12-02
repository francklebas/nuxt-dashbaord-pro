<script setup lang="ts">
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "reka-ui";

export interface DpModalProps {
  open?: boolean;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showClose?: boolean;
}

const props = withDefaults(defineProps<DpModalProps>(), {
  open: undefined,
  size: "md",
  showClose: true,
});

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

const sizeClasses = computed(() => {
  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full mx-4",
  };
  return sizes[props.size];
});
</script>

<template>
  <DialogRoot :open="open" @update:open="emit('update:open', $event)">
    <DialogTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      />

      <DialogContent
        :class="[
          'fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2',
          'bg-background border border-border rounded-lg shadow-lg',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
          'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          'focus:outline-none',
          sizeClasses,
        ]"
      >
        <div class="flex flex-col">
          <!-- Header -->
          <div
            v-if="title || description || $slots.header"
            class="px-6 pt-6 pb-4 border-b border-border"
          >
            <slot name="header">
              <DialogTitle
                v-if="title"
                class="text-lg font-semibold text-foreground"
              >
                {{ title }}
              </DialogTitle>
              <DialogDescription
                v-if="description"
                class="mt-1 text-sm text-muted-foreground"
              >
                {{ description }}
              </DialogDescription>
            </slot>
          </div>

          <!-- Body -->
          <div class="px-6 py-4 overflow-y-auto max-h-[calc(90vh-200px)]">
            <slot />
          </div>

          <!-- Footer -->
          <div
            v-if="$slots.footer"
            class="px-6 py-4 border-t border-border bg-muted/50"
          >
            <slot name="footer" />
          </div>
        </div>

        <!-- Close button -->
        <DialogClose
          v-if="showClose"
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-muted"
          aria-label="Close"
        >
          <Icon name="lucide:x" class="h-4 w-4" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
