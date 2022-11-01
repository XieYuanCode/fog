<template>
  <div class="add-service-account-window">
    <AddGithubServiceAccountVue size="mini" v-if="type === ServiceAccountType.Github"></AddGithubServiceAccountVue>
    <AddGitlabceeeServiceAccountVue v-if="type === ServiceAccountType.GitlabCEEE"></AddGitlabceeeServiceAccountVue>

    <div class="add-service-account-window-footer">
      <FogButton size="mini" @click="close">cancel</FogButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ServiceAccountType } from '../../types/ServiceAccountType';
import { useRouter } from 'vue-router';
import AddGithubServiceAccountVue from './AddGithubServiceAccount.vue';
import AddGitlabceeeServiceAccountVue from './AddGitlabceeeServiceAccount.vue';

const router = useRouter();
const { type } = router.currentRoute.value.params;


const close = () => {
  window_bridge.closeAddServiceAccountWindow();
}
</script>

<style scoped>

</style>