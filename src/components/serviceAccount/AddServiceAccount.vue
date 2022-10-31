<template>
  <div class="add-service-account">
    {{ type }}
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const { type } = router.currentRoute.value.params;

console.log("???", type);
</script>

<style scoped>

</style>