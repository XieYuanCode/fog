export declare interface IPreferenceStoreState {
  defaultCloneUrl: string
  language: 'en' | 'ch'
}
export declare interface IPreferenceStoreGetter { }
export declare interface IPreferenceStoreAction {
  setDefaultCloneUrl: (url: string) => void
  setLanguage: (language: 'en' | 'ch') => void
}