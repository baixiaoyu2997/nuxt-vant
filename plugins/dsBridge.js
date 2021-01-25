export default function ({ store }, inject) {
  if (process.client) {
    const dsBridge = require('dsbridge') // 不要使用import导入，提示window undefined

    const setTitleText = (text = document?.title) => {
      if (process.client) {
        dsBridge.call('setTitleText', text)
      }
    }
    inject('dsBridge', { setTitleText })
  }
}
