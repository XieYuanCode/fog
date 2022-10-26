export declare interface IPreferenceStoreState {
  /**
   * 默认克隆位置
   */
  defaultCloneUrl: string
  /**
   * 语言
   */
  language: 'en' | 'ch'
}
export declare interface IPreferenceStoreGetter { }
export declare interface IPreferenceStoreAction {
  setDefaultCloneUrl: (url: string) => void
  setLanguage: (language: 'en' | 'ch') => void
}