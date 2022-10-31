export interface IPreferenceStoreState {
  /**
   * 默认克隆位置
   */
  defaultCloneUrl: string
  /**
   * 语言
   */
  language: 'en' | 'ch'
}
export interface IPreferenceStoreGetter { }
export interface IPreferenceStoreAction {
  setDefaultCloneUrl: (url: string) => void
  setLanguage: (language: 'en' | 'ch') => void
}