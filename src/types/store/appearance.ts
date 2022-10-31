import { ThemeType } from "../theme";

export interface IAppearanceStoreState {
  theme: ThemeType
}
export interface IAppearanceStoreGetter { }
export interface IAppearanceStoreAction {
  changeTheme: (theme: ThemeType) => void
}