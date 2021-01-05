import Cookie from 'cookie-universal'
import { Locale } from 'vant'
import enUS from 'vant/lib/locale/lang/en-US'
import zhCN from 'vant/lib/locale/lang/zh-CN'
import { globalConfig } from '~/config'

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

export const state = () => ({
  errorMsg: '',
  id: '',
  locale: cookies.get('locale') || globalConfig.locale,
  theme: cookies.get('theme') || globalConfig.theme,
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
    const lang = payload?.lang || globalConfig.locale
    this.$cookies.set('i18n', lang)
    this.$i18n.locale = lang
    Locale.use(langEnum[lang].lang, langEnum[lang].locale)
    state.locale = lang
  },
  setTheme(state, payload) {
    const theme = payload?.theme || globalConfig.theme
    this.$cookies.set('theme', theme)
    this.$colorMode.value = theme
    state.theme = theme
  },
}
export const actions = {
  getNewsLike({ commit, state }) {
    return this.$axios
      .$get('/news/like-list', { params: { news_id: 0 } })
      .then((res) => {
        const newsLike = res.data.list || []
        commit('setState', { newsLike })
      })
  },
}
