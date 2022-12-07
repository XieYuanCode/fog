<template>
  <div class="toolbox flex items-center px-3 justify-between box-border">
    <div class="toolbox-pre-actions"></div>
    <div class="toolbox-suffix-actions">
      <ELPopover placement="bottom" title="Title" :width="200" trigger="click"
        content="this is content, this is content, this is content">
        <ElButton :icon="Download" size="small"></ElButton>
      </ELPopover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Download } from "@element-plus/icons-vue"

const emit = defineEmits(['openTaskDrawer'])
</script>