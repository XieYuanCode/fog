<template>
  <div class="home-view w-full h-full">
    <div class="move-window-content h-6 w-full absolute top-0 left-0 "></div>
    <FogLayout class="w-full h-full">
      <FogLayoutSider :resize-directions="['right']" class="home-left-panel h-full pt-5 ">
        <FogRadioGroup type="button" size="mini" class="switch-explorer-view-radio absolute top-5 right-5"
          v-model="currentSelectExplorerType">
          <FogRadio value="ServiceAccount">
            <IconCloud />
          </FogRadio>
          <FogRadio value="LocalRepos">
            <IconDesktop />
          </FogRadio>
        </FogRadioGroup>
        <Transition name="fade">
          <Explorer class="git-repo explorer mt-8 absolute h-5/6 overflow-y-scroll" v-if="currentSelectExplorerType === 'LocalRepos'">
          </Explorer>
          <div class="asd mt-8 absolute" v-else>ServiceAccounts</div>
        </Transition>
      </FogLayoutSider>
      <FogLayoutContent class="home-right-panel h-full">Content</FogLayoutContent>
    </FogLayout>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Explorer from "../explorer/Explorer.vue"

const currentSelectExplorerType = ref("LocalRepos")
</script>

<style scoped>
.home-view {
  color: var(--color-text-2);
}

.home-left-panel {
  max-width: 400px;
  min-width: 240px;
  background: var(--color-bg-2) !important;
}

.home-right-panel {
  background: var(--color-bg-2-1) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s ease-out;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
