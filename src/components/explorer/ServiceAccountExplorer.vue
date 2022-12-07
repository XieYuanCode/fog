<template>
  <div class="service-account-explorer-view w-full px-2 box-border select-none">
    {{serviceAccountStore.accounts}}
    <ServiceAccountExplorerItem v-for="serviceAccount in serviceAccountStore.accounts"></ServiceAccountExplorerItem>
  </div>
</template>

<script setup lang="ts">
import { useServiceAccounts } from '../../store/serviceAccounts';
import ServiceAccountExplorerItem from './ServiceAccountExplorerItem.vue';

const serviceAccountStore = useServiceAccounts()

</script>

<style scoped>
.service-account-explorer-view {
  height: 88%;
}
</style>