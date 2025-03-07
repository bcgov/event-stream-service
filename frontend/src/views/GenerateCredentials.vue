<script setup lang="ts">
import { Button, Message } from '@/lib/primevue';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';

import { useConfigStore, useGenerateCredentialsStore } from '@/store';
import CopyToClipboard from '@/components/form/CopyToClipboard.vue';
import { ButtonMode } from '@/utils/enums';
import InputText from 'primevue/inputtext';

// Store
const generateCredentialsStore = useGenerateCredentialsStore();
const { getConfig } = storeToRefs(useConfigStore());
const { getCredentials, getAccountName, getPassword } = storeToRefs(generateCredentialsStore);

onBeforeMount(async () => {
  generateCredentialsStore.reset();
});
</script>

<template>
  <Message
    v-if="getConfig?.notificationBanner"
    severity="warn"
  >
    {{ getConfig?.notificationBanner }}
  </Message>

  <div class="grid">
    <div class="col-6 col-offset-2">
      <div class="grid">
        <div class="col-2 font-bold text-right py-3">Account Name</div>
        <div class="col-10">
          <InputText
            id="accountName"
            v-model="getAccountName"
            aria-readonly="true"
            style="width: 100%"
          />
        </div>
      </div>
      <div class="grid">
        <div class="col-2 font-bold text-right py-3">Password</div>
        <div class="col-10">
          <InputText
            id="password"
            v-model="getPassword"
            aria-readonly="true"
            style="width: 100%"
          />
        </div>
      </div>
    </div>
    <div class="col-4">
      <Button
        class="mr-2"
        @click="generateCredentialsStore.generateCredentials()"
      >
        Generate
      </Button>
      <CopyToClipboard
        :mode="ButtonMode.BUTTON"
        :to-copy="JSON.stringify(getCredentials)"
      />
    </div>
  </div>
</template>
