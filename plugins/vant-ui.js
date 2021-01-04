import Vue from 'vue'
import { Locale, Button, RadioGroup, Radio } from 'vant'
import enUS from 'vant/lib/locale/lang/en-US'
import zhCN from 'vant/lib/locale/lang/zh-CN'
import { getLang } from '../assets/utils/cookie'
const langEnum = {
  zh: {
    lang: 'zh-CN',
    locale: zhCN,
  },
  en: {
    lang: 'en-US',
    locale: enUS,
  },
}
Locale.use(langEnum[getLang()].lang, langEnum[getLang()].locale)
Vue.use(Button).use(RadioGroup).use(Radio)
