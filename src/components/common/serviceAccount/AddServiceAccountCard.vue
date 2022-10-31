<template>
  <div class="add-service-account-card rounded cursor-pointer relative flex flex-col justify-center items-center"
    :class="{ 'add-service-account-card-disabled': !props.info.available }" @click="onClicked">
    <div class="add-service-account-card-mark absolute left-0 top-0 rounded" v-if="!props.info.available"></div>
    <GithubIcon
      v-if="props.info.type === ServiceAccountType.Github || props.info.type === ServiceAccountType.GithubEnterprise"
      :size="40"></GithubIcon>
    <GitlabIcon
      v-if="props.info.type === ServiceAccountType.GitLab || props.info.type === ServiceAccountType.GitlabCEEE"
      :size="40"></GitlabIcon>
    <CodingDevopsIcon v-if="props.info.type === ServiceAccountType.Coding" :size="40"></CodingDevopsIcon>
    <GiteeIcon v-if="props.info.type === ServiceAccountType.Gitee" :size="40"></GiteeIcon>
    <BitbucketIcon
      v-if="props.info.type === ServiceAccountType.Bitbucket || props.info.type === ServiceAccountType.BitbucketServer"
      :size="40"></BitbucketIcon>
    <span class="add-service-account-card-type-text">
      {{ props.info.type }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { AvailableServiceAccountType } from '../../../types/AvailableServiceAccountType';
import GithubIcon from '../../icons/GithubIcon.vue';
import GitlabIcon from '../../icons/GitlabIcon.vue';
import GiteeIcon from '../../icons/GiteeIcon.vue';
import BitbucketIcon from '../../icons/BitbucketIcon.vue';
import CodingDevopsIcon from "../../icons/CodingDevopsIcon.vue"
import { ServiceAccountType } from '../../../types/ServiceAccountType';

const props = defineProps<{
  info: AvailableServiceAccountType
}>()
const emits = defineEmits(["click"])

const onClicked = () => {
  props.info.available && emits("click", props.info.type)
}

</script>

<style scoped>
.add-service-account-card {
  width: 140px;
  height: 70px;
  margin: 5px;
  box-shadow: inset 0px 0px 5px rgb(var(--primary-4));
}

.add-service-account-card:hover {
  box-shadow: inset -0px 0px 7px rgb(var(--primary-4));
}

.add-service-account-card-disabled {
  cursor: not-allowed;
  filter: grayscale(1);
}

body[arco-theme='dark'] .add-service-account-card {
  filter: brightness(1.5);
}

.add-service-account-card-disabled:hover {
  box-shadow: inset 0px 0px 5px rgb(var(--primary-4)) !important;
}

.add-service-account-card-mark {
  width: 140px;
  height: 70px;
  background-color: rgb(var(--primary-4));
  opacity: 0.5;
}

body[arco-theme='dark'] .add-service-account-card-mark {
  background-color: rgb(var(--primary-5));
}

.add-service-account-card-type-text {
  font-size: 0.6rem;
  color: var(--color-text-2)
}
</style>