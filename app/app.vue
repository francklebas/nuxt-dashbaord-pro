<script lang="ts" setup>
import DpButton from "@ui/DpButton.vue";

function log(message: string): string {
  console.log(message);
  return message;
}
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <DpButton @click="log('coucou')">Hello world</DpButton>
  </div>
</template>
