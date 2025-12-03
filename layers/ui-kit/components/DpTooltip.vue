<script setup lang="ts">
import { TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from "reka-ui";

export interface DpTooltipProps {
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  disableHoverableContent?: boolean;
}

const props = withDefaults(defineProps<DpTooltipProps>(), {
  side: "top",
  align: "center",
  delayDuration: 200,
  disableHoverableContent: false,
});
</script>

<template>
  <TooltipProvider :delay-duration="delayDuration" :disable-hoverable-content="disableHoverableContent">
    <TooltipRoot>
      <TooltipTrigger as-child>
        <slot>
          <!-- Default trigger if no slot provided -->
          <button class="inline-flex items-center justify-center">
            <Icon name="lucide:info" class="w-4 h-4" />
          </button>
        </slot>
      </TooltipTrigger>

      <TooltipPortal>
        <TooltipContent
          :side="side"
          :align="align"
          :side-offset="5"
          class="z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        >
          {{ content }}
          <slot name="content">
            <!-- Optional custom content slot -->
          </slot>
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
