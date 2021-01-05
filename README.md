# nuxt-vant

## 特性

1. 国际化(nuxt-i18n)
1. 主题动态切换，vant v4之前不能动态设置主题，只能通过手动设定(@nuxtjs/color-mode)
1. less全局变量(@nuxtjs/style-resources)
1. axios(@nuxtjs/axios)
1. 页面缓存(`/serverMiddleware/pageCache`)
1. proxy(@nuxtjs/proxy)
1. vant 及按需加载，vant 国际化
1. 懒加载，由 vant 提供
1. 服务端日志(nuxt-winston-log)
1. px-to-viewport

## config
```js
// config/index.js
export const globalConfig = {
  locale: 'zh', // 默认语言
  host: {}, // api设置
  cache: {  // page缓存设置
    max: 500,
    maxAge: 1000 * 20,
  },
  theme: 'light', // 主题设置
  pxToVm: false, // 是否开启px-to-viewport
}

```
