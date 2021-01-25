# nuxt-vant

## 特性

1. 国际化(nuxt-i18n)
1. 主题动态切换，vant v4之前不能动态设置主题，只能通过手动设定(@nuxtjs/color-mode)
1. axios(@nuxtjs/axios)
1. 页面缓存(`/serverMiddleware/pageCache`)
1. proxy(@nuxtjs/proxy)
1. vant 及按需加载，vant 国际化
1. 懒加载，由 vant 提供
1. 服务端日志(nuxt-winston-log)
1. px-to-viewport
1. 动态配置文件(`/config.json`)
1. vuex-loading,支持通过vuex中的action来控制接口loading状态(`/utils/vuex-loading`)

## config
```js
// config/index.js
export const globalConfig = {
  _locale: 'zh', // 默认语言
  _host: {}, // api设置
  _cache: {  // page缓存设置
    max: 500,
    maxAge: 1000 * 20,
  },
  _theme: 'light', // 主题设置
  _pxToVm: false, // 是否开启px-to-viewport
}

```
