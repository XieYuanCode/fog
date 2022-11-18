<template>
  <div class="git-clone-window w-full h-full p-5 box-border select-none">
    <div class="move-window-content h-6 w-full absolute top-0 left-0 text-center pt-1 extra-small-text">Clone Git
      Repository</div>
    <ElContainer class="git-clone-window-container h-full w-full items-center">
      <ElHeader height="150px" class="git-clone-window-header flex items-center w-4/5 justify-around">
        <img :src="CloneIcon" width="100" class="git-clone-window-header-image mr-10" />
        <span class="git-clone-window-header-text extra-large-text ">Clone Git Repository</span>
      </ElHeader>
      <hr class="hr w-full opacity-40" />
      <ElMain class="w-full py-5 px-0">
        <ElForm :model="cloneOptions" size="small" label-width="auto" label-position="right" :rules="rules">
          <ElFormItem label="Remote Url" prop="remoteURL">
            <ElInput size="small" v-model="cloneOptions.remoteURL" :prefix-icon="Location" />
          </ElFormItem>
          <ElFormItem label="Destination Directory">
            <ElInput size="small" v-model="localAddress" :prefix-icon="Location" />
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
      <ElFooter height="20px" class="flex justify-end w-full flex-row items-end p-0">
        <ElButton size="small" round>Cancel</ElButton>
        <ElButton size="small" type="primary" round>Clone</ElButton>
      </ElFooter>
    </ElContainer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import CloneIcon from "../../assets/clone-icon.png"
import { Lock, User, Location } from '@element-plus/icons-vue'
import { usePreferenceStore } from "../../store/preference"
import type { FormRules } from "element-plus";

const preferenceStore = usePreferenceStore()

const cloneOptions = reactive({
  remoteURL: "",
  bare: false,
  recurseSubmodules: false,
  depth: 0,
  branch: ""
})

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
        console.log(123);
        callback(new Error("Not A Valid Git Clone Remote Url!"))
      }
    },
    trigger: 'change'
  }, {
    required: true, message: 'Remote Url Is Required!'
  }]
})

const localAddress = computed(() => {
  return preferenceStore.defaultCloneUrl + "/" + cloneOptions.remoteURL
})

const isGitUrl = (url: string) => {
  if (!url) return
  return remoteURLRegex.test(url)
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