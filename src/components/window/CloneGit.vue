<template>
  <div class="git-clone-window w-full h-full p-5 box-border select-none">
    <div class="move-window-content h-6 w-full absolute top-0 left-0 text-center pt-1 extra-small-text">Clone Git
      Repository</div>
    <ElContainer class="git-clone-window-container h-full w-full items-center">
      <ElHeader height="150px" class="git-clone-window-header flex items-center w-4/5 justify-around">
        <img :src="CloneIcon" width="100" class="git-clone-window-header-image mr-10" />
        <span class="git-clone-window-header-text extra-large-text ">Clone Git Repository</span>
      </ElHeader>
      <ElProgress :show-text="false" :percentage="cloneProgress" :stroke-width="1" class="clone-progress w-full">
      </ElProgress>
      <ElMain class="w-full py-5 px-0">
        <ElForm :model="cloneOptions" size="small" label-width="auto" label-position="right" :rules="rules">
          <ElFormItem label="Remote Url" prop="remoteURL">
            <ElInput size="small" v-model="cloneOptions.remoteURL" :prefix-icon="Location" />
          </ElFormItem>
          <ElFormItem label="Destination Directory">
            <ElInput size="small" v-model="cloneOptions.localAddress" :prefix-icon="Location" />
          </ElFormItem>
          <ElFormItem label="Additional Options">
            <ElRow>
              <ElCol :span="12">
                <ElCheckbox v-model="cloneOptions.bare" :disabled="cloneOptions.recurseSubmodules">Bare</ElCheckbox>
              </ElCol>
              <ElCol :span="12">
                <ElCheckbox v-model="cloneOptions.recurseSubmodules" :disabled="cloneOptions.bare">Recurse Submodules
                </ElCheckbox>
              </ElCol>
            </ElRow>
          </ElFormItem>
          <ElFormItem label=" ">
            <ElRow class="w-full">
              <ElCol :span="11">
                <div class="flex justify-start items-center">
                  <ElCheckbox v-model="depth">Depth</ElCheckbox>
                  <ElInputNumber placeholder="depth" ref="depthInput" :disabled="!depth" v-model="cloneOptions.depth"
                    class="ml-2" :min="0" :controls="false"></ElInputNumber>
                </div>
              </ElCol>
              <ElCol :span="11" :offset="2">
                <div class="flex justify-start items-center">
                  <ElCheckbox v-model="branch">Branch</ElCheckbox>
                  <ElInput placeholder="branch" ref="branchInput" :disabled="!branch" v-model="cloneOptions.branch"
                    class="ml-2">
                  </ElInput>
                </div>
              </ElCol>
            </ElRow>
          </ElFormItem>
        </ElForm>
      </ElMain>
      <ElFooter height="20px" class="flex justify-between w-full flex-row items-center p-0">
        <ElButton :icon="QuestionFilled" circle size="small" @click="getCloneHelp"></ElButton>
        <span class="extra-small-text light-color-text w-3/5">{{ cloneProgressText }}</span>
        <div>
          <ElButton size="small" round @click="cancel">{{ !cloneStatus ? `Cancel` : `Run In Back` }}</ElButton>
          <ElButton size="small" type="primary" round @click="clone" :disabled="cloneStatus" :loading="cloneStatus">
            {{ !cloneStatus ? `Clone` : `Cloning...` }}</ElButton>
        </div>
      </ElFooter>
    </ElContainer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import CloneIcon from "../../assets/clone-icon.png"
import { Location, QuestionFilled } from '@element-plus/icons-vue'
import { usePreferenceStore } from "../../store/preference"
import type { FormRules } from "element-plus";
import { uuid } from "../../utils/common";

const preferenceStore = usePreferenceStore()

const cloneOptions = reactive({
  remoteURL: "http://192.168.180.113/ast/awpjssdk.git",
  localAddress: "/Users/xieyuan/Unclutter/FileStorage/Unclutter Files/git/awpjssdk",
  bare: false,
  recurseSubmodules: false,
  depth: 0,
  branch: ""
})

const cloneProgress = ref(0);

const cancel = () => window_bridge.closeGitCloneWindow()

const getCloneHelp = () => common_bridge.openExternal("https://www.git-scm.com/docs/git-clone/en")

const depth = ref(false)
const branch = ref(false)
const depthInput = ref()
const branchInput = ref()
watch(depth, (newValue) => newValue === true && depthInput.value.focus())
watch(branch, (newValue) => newValue === true && branchInput.value.focus())

const remoteURLRegex = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|\#[-\d\w._]+?)$/;

const rules = reactive<FormRules>({
  remoteURL: [{
    validator: (rule: any, value: any, callback: any) => {
      if (!remoteURLRegex.test(value)) {
        callback(new Error("Not A Valid Git Clone Remote Url!"))
      }
    },
    trigger: 'change'
  }]
})

const cloneStatus = ref(false)
const cloneProgressText = ref(``)

watch(() => cloneOptions.remoteURL, (newRemoteURL) => {
  const repoName = newRemoteURL.split("/")[newRemoteURL.split("/").length - 1].replace(".git", "");
  cloneOptions.localAddress = preferenceStore.defaultCloneUrl + "/" + repoName;
})

const isGitUrl = (url: string) => {
  if (!url) return
  return remoteURLRegex.test(url)
}

const clone = async () => {
  cloneStatus.value = true;
  git_bridge.clone(uuid(), cloneOptions.remoteURL, cloneOptions.localAddress, cloneOptions.bare, cloneOptions.recurseSubmodules, cloneOptions.depth, cloneOptions.branch, (stage: string, progress: number) => {
    cloneProgress.value = progress;
    cloneProgressText.value = `Cloning into '${cloneOptions.remoteURL.split("/")[cloneOptions.remoteURL.split("/").length - 1].replace(".git", "")}', Stage: ${stage},  Progress: ${progress}%`
  }).then(cloneResult=> {
    if (cloneResult.type === "failed") {
      // Clone Success
      cloneProgressText.value = `Clone Failed! ${cloneResult.error}`
    } else if (cloneResult.type === "success") {
      cancel()
    }
    cloneStatus.value = false;
  })
}

onMounted(() => {
  common_bridge.readClipboard().then((text: string) => {
    if (!text) return

    if (isGitUrl(text.trim())) {
      cloneOptions.remoteURL = text
    }
  })
})


</script>

<style scoped>

</style>