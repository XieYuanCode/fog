import { ThemeType } from "../theme";

export declare interface IAppearanceStoreState {
  theme: ThemeType
}
export declare interface IAppearanceStoreGetter { }
export declare interface IAppearanceStoreAction {
  changeTheme: (theme: ThemeType) => void
}