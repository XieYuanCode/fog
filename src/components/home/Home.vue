<template>
  <div class="home-view w-full h-full">
    <div class="move-window-content h-6 w-full absolute top-0 left-0 "></div>
    <FogLayout class="w-full h-full">
      <FogLayoutSider :resize-directions="['right']" class="home-left-panel h-full pt-5">
        <Explorer></Explorer>
      </FogLayoutSider>
      <FogLayoutContent class="home-right-panel h-full">Content</FogLayoutContent>
    </FogLayout>
  </div>
</template>

<script setup lang="ts">
import Explorer from "../explorer/Explorer.vue"
</script>


<style scoped>
.home-view {
  color: var(--color-text-2);
}

.home-left-panel {
  max-width: 400px;
  min-width: 280px;
  background: var(--color-bg-2) !important;
}

.home-right-panel {
  background: var(--color-bg-2-1) !important;
}
</style>
