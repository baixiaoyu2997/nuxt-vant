import { getUserAgent } from '~/utils/'
export default function ({ store, app }) {
  const { $cookies } = app
  store.commit('setLang', { lang: $cookies.get('lang') }) // i18n init
  store.commit('setTheme', { theme: $cookies.get('theme') }) // $colorMode init
  if (process.server) {
    // 服务端
  } else if (process.client) {
    // 客户端
    store.commit('setUA', { UA: getUserAgent() })
  }
}
