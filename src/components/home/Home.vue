<template>
  <div class="home-view w-full h-full">
    <div class="move-window-content h-6 w-full absolute top-0 left-0 "></div>
    <ElContainer class="home-main-container h-full">
      <ElAside width="250px" class="home-aside box-border flex flex-col items-end p-2 justify-start relative overflow-x-hidden">
        <ElRadioGroup v-model="currentSelectExplorerType" size="small">
          <ElTooltip :content="$t('tooltip.explorer_switch_local_repo_radio')" placement="bottom" :show-after="1000">
            <ElRadioButton label="LocalRepos" @mousedown="fadeDirection = 'fade-backward'">
              <ElIcon>
                <Monitor />
              </ElIcon>
            </ElRadioButton>
          </ElTooltip>
          <ElTooltip :content="$t('tooltip.explorer_switch_service_account_radio')" placement="bottom"
            :show-after="1000">
            <ElRadioButton label="ServiceAccounts" @mousedown="fadeDirection = 'fade-forward'">
              <ElIcon>
                <MostlyCloudy />
              </ElIcon>
            </ElRadioButton>
          </ElTooltip>
        </ElRadioGroup>
        <Transition :name="fadeDirection">
          <LocalRepoExplorer v-if="currentSelectExplorerType === 'LocalRepos'"
            class="local-repo-explorer absolute mt-10 left-0"></LocalRepoExplorer>
          <ServiceAccountExplorer v-else class="service-account-explorer absolute mt-10 left-0">
          </ServiceAccountExplorer>
        </Transition>
        <div class="explorer-footer absolute bottom-0 right-0 w-full">
          <div class="explorer-footer-actions w-full h-full p-3 box-border flex justify-between items-center">
            <ElButton :icon="Setting" circle></ElButton>
            <ElButton :icon="Plus" circle></ElButton>
          </div>
        </div>
      </ElAside>
      <ElContainer>
        <ElHeader height="45px" class="home-toolbox w-full bg-blue-100">ElHeader</ElHeader>
        <ElMain class="home-main w-full h-full bg-green-100">ElMain</ElMain>
      </ElContainer>
    </ElContainer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import LocalRepoExplorer from "../explorer/LocalRepoExplorer.vue"
import ServiceAccountExplorer from "../explorer/ServiceAccountExplorer.vue"
import { Monitor, MostlyCloudy, Setting, Plus } from "@element-plus/icons-vue";

const currentSelectExplorerType = ref("LocalRepos")

const fadeDirection = ref("fade-forward")
</script>

<style scoped>
.home-view {
  background-color: var(--el-bg-color);
}
</style>
