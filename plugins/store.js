export default function ({ store, app, $config }) {
  // const { $cookies } = app
  store.commit('setLang', { lang: $config.locale }) // i18n init
  store.commit('setTheme', { theme: $config.theme }) // $colorMode init,主题设置只有在beforeMount之后才生效
}
