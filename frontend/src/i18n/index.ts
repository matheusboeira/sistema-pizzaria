import i18n, { TFunction } from 'i18next'
import { initReactI18next } from 'react-i18next'

import br from './locales/br.json'
import en from './locales/en.json'

i18n.use(initReactI18next).init({
  resources: {
    en: en,
    br: br
  },
  lng: localStorage.getItem('@language') || 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
