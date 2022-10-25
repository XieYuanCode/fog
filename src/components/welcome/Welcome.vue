<template>
  <div class="welcome-view select-none h-full w-full">
    <div class="move-window-content h-6 w-full absolute top-0 left-0 "></div>
    <div class="welcome-view-main-container w-full h-full flex">
      <div class="welcome-view-left-container w-4/6 h-full pt-8">
        <Transition name="fade">
          <div v-if="currentStep === 1" key="description" class="welcome-description absolute ">
            Welcome
          </div>
          <div v-else-if="currentStep === 2" key="General" class="welcome-General absolute">
            <FogForm :style="{ width: '600px' }" :label-col-props="{ span: 8, offset: 0 }"
              :wrapper-col-props="{ span: 16, offset: 0 }">
              <FogFormItem field="default folder" :label="$t('welcome.general.default_cloned_directory_label')">
                <FogButton type="primary" size="mini">{{ preferenceStore.defaultCloneUrl }}</FogButton>
              </FogFormItem>
              <FogFormItem field="theme" label="color theme" v-if="false">
                <FogRadioGroup type="button" size="mini" v-model="appearanceStore.theme" @change="themeChanged">
                  <FogRadio value="Light" disabled>Light</FogRadio>
                  <FogRadio value="Dark" disabled>Dark</FogRadio>
                  <FogRadio value="System">System</FogRadio>
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
          <div v-else-if="currentStep === 3" key="Git" class="welcome-Git absolute">Git</div>
          <div v-else-if="currentStep === 4" key="Services" class="welcome-Services absolute">Services
          </div>
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
    <FogButton class="welcome-next-button absolute right-5 bottom-5 z-50" shape="round" type="primary" @click="nextStep"
      size="mini">
      Next
    </FogButton>
    <FogButton class="welcome-next-button absolute right-20 bottom-5 z-50" shape="round" type="primary"
      v-show="currentStep > 1" @click="prevStep" size="mini">
      Prev
    </FogButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import welcome_carousel_1 from "../../assets/welcome_carousel_1.jpg"
import welcome_carousel_2 from "../../assets/welcome_carousel_2.jpg"
import welcome_carousel_3 from "../../assets/welcome_carousel_3.jpg"
import welcome_carousel_4 from "../../assets/welcome_carousel_4.jpg"
import { useAppearanceStore } from "../../store/appearance"
import { usePreferenceStore } from "../../store/preference"
import { ThemeType } from "../../types/theme"

const appearanceStore = useAppearanceStore()
const preferenceStore = usePreferenceStore()

const currentStep = ref(2)

const carouselImages: string[] = [welcome_carousel_1, welcome_carousel_2, welcome_carousel_3, welcome_carousel_4]

const themeChanged = (theme: ThemeType) => appearanceStore.changeTheme(theme)
const languageChanged = (language: 'en' | 'ch') => preferenceStore.setLanguage(language)

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


<style>
.welcome-view {
  background-color: rgba(var(--color-bg-2));
  color: var(--color-text-1);
}

.move-window-content {
  -webkit-app-region: drag;
}

.welcome-view-right-container {
  background-color: rgba(var(--color-bg-2), 1);
  box-shadow: 0px 0px 10px var(--color-border-4);
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
</style>
