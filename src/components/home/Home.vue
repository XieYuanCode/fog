<template>
  <div class="home-view w-full h-full">
    <div class="move-window-content h-6 w-full absolute top-0 left-0 "></div>
    <ElContainer class="home-container h-full">
      <ElAside width="250px"
        class="home-aside box-border flex flex-col items-end p-2 justify-start relative overflow-x-hidden">
        <ElRadioGroup v-model="currentSelectExplorerType" size="small">
          <ElTooltip :content="$t('tooltip.explorer_switch_service_account_radio')" placement="bottom"
            :show-after="1000">
            <ElRadioButton label="ServiceAccounts" @mousedown="fadeDirection = 'fade-forward'">
              <ElIcon>
                <MostlyCloudy />
              </ElIcon>
            </ElRadioButton>
          </ElTooltip>
          <ElTooltip :content="$t('tooltip.explorer_switch_local_repo_radio')" placement="bottom" :show-after="1000">
            <ElRadioButton label="LocalRepos" @mousedown="fadeDirection = 'fade-backward'">
              <ElIcon>
                <Monitor />
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
            <ElButton :icon="Setting" circle size="small" @click="openSetting"></ElButton>
            <ElButton :icon="Plus" circle size="small" @click="showAddContextMenu"></ElButton>
          </div>
        </div>
      </ElAside>
      <ElContainer class="home-main-container">
        <ElHeader height="45px" class="home-toolbox w-full ">ElHeader</ElHeader>
        <ElMain class="home-main w-full h-full ">
          <ElProgress :percentage="30" :stroke-width="1" :show-text="false"></ElProgress>
          {{ localRepositoryStore.groups.length }}

        </ElMain>
      </ElContainer>
    </ElContainer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import LocalRepoExplorer from "../explorer/LocalRepoExplorer.vue"
import ServiceAccountExplorer from "../explorer/ServiceAccountExplorer.vue"
import { Monitor, MostlyCloudy, Setting, Plus } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";
import contextMenuCallbackEventListener from "../../utils/contextMenuCallback"
import { useLocalRepositoryStore } from "../../store/localRepository"

const localRepositoryStore = useLocalRepositoryStore()

const { t } = useI18n()

const currentSelectExplorerType = ref("LocalRepos")

const fadeDirection = ref("fade-forward")

const addLocalReposButtonContextMenuTemplate = [
  {
    id: "local-repo-explorer-add-group",
    label: t("context_menu.local_repo_explorer_add_btn.add_group"),
  },
  {
    type: "separator",
  },
  {
    id: "local-repo-explorer-add-repo",
    label: t('context_menu.local_repo_explorer_add_btn.add_repo')
  },
  {
    id: "local-repo-explorer-create-repo",
    label: t('context_menu.local_repo_explorer_add_btn.create_repo')
  },
  {
    type: "separator",
  },
  {
    id: "local-repo-explorer-clone-repo",
    label: t('context_menu.local_repo_explorer_add_btn.clone_repo')
  }
]
const addServiceAccountButtonContextMenuTemplate = [
  {
    id: "add-service-account-github",
    label: "GitHub",
    icon: "public/icons/context-menu/add-service-account/github.png",
  },
  {
    id: "add-service-account-github-enterprise",
    label: "GitHub Enterprise",
    icon: "public/icons/context-menu/add-service-account/github.png",
    enabled: false
  },
  {
    id: "add-service-account-gitlab",
    label: "GitLab",
    icon: "public/icons/context-menu/add-service-account/gitlab.png",
    enabled: false
  },
  {
    id: "add-service-account-gitlab-ceee",
    label: "GitLab CE/EE",
    icon: "public/icons/context-menu/add-service-account/gitlab.png",
  },
  {
    id: "add-service-account-gitee",
    label: "Gitee",
    icon: "public/icons/context-menu/add-service-account/gitee.png",
    enabled: false
  },
  {
    id: "add-service-account-coding",
    label: "Coding",
    icon: "public/icons/context-menu/add-service-account/coding.png",
    enabled: false
  },
  {
    id: "add-service-account-bitbucket",
    label: "Bitbucket",
    icon: "public/icons/context-menu/add-service-account/bitbucket.png",
    enabled: false
  },
  {
    id: "add-service-account-bitbucket-server",
    label: "Bitbucket Server",
    icon: "public/icons/context-menu/add-service-account/bitbucket.png",
    enabled: false
  }
]

const openSetting = () => {
  window_bridge.openSetting()
}

const showAddContextMenu = (e: PointerEvent) => {
  common_bridge.showContextMenu(currentSelectExplorerType.value === "LocalRepos" ? addLocalReposButtonContextMenuTemplate : addServiceAccountButtonContextMenuTemplate, e.clientX, e.clientY)
}

const addGroupToLocalRepoExplorer = () => localRepositoryStore.addGroup("/")


onMounted(() => {
  contextMenuCallbackEventListener.addEventListener("local-repo-explorer-add-group", addGroupToLocalRepoExplorer)
})
</script>

<style scoped>
.home-view {
  /*  */
}

.home-main-container {
  background-color: var(--el-bg-color-2);
}

.home-aside {
  border-right: 1px solid var(--el-border-color);
  background-color: var(--el-bg-color-1);
}

.home-main {
  border-top: 1px solid var(--el-border-color);
}
</style>
