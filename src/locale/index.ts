import { createI18n } from "vue-i18n";
import ch from "./ch"
import en from './en'

const i18n = createI18n({
  locale: 'en',
  messages: {
    en,
    ch
  }
})

export default i18n;