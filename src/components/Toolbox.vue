<template>
  <div class="toolbox flex items-center px-3 justify-between box-border">
    <div class="toolbox-pre-actions"></div>
    <div class="toolbox-suffix-actions">
      <ElButton :icon="DArrowLeft" size="small" @click="emit('openTaskDrawer')"></ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DArrowLeft } from "@element-plus/icons-vue"

const emit = defineEmits(['openTaskDrawer'])
</script>