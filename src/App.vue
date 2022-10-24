<template>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { switchTheme } from "./utils/theme";
import { useAppearanceStore } from "./store/appearance"

onMounted(() => {
  switchTheme(useAppearanceStore().theme)
})
</script>


<style>

</style>
