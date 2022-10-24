<template>
  <div class="welcome-view select-none h-full p-10">
    <div class="move-window-content h-6 w-full absolute top-0 left-0"></div>
    <FogButton class="absolute right-5 bottom-5" type="primary" @click="goToHome" size="mini">Go to home</FogButton>
  </div>
</template>

<script setup lang="ts">
import { useAppearanceStore } from "../../store/appearance"

const appearanceStore = useAppearanceStore()

const goToHome = () => window_bridge.goToHome() // 欢迎页跳转主窗口
</script>


<style>
.welcome-view {
  background-color: var(--color-bg-2);
  color: var(--color-text-1);
  opacity: 0.5;
}

.move-window-content {
  -webkit-app-region: drag;
}
</style>
