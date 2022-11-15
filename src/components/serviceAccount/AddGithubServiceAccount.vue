<template>
  <div class="add-service-account p-5 relative">
    <div class="extra-large-text header-text ml-4">GitHub</div>
    <ElForm :model="githubInfo" size="small" label-width="180" label-position="right">
      <ElFormItem :label="$t('dialog.add_service_account.github.name_label_text')">
        <ElInput size="small" v-model="githubInfo.name" :prefix-icon="User" />
      </ElFormItem>
      <ElFormItem :label="$t('dialog.add_service_account.github.pat_label_text')">
        <ElInput size="small" v-model="githubInfo.pat" type="password" :prefix-icon="Lock" />
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { FogUserInfo } from "../../types/IUserInfo";
import { reactive } from "vue";
import githubAxiosInstanceFactory, { IGitHubUserInfo } from "../../message/Github"
import { Lock, User } from '@element-plus/icons-vue'


const githubInfo = reactive({
  host: "https://github.com",
  name: "XieYuanCode",
  pat: "",
  pt: ""
})

const addAccount = async () => {
  const axiosInstance = githubAxiosInstanceFactory.getInstance(githubInfo.name, githubInfo.pat)

  const user = await axiosInstance.listCurrentUser() as FogUserInfo<IGitHubUserInfo>

  console.log('github', user);
}

defineExpose({ addAccount })
</script>

<style scoped>
.add-service-account {
  user-select: none;
}

.header-text {
  margin-bottom: 20px;
}
</style>