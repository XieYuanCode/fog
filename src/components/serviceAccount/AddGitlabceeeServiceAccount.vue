<template>
  <div class="add-service-account p-5 relative">
    <div class="header-text extra-large-text ml-4">Gitlab CE/EE</div>
    <ElForm :model="gitlabceeeInfo" size="small" label-width="180" label-position="right">
      <ElFormItem :label="$t('dialog.add_service_account.gitlabceee.host_label_text')">
        <ElInput size="small" v-model="gitlabceeeInfo.host" :prefix-icon="Location"/>
      </ElFormItem>
      <ElFormItem :label="$t('dialog.add_service_account.gitlabceee.name_label_text')">
        <ElInput size="small" v-model="gitlabceeeInfo.name" :prefix-icon="User" />
      </ElFormItem>
      <ElFormItem :label="$t('dialog.add_service_account.gitlabceee.pat_label_text')">
        <ElInput size="small" v-model="gitlabceeeInfo.pat" type="password" :prefix-icon="Lock" />
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { FogUserInfo } from "../../types/IUserInfo";
import { reactive } from "vue";
import gitlabCEEEAxiosInstanceFactory, { IGitlabUserInfo } from "../../message/GitLab"
import { Lock, User, Location } from '@element-plus/icons-vue'

const gitlabceeeInfo = reactive({
  host: "http://192.168.180.113",
  name: "xieyuan",
  pat: "",
  pt: ""
})


const addAccount = async () => {
  const axiosInstance = gitlabCEEEAxiosInstanceFactory.getInstance(gitlabceeeInfo.host, gitlabceeeInfo.name, gitlabceeeInfo.pat)

  const user = await axiosInstance.listCurrentUser() as FogUserInfo<IGitlabUserInfo>

  console.log('gitlabceee', user);
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