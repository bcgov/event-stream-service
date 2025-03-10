import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { GenerateCredentialsService } from '@/services';
import { useAppStore } from '@/store';

import type { Ref } from 'vue';
import type { GeneratedCredentials } from '@/types';

export type GenerateCredentialsStoreState = {
  credentials: Ref<any | null>;
};

export const useGenerateCredentialsStore = defineStore('gencreds', () => {
  // Store
  const appStore = useAppStore();
  const genCredsService = new GenerateCredentialsService();

  // State
  const state: GenerateCredentialsStoreState = {
    credentials: ref<GeneratedCredentials | null>(null)
  };

  // Getters
  const getters = {
    getCredentials: computed<GeneratedCredentials>(() => state.credentials.value),
    getAccountName: computed(() => (state.credentials.value ? state.credentials.value.accountName : null)),
    getPassword: computed(() => (state.credentials.value ? state.credentials.value.password : null))
  };

  // Actions
  async function generateCredentials() {
    try {
      appStore.beginIndeterminateLoading();
      state.credentials.value = await genCredsService.generateCredentials();
    } catch (e: any) {
      state.credentials.value = null;
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
