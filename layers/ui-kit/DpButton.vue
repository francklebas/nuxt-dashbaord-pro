<script setup lang="ts">
export interface DpButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const props = withDefaults(defineProps<DpButtonProps>(), {
  variant: "primary",
  size: "md",
  disabled: false,
  type: "button",
});

const variantClasses = computed(() => {
  const variants = {
    primary:
      "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus-visible:ring-primary-600 dark:bg-primary-500 dark:hover:bg-primary-600",
    secondary:
      "bg-muted text-foreground hover:bg-muted/80 active:bg-muted/70 focus-visible:ring-border",
    outline:
      "border border-border bg-background text-foreground hover:bg-muted active:bg-muted/80 focus-visible:ring-border",
    ghost:
      "bg-transparent text-foreground hover:bg-muted active:bg-muted/80 focus-visible:ring-border",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-600 dark:bg-red-500 dark:hover:bg-red-600",
  };
  return variants[props.variant];
});

const sizeClasses = computed(() => {
  const sizes = {
    sm: "px-3 py-1.5 text-sm h-8",
    md: "px-4 py-2 text-base h-10",
    lg: "px-6 py-3 text-lg h-12",
  };
  return sizes[props.size];
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      variantClasses,
      sizeClasses,
    ]"
  >
    <slot />
  </button>
</template>
