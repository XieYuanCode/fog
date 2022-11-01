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
    <FogForm :model="githubInfo" :style="{ width: '550px' }" :label-col-props="{ span: 8, offset: 0 }"
      :wrapper-col-props="{ span: 14, offset: 0 }" size="mini">
      <FogFormItem field="name" :label="$t('dialog.add_service_account.github.name_label_text')">
        <FogInput size="mini" v-model="githubInfo.name" />
      </FogFormItem>
      <FogFormItem field="pat" :label="$t('dialog.add_service_account.github.pat_label_text')">
        <FogInput size="mini" v-model="githubInfo.pat" type="password" />
      </FogFormItem>
    </FogForm>
  </div>
</template>

<script setup lang="ts">
import { FogUserInfo } from "../../types/IUserInfo";
import { computed, reactive } from "vue";
import githubAxiosInstanceFactory, { IGitHubUserInfo } from "../../message/Github"

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
  color: var(--color-text-2);
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>