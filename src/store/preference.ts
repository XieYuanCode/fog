import { defineStore } from "pinia";
import type { IPreferenceStoreAction, IPreferenceStoreState, IPreferenceStoreGetter } from "../types/store/preference";
import type { _GettersTree } from "pinia";
import electronStore from "../utils/electronStore";
import i18n from "../locale"

export const usePreferenceStore = defineStore<"preference", IPreferenceStoreState, _GettersTree<IPreferenceStoreGetter>, IPreferenceStoreAction>("preference", {
  state: () => {
    return {
      defaultCloneUrl: electronStore.get("preference.defaultCloneUrl", common_bridge.getPath('home')),
      language: electronStore.get("preference.language", 'en'),
      openOnLogin: electronStore.get("preference.onOnLogin", false)
    }
  },
  actions: {
    setDefaultCloneUrl(url: string) {
      this.defaultCloneUrl = url
      electronStore.set("preference.defaultCloneUrl", url)
    },
    setLanguage(language: 'en' | 'ch') {
      this.language = language
      electronStore.set('preference.language', language)
      i18n.global.locale = language;
    },
    setOpenOnLogin(openOnLogin: boolean) {
      this.openOnLogin = openOnLogin
      electronStore.set("preference.onOnLogin", openOnLogin)
      common_bridge.setOpenOnLogin(openOnLogin)
    },
  }
})