import path from 'path'
import * as globalConfig from './config.json'
import messages from './assets/locale'

const isProd = process.env.NODE_ENV === 'production'

export default {
  head: {
    title: 'niuyan-h5',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,viewport-fit=cover',
      },
      { name: 'apple-mobile-web-app-capable', content: 'yes' }, // 启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏
      { name: 'msapplication-tap-highlight', content: 'no' }, // windows phone 点击无高光
      { name: 'format-detection', content: 'telphone=no, email=no' }, // 忽略页面中的数字识别为电话，忽略email识别
      { name: 'HandheldFriendly', content: 'true' }, // 针对手持设备优化
      { name: 'referrer', content: 'no-referrer' }, // 图片引用403
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  server: {
    port: 9002,
    host: '0.0.0.0',
  },
  css: [
    '~/assets/styles/theme.css',
    '~/assets/styles/index.less',
    '~/assets/styles/page.less',
    '~/assets/styles/common.less',
  ],

  plugins: [
    '~/plugins/config',
    { src: '~/plugins/vant-ui', ssr: true },
    '~/plugins/lazyload',
    '~/plugins/axios',
    '~/plugins/store',
  ],

  components: [
    {
      path: '~/components/',
      prefix: 'ny',
    },
  ],
  buildModules: [
    '@nuxtjs/color-mode',
    // 'nuxt-purgecss',
  ],
  // purgeCSS: {
  //   whitelist: ['nuxt-link'],
  //   whitelistPatterns: [/van-.+$/],
  //   whitelistPatternsChildren: [/van-.+$/],
  // },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'nuxt-winston-log',
    'nuxt-i18n',
    'cookie-universal-nuxt',
  ],
  axios: {
    // debug: !isProd,
    retry: { retries: 3 },
    proxy: !isProd,
    credentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 5000,
  },
  proxy: {
    '/h5/': {
      target: 'http://192.168.2.121:8080',
    },
  },
  loading: false,
  i18n: {
    locales: Object.keys(messages) || [],
    defaultLocale: globalConfig.locale,
    vueI18n: {
      fallbackLocale: globalConfig.locale,
      messages,
    },
  },
  build: {
    terser: isProd,
    extractCSS: isProd, // 提取css
    postcss: {
      preset: {
        autoprefixer: {},
      },
      plugins: {
        ...(globalConfig.pxToVm
          ? {
              'postcss-px-to-viewport': {
                viewportWidth: 375,
                // selectorBlackList: [/van-.+$/],
                // exclude: [/node_modules/],
              },
            }
          : {}),
      },
    },
    transpile: [/vant.*?less/],
    babel: {
      cacheDirectory: true, // 缓存babel
      compact: true,
      plugins: [
        [
          'import',
          {
            libraryName: 'vant',
            style: (name) => {
              return `${name}/style/less.js`
            },
          },
          'vant',
        ],
      ],
    },
    loaders: {
      // VantUI 定制主题配置
      less: {
        lessOptions: {
          javascriptEnabled: true, // 开启 Less 行内 JavaScript 支持
          modifyVars: {
            hack: `true; @import "${path.join(
              __dirname,
              './assets/styles/vant.less'
            )}";`,
          },
        },
      },
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
  },
  publicRuntimeConfig: {
    ...globalConfig,
    axios: {
      prefix: globalConfig.host.browser.API,
    },
  },

  privateRuntimeConfig: {
    ...globalConfig,
    axios: {
      prefix: isProd ? globalConfig.host.server.API : 'http://localhost:9001/', // process.env.BASE_URL,
    },
  },
  serverMiddleware: ['~/serverMiddleware/pageCache'],
  router: {
    middleware: 'route', // 暂时无用
  },
}
