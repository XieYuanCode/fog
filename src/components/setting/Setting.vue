<template>
  <div class="setting-window w-full h-full p-5 box-border">
    <div class="move-window-content h-6 w-full absolute top-0 left-0"></div>
    <ElTabs v-model="activeSettingTab" class="setting-window-tabs w-full h-full">
      <ElTabPane label="General" name="General" class="setting-window-tab-pane w-full h-full">
        <template #label>
          <div class="tab-label flex justify-between items-center">
            <ElIcon class="tab-label-icon mr-1">
              <Setting />
            </ElIcon>
            <span>General</span>
          </div>
        </template>
        <div class="setting-panel-content">
          <ElForm :model="preferenceStore" size="small" class="welcome-form mt-10" label-width="150"
            label-position="right">
            
            <!-- 登陆时打开 -->
            <ElFormItem label="Open On Login">
              <ElRadioGroup size="small" v-model="preferenceStore.openOnLogin" @change="openOnLoginChanged">
                <ElRadioButton :label="true">Yes</ElRadioButton>
                <ElRadioButton :label="false">No</ElRadioButton>
              </ElRadioGroup>
            </ElFormItem>
            <!-- 默认克隆位置 -->
            <ElFormItem :label="$t('welcome.general.default_cloned_directory_label')">
              <ElButton type="primary" size="small" @click="selectDefaultClonedDirectory">
                {{ preferenceStore.defaultCloneUrl }}</ElButton>
            </ElFormItem>
            <!-- 语言 -->
            <ElFormItem :label="$t('welcome.general.language_label')">
              <ElRadioGroup size="small" v-model="preferenceStore.language" @change="languageChanged">
                <ElRadioButton label="en">English</ElRadioButton>
                <ElRadioButton label="ch" disabled>简体中文</ElRadioButton>
              </ElRadioGroup>
            </ElFormItem>

          </ElForm>
          <ElDivider>General | {{ preferenceStore.language }}</ElDivider>
        </div>
      </ElTabPane>
      <ElTabPane label="Git" name="Git" class="setting-window-tab-pane w-full h-full">
        <template #label>
          <div class="tab-label flex justify-between items-center">
            <ElIcon class="tab-label-icon mr-1">
              <Setting />
            </ElIcon>
            <span>Git</span>
          </div>
        </template>
      </ElTabPane>
      <ElTabPane label="Theme" name="Theme" class="setting-window-tab-pane w-full h-full">
        <template #label>
          <div class="tab-label flex justify-between items-center">
            <ElIcon class="tab-label-icon mr-1">
              <Brush />
            </ElIcon>
            <span>Theme</span>
          </div>
        </template>
      </ElTabPane>
      <ElTabPane label="Shortcut" name="Shortcut" class="setting-window-tab-pane w-full h-full">
        <template #label>
          <div class="tab-label flex justify-between items-center">
            <ElIcon class="tab-label-icon mr-1">
              <Mouse />
            </ElIcon>
            <span>Shortcut</span>
          </div>
        </template>
      </ElTabPane>
      <ElTabPane label="Integration" name="Integration" class="setting-window-tab-pane w-full h-full">
        <template #label>
          <div class="tab-label flex justify-between items-center">
            <ElIcon class="tab-label-icon mr-1">
              <Connection />
            </ElIcon>
            <span>Integration</span>
          </div>
        </template>
      </ElTabPane>
      <ElTabPane label="Update" name="Update" class="setting-window-tab-pane w-full h-full">
        <template #label>
          <div class="tab-label flex justify-between items-center">
            <ElIcon class="tab-label-icon mr-1">
              <Download />
            </ElIcon>
            <span>Update</span>
          </div>
        </template>
      </ElTabPane>
      <ElTabPane label="About" name="About" class="setting-window-tab-pane w-full h-full">
        <template #label>
          <div class="tab-label flex justify-between items-center">
            <ElIcon class="tab-label-icon mr-1">
              <Warning />
            </ElIcon>
            <span>About</span>
          </div>
        </template>
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Setting, Brush, Mouse, Connection, Download, Warning } from "@element-plus/icons-vue";
import { usePreferenceStore } from "../../store/preference";
import { ElTabs, ElTabPane, ElIcon, ElForm, ElFormItem, ElRadioGroup, ElRadioButton, ElButton, ElLink, ElDivider } from "element-plus";

const activeSettingTab = ref("General")
const preferenceStore = usePreferenceStore();

const selectDefaultClonedDirectory = () => {
  const selected = common_bridge.showOpenDialogSync({
    title: 'Select Default Cloned Directory',
    properties: ["openDirectory", "createDirectory"]
  }) as string[] | undefined

  selected && preferenceStore.setDefaultCloneUrl(selected[0])
}

const languageChanged = (language: 'en' | 'ch') => preferenceStore.setLanguage(language)
const openOnLoginChanged = (openOnLogin: boolean) => preferenceStore.setOpenOnLogin(openOnLogin)

</script>

<style>
.setting-window {
  background-color: var(--el-bg-color-1);
}

.setting-window-tabs>.el-tabs__content {
  width: 100%;
  height: 93%;
}

.setting-panel-content {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>