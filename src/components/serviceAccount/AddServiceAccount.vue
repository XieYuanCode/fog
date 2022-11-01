<template>
  <div class="add-service-account-window relative w-full h-full">
    <AddGithubServiceAccountVue size="mini" v-if="type === ServiceAccountType.Github" ref="addServiceAccountFormRef">
    </AddGithubServiceAccountVue>
    <AddGitlabceeeServiceAccountVue v-if="type === ServiceAccountType.GitlabCEEE" ref="addServiceAccountFormRef">
    </AddGitlabceeeServiceAccountVue>

    <span class="authentication-status absolute bottom-5 left-5">{{ authenticationStatus }}</span>
    <FogButton class="absolute right-24 bottom-5 z-50" shape="round" type="outline" size="mini" @click="closeWindow">
      {{ $t("dialog.add_service_account.cancel_btn_text") }}
    </FogButton>
    <FogButton class="absolute right-5 bottom-5 z-50" shape="round" type="primary" size="mini" @click="addAccount">
      {{ $t("dialog.add_service_account.confirm_btn_text") }}
    </FogButton>
  </div>
</template>

<script setup lang="ts">
import { ServiceAccountType } from '../../types/ServiceAccountType';
import { useRouter } from 'vue-router';
import AddGithubServiceAccountVue from './AddGithubServiceAccount.vue';
import AddGitlabceeeServiceAccountVue from './AddGitlabceeeServiceAccount.vue';
import { ref, computed } from 'vue';
import type { AxiosError } from 'axios';

const router = useRouter();
const { type } = router.currentRoute.value.params;
const addServiceAccountFormRef = ref<any>(null)

const authenticationStatus = ref("")

const closeWindow = () => {
  window_bridge.closeAddServiceAccountWindow();
}

const addAccount = async () => {
  authenticationStatus.value = "ing"

  try {
    await addServiceAccountFormRef.value.addAccount();
    authenticationStatus.value = "success"
    closeWindow()
  } catch (error) {
    authenticationStatus.value = "failed, " + (error as AxiosError<any>)?.response?.data?.message;
  }
}
</script>

<style scoped>
.add-service-account-window {
  background-color: var(--color-bg-2);
}

.authentication-status {
  color: var(--color-text-2);
}
</style>