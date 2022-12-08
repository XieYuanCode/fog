<template>
  <div class="add-service-account-window relative w-full h-full">
    <AddGithubServiceAccountVue size="mini" v-if="type === ServiceAccountType.Github" ref="addServiceAccountFormRef">
    </AddGithubServiceAccountVue>
    <AddGitlabceeeServiceAccountVue v-if="type === ServiceAccountType.GitlabCEEE" ref="addServiceAccountFormRef">
    </AddGitlabceeeServiceAccountVue>

    <span class="authentication-status absolute bottom-5 left-5 extra-small-text light-color-text">{{
        authenticationStatus
    }}</span>
    <ElButton class="absolute right-24 bottom-5 z-50" round plain size="small" @click="closeWindow">
      {{ $t("dialog.add_service_account.cancel_btn_text") }}
    </ElButton>
    <ElButton class="absolute right-5 bottom-5 z-50" round type="primary" size="small" @click="addAccount"
      :disabled="authenticationStatus === 'Authorizing...'">
      {{ $t("dialog.add_service_account.confirm_btn_text") }}
    </ElButton>
  </div>
</template>

<script setup lang="ts">
import { ServiceAccountType } from '../../types/ServiceAccountType';
import { useRouter } from 'vue-router';
import AddGithubServiceAccountVue from './AddGithubServiceAccount.vue';
import AddGitlabceeeServiceAccountVue from './AddGitlabceeeServiceAccount.vue';
import { ref } from 'vue';
import type { AxiosError } from 'axios';
import { useServiceAccounts } from '../../store/serviceAccounts';

const router = useRouter();
const { type } = router.currentRoute.value.params;
const addServiceAccountFormRef = ref<any>(null)
const serviceAccounts = useServiceAccounts()

const authenticationStatus = ref("")

const closeWindow = () => {
  window_bridge.closeAddServiceAccountWindow();
}

const addAccount = async () => {
  authenticationStatus.value = "Authorizing..."

  try {
    const user = await addServiceAccountFormRef.value.addAccount();
    serviceAccounts.addServiceAccount(user)
    authenticationStatus.value = "Authorization Succeeded"
    closeWindow()
  } catch (error) {
    authenticationStatus.value = "Authorization Failure, " + (error as AxiosError<any>)?.response?.data?.message;
  }
}
</script>

<style scoped>
.add-service-account-window {
  background-color: var(--el-bg-color-2);
}
</style>