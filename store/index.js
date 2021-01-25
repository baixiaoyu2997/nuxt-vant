import Cookie from 'cookie-universal'
import { Locale } from 'vant'
import enUS from 'vant/lib/locale/lang/en-US'
import zhCN from 'vant/lib/locale/lang/zh-CN'
import { globalConfig } from '~/configs'
import createLoadingPlugin from '~/utils/vuex-loading'
import * as servers from '~/server'
const cookies = Cookie()

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
export const plugins = [createLoadingPlugin()]
export const state = () => ({
  errorMsg: '',
  id: '',
  locale: cookies.get('locale') || globalConfig._locale,
  theme: cookies.get('theme') || globalConfig._theme,
  UA: '',
})

export const mutations = {
  setState(state, data) {
    if (data.constructor === Object) {
      Object.keys(data).forEach((x) => {
        state[x] = data[x]
      })
    } else {
      throw new Error('setState参数不正确')
    }
  },
  setLang(state, payload) {
    const lang = payload?.lang || globalConfig._locale
    this.$cookies.set('lang', lang)
    this.$i18n.setLocale(lang)

    Locale.use(langEnum[lang].lang, langEnum[lang].locale)
    state.locale = lang
  },
  setTheme(state, payload) {
    const theme = payload?.theme || globalConfig._theme
    this.$cookies.set('theme', theme)
    this.$colorMode.preference = theme
    state.theme = theme
  },
  setUA(state, payload) {
    const { UA } = payload
    state.UA = UA
  },
}
export const actions = {
  getGrayHolding() {
    return servers.getGrayHolding()
  },
}
