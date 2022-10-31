import type { _GettersTree } from "pinia";
import { defineStore } from "pinia";
import type { IAppearanceStoreAction, IAppearanceStoreGetter, IAppearanceStoreState } from "../types/store/appearance";
import { ThemeType } from "../types/theme";
import electronStore from "../utils/electronStore";
import { switchTheme } from "../utils/theme";

export const useAppearanceStore = defineStore<"appearance", IAppearanceStoreState, _GettersTree<IAppearanceStoreGetter>, IAppearanceStoreAction>('appearance', {
  state: () => {
    return {
      theme: electronStore.get("appearance.theme", ThemeType.System)
    }
  },
  actions: {
    changeTheme(theme: ThemeType) {
      this.theme = theme
      switchTheme(theme)
      electronStore.set("appearance.theme", theme)
    }
  }
})