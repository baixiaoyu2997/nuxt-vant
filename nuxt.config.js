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
    '~/plugins/cookie',
  ],

  components: [
    {
      path: '~/components/',
      prefix: 'ny',
    },
  ],
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/color-mode',
    // 'nuxt-purgecss',
  ],
  // purgeCSS: {
  //   whitelist: ['nuxt-link'],
  //   whitelistPatterns: [/van-.+$/],
  //   whitelistPatternsChildren: [/van-.+$/],
  // },
  // 注册全局变量、mixins等
  styleResources: {
    less: './assets/styles/vars.less',
  },
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
    '/news/': {
      target: 'https://devapi.niuyan.com/',
    },
    '/static/': {
      target: 'https://storage-dev.niuyan.com/',
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
      browserBaseURL: globalConfig.host.browser.API,
    },
  },

  privateRuntimeConfig: {
    ...globalConfig,
    axios: {
      baseURL: isProd ? globalConfig.host.server.API : 'http://localhost:9001/', // process.env.BASE_URL,
    },
  },
  serverMiddleware: ['~/serverMiddleware/pageCache'],
  router: {
    middleware: 'route', // 暂时无用
  },
}
