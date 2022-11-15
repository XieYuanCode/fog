<template>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { switchTheme } from "./utils/theme";
import { useAppearanceStore } from "./store/appearance"
import i18n from "./locale";
import { usePreferenceStore } from "./store/preference";
import electronStore from "./utils/electronStore"
import { requestNotificationPermission } from "./utils/notifications";
import contextMenuCallbackEventListener from "./utils/contextMenuCallback"

onMounted(() => {
  requestNotificationPermission();
  contextMenuCallbackEventListener.initEvents()

  switchTheme(useAppearanceStore().theme)
  i18n.global.locale = usePreferenceStore().language
})
</script>


<style>

</style>
