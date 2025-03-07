import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { generateCredentialsService } from '@/services';
import { useAppStore } from '@/store';

import type { Ref } from 'vue';

export type GenerateCredentialsStoreState = {
  credentials: Ref<any | null>;
};

export const useGenerateCredentialsStore = defineStore('gencreds', () => {
  // Store
  const appStore = useAppStore();

  // State
  const state: GenerateCredentialsStoreState = {
    credentials: ref(null)
  };

  // Getters
  const getters = {
    getCredentials: computed(() => state.credentials.value),
    getAccountName: computed(() => (state.credentials.value ? state.credentials.value.accountName : null)),
    getPassword: computed(() => (state.credentials.value ? state.credentials.value.password : null))
  };

  // Actions
  async function generateCredentials() {
    try {
      appStore.beginIndeterminateLoading();
      state.credentials.value = (await generateCredentialsService.generateCredentials()).data;
    } finally {
      appStore.endIndeterminateLoading();
    }
  }

  function reset() {
    state.credentials.value = null;
  }

  return {
    // State
    ...state,

    // Getters
    ...getters,

    // Actions
    generateCredentials,
    reset
  };
});

export default useGenerateCredentialsStore;
