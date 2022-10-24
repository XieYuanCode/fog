import { defineStore } from "pinia";
import type { IAppearanceStoreState, IAppearanceStoreAction, IAppearanceStoreGetter } from "../types/store/appearance";
import type { _GettersTree } from "pinia";
import electronStore from "../utils/electronStore";
import { ThemeType } from "../types/theme";

export const useAppearanceStore = defineStore<"appearance", IAppearanceStoreState, _GettersTree<IAppearanceStoreGetter>, IAppearanceStoreAction>('appearance', {
  state: () => {
    return {
      theme: electronStore.get("theme", ThemeType.System)
    }
  },
  actions: {

  }
})