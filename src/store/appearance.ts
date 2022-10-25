import { defineStore } from "pinia";
import type { IAppearanceStoreState, IAppearanceStoreAction, IAppearanceStoreGetter } from "../types/store/appearance";
import type { _GettersTree } from "pinia";
import electronStore from "../utils/electronStore";
import { ThemeType } from "../types/theme";
import { switchTheme } from "../utils/theme";

export const useAppearanceStore = defineStore<"appearance", IAppearanceStoreState, _GettersTree<IAppearanceStoreGetter>, IAppearanceStoreAction>('appearance', {
  state: () => {
    return {
      theme: electronStore.get("appearance.theme", ThemeType.System)
    }
  },
  actions: {
    changeTheme(theme: ThemeType) {
      console.log("changeTheme", theme);
      this.theme = theme
      switchTheme(theme)
      electronStore.set("appearance.theme", theme)
    }
  }
})