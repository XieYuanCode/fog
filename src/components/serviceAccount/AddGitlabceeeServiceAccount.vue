<template>
  <div class="add-service-account p-5 relative">
    <div class="header-text ml-4">Gitlab CE/EE</div>
    <FogTrigger position="left" :unmount-on-close="false" :popup-translate="[-10, 0]">
      <IconQuestion class="help-icon absolute right-5 top-5" />
      <template #content>
        <div class="hover-tip">
          this is help text
        </div>
      </template>
    </FogTrigger>
    <FogForm :model="gitlabceeeInfo" :style="{ width: '550px' }" :label-col-props="{ span: 8, offset: 0 }"
      :wrapper-col-props="{ span: 14, offset: 0 }" size="mini">
      <FogFormItem field="host" :label="$t('dialog.add_service_account.gitlabceee.host_label_text')">
        <FogInput size="mini" v-model="gitlabceeeInfo.host" />
      </FogFormItem>
      <FogFormItem field="name" :label="$t('dialog.add_service_account.gitlabceee.name_label_text')">
        <FogInput size="mini" v-model="gitlabceeeInfo.name" />
      </FogFormItem>
      <FogFormItem field="pat" :label="$t('dialog.add_service_account.gitlabceee.pat_label_text')">
        <FogInput size="mini" v-model="gitlabceeeInfo.pat" type="password" />
      </FogFormItem>
      <FogFormItem field="pt" label="Private token" v-if="false">
        <FogInput size="mini" v-model="gitlabceeeInfo.pt" type="password" />
      </FogFormItem>
    </FogForm>
  </div>
</template>

<script setup lang="ts">
import { FogUserInfo } from "../../types/IUserInfo";
import { computed, reactive } from "vue";
import gitlabCEEEAxiosInstanceFactory, { IGitlabUserInfo } from "../../message/GitLab"

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
  color: var(--color-text-2);
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>