<template>
  <div class="welcome-view select-none h-full w-full">
    <div class="move-window-content h-6 w-full absolute top-0 left-0 "></div>
    <div class="welcome-view-main-container w-full h-full flex">
      <div class="welcome-view-left-container w-4/6 h-full box-border p-10">
        <Transition :name="fadeDirection">
          <div v-if="currentStep === 0" key="description" class="welcome-description welcome-item-panel absolute">
            <span class="extra-large-text">Welcome Page</span>
          </div>
          <div v-else-if="currentStep === 1" key="General" class="welcome-general welcome-item-panel absolute">
            <span class="extra-large-text">{{ $t('welcome.general.general_setting_title') }}</span>
            <ElForm :model="preferenceStore" size="small" class="welcome-form mt-10" label-width="180"
              label-position="right">
              <ElFormItem :label="$t('welcome.general.default_cloned_directory_label')">
                <ElButton type="primary" size="small" @click="selectDefaultClonedDirectory">
                  {{ preferenceStore.defaultCloneUrl }}</ElButton>
              </ElFormItem>
              <ElFormItem :label="$t('welcome.general.color_theme_label')">
                <ElRadioGroup size="small" v-model="appearanceStore.theme" @change="themeChanged">
                  <ElRadioButton label="Light">{{ $t('welcome.general.color_theme_light') }}</ElRadioButton>
                  <ElRadioButton label="Dark">{{ $t('welcome.general.color_theme_dark') }}</ElRadioButton>
                  <ElRadioButton label="System">{{ $t('welcome.general.color_theme_system') }}</ElRadioButton>
                </ElRadioGroup>
                <ElLink class="system-theme-link ml-5 extra-small-text opacity-70" @click="openSystemColorTheme">System Color Theme</ElLink>
              </ElFormItem>
              <ElFormItem :label="$t('welcome.general.language_label')">
                <ElRadioGroup size="small" v-model="preferenceStore.language" @change="languageChanged">
                  <ElRadioButton label="en">English</ElRadioButton>
                  <ElRadioButton label="ch" disabled>简体中文</ElRadioButton>
                </ElRadioGroup>
              </ElFormItem>
            </ElForm>
          </div>
          <div v-else-if="currentStep === 2" key="Git" class="welcome-git welcome-item-panel absolute">
            <ElAlert type="error" v-if="!gitGlobalInformation.isInstalled" :closable="false"
              :style="{ margin: '10px 0px' }">
              {{ $t("welcome.git.git_not_installed_tip") }}
            </ElAlert>
            <span class="extra-large-text">{{ $t('welcome.git.git_setting_title') }}</span>
            <ElForm :model="preferenceStore" size="small" class="welcome-form mt-10" label-width="180"
              label-position="right">
              <ElFormItem :label="$t('welcome.git.global_name_label')">
                <ElInput size="small" :disabled="!gitGlobalInformation.isInstalled"
                  :loading="isLoadingGitGlobalUsername" v-model="gitGlobalInformation.name" @change="onNameChanged"
                  :prefix-icon="User" />
              </ElFormItem>
              <ElFormItem :label="$t('welcome.git.global_email_label')">
                <ElInput size="small" :disabled="!gitGlobalInformation.isInstalled" :loading="isLoadingGitEmailAddress"
                  v-model="gitGlobalInformation.emailAddress" @change="onEmailChanged" :prefix-icon="Message" />
              </ElFormItem>
            </ElForm>
          </div>
          <div v-else-if="currentStep === 3" key="Services" class="welcome-services welcome-item-panel absolute">
            <span class="extra-large-text">{{ $t('welcome.service_account.service_account_title') }}</span>
            <div class="add-service-account-card-view mt-10 flex flex-wrap justify-around items-center w-full h-full">
              <AddServiceAccountCard v-for="card in availableServiceAccountType" :info="card"
                @click="addServiceAccount">
              </AddServiceAccountCard>
              <ElDivider></ElDivider>
              <ElCard v-for="serviceAccount in serviceAccounts.accounts">{{serviceAccount.userInfo.name}}</ElCard>
            </div>
          </div>
        </Transition>
        <Transition :name="fadeDirection">
          <span class="light-color-text extra-small-text absolute bottom-5" :style="{ right: '366px' }"
            v-if="currentStep === 2 && gitGlobalInformation.isInstalled">{{
                gitGlobalInformation.version
            }}</span>
        </Transition>
        <Transition :name="fadeDirection">
          <span class="light-color-text extra-small-text absolute bottom-5" :style="{ right: '366px' }"
            v-if="currentStep === 1">
            <ElIcon class="mr-1" color="#E6A23C">
              <Warning />
            </ElIcon>
            Language modification are not supported in the beta version yet.
          </span>
        </Transition>
      </div>
      <div class="welcome-view-right-container w-2/6 h-full" :style="{
        boxShadow: `var(--el-box-shadow-dark)`,
      }">
        <ElCarousel class="welcome-carousel w-full h-full" :initial-index="0" :autoplay="false" arrow="never"
          indicator-position="none" ref="carouselElement" :loop="false">
          <ElCarouselItem v-for="image in carouselImages" class="welcome-carousel-item h-full">
            <img :src="image" class="welcome-carousel-image w-full h-full object-cover" />
          </ElCarouselItem>
        </ElCarousel>
      </div>
    </div>
    <ElButton class="welcome-next-button absolute right-5 bottom-5 z-50 mr-20" round size="small"
      v-show="currentStep > 0" @click="prevStep" :icon="ArrowLeft">
      Prev
    </ElButton>
    <ElButton class="welcome-next-button absolute right-5 bottom-5 z-50" round size="small" type="primary"
      @click="nextStep" :disabled="currentStep === 2 && !gitGlobalInformation.isInstalled">
      Next
      <ElIcon class="el-icon--right">
        <ArrowRight />
      </ElIcon>
    </ElButton>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from "vue"
import welcome_carousel_1 from "../../assets/welcome_carousel_1.jpg"
import welcome_carousel_2 from "../../assets/welcome_carousel_2.jpg"
import welcome_carousel_3 from "../../assets/welcome_carousel_3.jpg"
import welcome_carousel_4 from "../../assets/welcome_carousel_4.jpg"
import { useAppearanceStore } from "../../store/appearance"
import { usePreferenceStore } from "../../store/preference"
import { ServiceAccountType } from "../../types/ServiceAccountType"
import { ThemeType } from "../../types/theme"
import { getAvailableServiceAccountTypes } from "../../utils/serviceAccount"
import AddServiceAccountCard from "../common/serviceAccount/AddServiceAccountCard.vue"
import { ArrowLeft, ArrowRight, User, Message, Warning } from '@element-plus/icons-vue'
import { useServiceAccounts } from "../../store/serviceAccounts"

const serviceAccounts = useServiceAccounts()
const isLoadingGitGlobalUsername = ref(true)
const isLoadingGitEmailAddress = ref(true)

const gitGlobalInformation = reactive({
  version: "",
  name: "",
  emailAddress: "",
  isInstalled: true
})

const carouselElement = ref()

const availableServiceAccountType = getAvailableServiceAccountTypes();

onMounted(() => {
  git_bridge.getGitVersion().then(({ result }: any) => {
    gitGlobalInformation.isInstalled = result.installed;
    gitGlobalInformation.version = `git version ${result.major}.${result.minor}.${result.patch} ${result.agent ? `(${result.agent})` : ""}`
  })
  git_bridge.getGlobalUsername().then(({ result }: any) => {
    isLoadingGitGlobalUsername.value = false;
    gitGlobalInformation.name = result;
  })
  git_bridge.getGlobalEmailAddress().then(({ result }: any) => {
    isLoadingGitEmailAddress.value = false;
    gitGlobalInformation.emailAddress = result;
  })
})

const addServiceAccount = async (type: ServiceAccountType) => {
  console.log('addServiceAccount', type);
  window_bridge.openAddServiceAccountWindow(type, "welcome");
}


const appearanceStore = useAppearanceStore()
const preferenceStore = usePreferenceStore()
const currentStep = ref(0)

const carouselImages: string[] = [welcome_carousel_1, welcome_carousel_2, welcome_carousel_3, welcome_carousel_4]

const themeChanged = (theme: ThemeType) => appearanceStore.changeTheme(theme)
const languageChanged = (language: 'en' | 'ch') => preferenceStore.setLanguage(language)

const selectDefaultClonedDirectory = () => {
  const selected = common_bridge.showOpenDialogSync({
    title: 'Select Default Cloned Directory',
    properties: ["openDirectory", "createDirectory"]
  }) as string[] | undefined

  selected && preferenceStore.setDefaultCloneUrl(selected[0])
}

const openSystemColorTheme = () => common_bridge.openExternal("x-apple.systempreferences://")

const onNameChanged = () => { git_bridge.setGlobalUsername(gitGlobalInformation.name) }

const onEmailChanged = () => { git_bridge.setGlobalEmailAddress(gitGlobalInformation.emailAddress) }

const nextStep = () => {
  fadeDirection.value = "fade-forward";
  if (currentStep.value < 3) {
    currentStep.value++
  } else {
    window_bridge.goToHome()
  }

  carouselElement.value.next()
}

const prevStep = () => {
  fadeDirection.value = "fade-backward";
  if (currentStep.value > 0) currentStep.value--

  carouselElement.value.prev()
}

const fadeDirection = ref("fade-forward")
</script>


<style scoped>
.welcome-view {
  background-color: var(--el-bg-color-2);
}
.welcome-carousel-image {
  -webkit-user-drag: none;
}

.welcome-item-panel {
  width: 575px;
}
</style>
