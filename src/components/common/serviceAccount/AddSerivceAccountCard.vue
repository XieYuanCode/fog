<template>
  <div class="add-serice-account-card border">
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  disabled?: boolean
}>()
</script>

<style scoped>
.add-serice-account-card {
  width: 120px;
  height: 120px;
}
</style>