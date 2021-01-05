export default function ({ store, app }) {
  const { $cookies } = app
  store.commit('setLang', { lang: $cookies.get('lang') }) // i18n init
  store.commit('setTheme', { theme: $cookies.get('theme') }) // $colorMode init
}
