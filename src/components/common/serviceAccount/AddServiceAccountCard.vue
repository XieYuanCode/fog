<template>
  <div class="add-service-account-card rounded cursor-pointer relative flex flex-col justify-center items-center"
    :class="{ 'add-service-account-card-disabled': !props.info.available }" @click="onClicked">
    <GithubIcon
      v-if="props.info.type === ServiceAccountType.Github || props.info.type === ServiceAccountType.GithubEnterprise"
      :size="35"></GithubIcon>
    <GitlabIcon
      v-if="props.info.type === ServiceAccountType.GitLab || props.info.type === ServiceAccountType.GitlabCEEE"
      :size="35"></GitlabIcon>
    <CodingDevopsIcon v-if="props.info.type === ServiceAccountType.Coding" :size="35"></CodingDevopsIcon>
    <GiteeIcon v-if="props.info.type === ServiceAccountType.Gitee" :size="35"></GiteeIcon>
    <BitbucketIcon
      v-if="props.info.type === ServiceAccountType.Bitbucket || props.info.type === ServiceAccountType.BitbucketServer"
      :size="35"></BitbucketIcon>
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
  width: 130px;
  height: 70px;
  margin: 5px;
  border: 1px solid var(--el-border-color-darker);
  border-radius: var(--el-border-radius-base);
  box-shadow: var(--el-box-shadow-light)
}

.add-service-account-card:hover {
  box-shadow: var(--el-box-shadow-lighter)
}

.add-service-account-card-disabled {
  cursor: not-allowed;
  background-color: rgba(25, 25, 25, 0.3);
}

html.dark .add-service-account-card-disabled {
  background-color: rgba(84, 84, 84, 0.3);
}

.add-service-account-card-disabled:hover {
  box-shadow: var(--el-box-shadow-light) !important;
}

.add-service-account-card-type-text {
  font-size: 0.6rem;
  margin-top: 5px;
}
</style>