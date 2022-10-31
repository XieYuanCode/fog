<template>
  <div class="add-service-account">
    {{ type }}
    <button @click="close">关闭</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const { type } = router.currentRoute.value.params;


console.log(type);

const close = () => {
  window_bridge.closeAddServiceAccountWindow(type);
}
</script>

<style scoped>

</style>