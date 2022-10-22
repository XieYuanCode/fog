<template>
  <div id="welcome-view">
    <Button type="primary" @click="goToHome" class="a absolute right-10 bottom-10">Go to home</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@arco-design/web-vue"
const goToHome = () => {
  fog_bridge.goToHome()
}
</script>


<style>
#welcome-view {
  padding: 20px;
}
</style>
