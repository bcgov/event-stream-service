<script setup lang="ts">
import { Message } from '@/lib/primevue';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import { useConfigStore } from '@/store';

// Store
const { getConfig } = storeToRefs(useConfigStore());

const appTitle = computed(() => {
  return import.meta.env.VITE_TITLE;
});
</script>

<template>
  <Message
    v-if="getConfig?.notificationBanner"
    severity="warn"
  >
    {{ getConfig?.notificationBanner }}
  </Message>

  <div class="text-center">
    <h1 class="font-bold">Welcome to the {{ appTitle }}</h1>
  </div>
</template>
