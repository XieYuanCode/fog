<template>
  <div class="welcome-view select-none h-full w-full">
    <div class="move-window-content h-6 w-full absolute top-0 left-0 "></div>
    <div class="welcome-view-main-container w-full h-full flex">
      <div class="welcome-view-left-container w-4/6 h-full p-8 relative">
        <Transition name="fade">
          <div v-if="currentStep === 1" key="description" class="welcome-description absolute ">
            <FogTypographyTitle>Welcome Page</FogTypographyTitle>
          </div>
          <div v-else-if="currentStep === 2" key="General" class="welcome-General absolute">
            <FogTypographyTitle>{{ $t('welcome.general.general_setting_title') }}</FogTypographyTitle>
            <FogForm :model="preferenceStore" :style="{ width: '600px', marginTop: '20px' }"
              :label-col-props="{ span: 8, offset: 0 }" :wrapper-col-props="{ span: 14, offset: 0 }">
              <FogFormItem field="default folder" :label="$t('welcome.general.default_cloned_directory_label')">
                <FogButton type="primary" size="mini" @click="selectDefaultClonedDirectory">{{
                    preferenceStore.defaultCloneUrl
                }}</FogButton>
              </FogFormItem>
              <FogFormItem field="theme" :label="$t('welcome.general.color_theme_label')">
                <FogRadioGroup type="button" size="mini" v-model="appearanceStore.theme" @change="themeChanged">
                  <FogRadio value="Light">{{ $t('welcome.general.color_theme_light') }}</FogRadio>
                  <FogRadio value="Dark">{{ $t('welcome.general.color_theme_dark') }}</FogRadio>
                  <FogRadio value="System">{{ $t('welcome.general.color_theme_system') }}</FogRadio>
                </FogRadioGroup>
              </FogFormItem>
              <FogFormItem field="language" :label="$t('welcome.general.language_label')">
                <FogRadioGroup type="button" size="mini" v-model="preferenceStore.language" @change="languageChanged">
                  <FogRadio value="en">English</FogRadio>
                  <FogRadio value="ch">简体中文</FogRadio>
                </FogRadioGroup>
              </FogFormItem>
            </FogForm>
          </div>
          <div v-else-if="currentStep === 3" key="Git" class="welcome-Git absolute">
            <FogAlert type="error" v-if="!gitGlobalInformation.isInstalled" banner style="border-radius: 20px;">
              <template #action>
                <FogButton size="mini" shape="round" type="primary" @click="downloadGit">{{
                    $t("welcome.git.download_button_text")
                }}
                </FogButton>
              </template>
              {{ $t("welcome.git.git_not_installed_tip") }}
            </FogAlert>
            <FogTypographyTitle>{{ $t('welcome.git.git_setting_title') }}</FogTypographyTitle>
            <FogForm :model="preferenceStore" :style="{ width: '600px', marginTop: '20px' }"
              :label-col-props="{ span: 8, offset: 0 }" :wrapper-col-props="{ span: 14, offset: 0 }">
              <FogFormItem field="global username" :label="$t('welcome.git.global_name_label')">
                <FogInput size="mini" :disabled="!gitGlobalInformation.isInstalled"
                  :loading="isLoadingGitGlobalUsername" v-model="gitGlobalInformation.name" @change="onNameChanged" />
              </FogFormItem>
              <FogFormItem field="global email address" :label="$t('welcome.git.global_email_label')">
                <FogInput size="mini" :disabled="!gitGlobalInformation.isInstalled" :loading="isLoadingGitEmailAddress"
                  v-model="gitGlobalInformation.emailAddress" @change="onEmailChanged" />
              </FogFormItem>
            </FogForm>
          </div>
          <div v-else-if="currentStep === 4" key="Services" class="welcome-Services absolute">
            <FogTypographyTitle>{{ $t('welcome.service_account.service_account_title') }}</FogTypographyTitle>
            <div class="add-service-account-card-view flex flex-wrap justify-around items-center w-full h-full">
              <AddServiceAccountCard v-for="card in availableServiceAccountType" :info="card"
                @click="addServiceAccount">
              </AddServiceAccountCard>
            </div>
          </div>
        </Transition>
        <Transition name="fade">
          <span class="git-version absolute bottom-5 right-5" v-if="currentStep === 3">{{ gitGlobalInformation.version
          }}</span>
        </Transition>
      </div>
      <div class="welcome-view-right-container w-2/6 h-full">
        <FogCarousel class="welcome-carousel w-full h-full" :default-current="1" animation-name="fade"
          show-arrow="never" :current="currentStep">
          <FogCarouselItem v-for="image in carouselImages">
            <img :src="image" class="welcome-carousel-image w-full h-full object-cover" />
          </FogCarouselItem>
        </FogCarousel>
      </div>
    </div>
    <FogButton class="welcome-next-button absolute right-20 bottom-5 z-50" shape="round" type="primary"
      v-show="currentStep > 1" @click="prevStep" size="mini">
      Prev
    </FogButton>
    <FogButton class="welcome-next-button absolute right-5 bottom-5 z-50" shape="round" type="primary" @click="nextStep"
      size="mini">
      Next
    </FogButton>
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

const isLoadingGitGlobalUsername = ref(true)
const isLoadingGitEmailAddress = ref(true)

const gitGlobalInformation = reactive({
  version: "",
  name: "",
  emailAddress: "",
  isInstalled: true
})

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

const downloadGit = () => {
  common_bridge.openExternal("https://git-scm.com/downloads")
}

const appearanceStore = useAppearanceStore()
const preferenceStore = usePreferenceStore()
const currentStep = ref(4)

const carouselImages: string[] = [welcome_carousel_1, welcome_carousel_2, welcome_carousel_3, welcome_carousel_4]

const themeChanged = (theme: ThemeType) => appearanceStore.changeTheme(theme)
const languageChanged = (language: 'en' | 'ch') => preferenceStore.setLanguage(language)

const selectDefaultClonedDirectory = () => {
  const selected = common_bridge.showOpenDialogSync({
    title: '123',
    properties: ["openDirectory", "createDirectory"]
  }) as string[] | undefined

  selected && preferenceStore.setDefaultCloneUrl(selected[0])
}

const onNameChanged = () => { git_bridge.setGlobalUsername(gitGlobalInformation.name) }

const onEmailChanged = () => { git_bridge.setGlobalEmailAddress(gitGlobalInformation.emailAddress) }

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++
  } else {
    window_bridge.goToHome()
  }
}

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--
}
</script>


<style scoped>
.welcome-view {
  background-color: var(--color-bg-2);
}

.welcome-view-right-container {
  box-shadow: 0px 0px 10px rgb(var(--primary-6));
}

body[arco-theme='dark'] .welcome-view-right-container {
  box-shadow: 0px 0px 10px rgb(var(--primary-1));
}

.welcome-view-left-container {
  box-shadow: inset 0px 0px 10px var(--color-bg-9);
}

.welcome-next-button {
  box-shadow: 0px 0px 5px var(--color-border-5);
}

.welcome-carousel-image {
  -webkit-user-drag: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease-out;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.git-version {
  color: var(--color-text-2);
}

.welcome-Services {
  width: 600px;
}
</style>
