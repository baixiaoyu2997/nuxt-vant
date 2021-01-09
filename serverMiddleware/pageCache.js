import { globalConfig } from '../configs'
const LRU = require('lru-cache')

// 需要进行页面级别缓存的路由
const CACHE_URL = '/p' // TODO : 修改路由

const cache = new LRU(globalConfig.cache)

export default function (req, res, next) {
  const url = req._parsedOriginalUrl
  const pathname = url.pathname ? url.pathname : ''
  if (pathname.startsWith(CACHE_URL)) {
    const existsHtml = cache.get(pathname)
    if (existsHtml) {
      // 不要忘了设置 Content-Type 不然浏览器有时候可能不会渲染而是触发下载文件
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      return res.end(existsHtml.html, 'utf-8')
    } else {
      res.original_end = res.end
      res.end = function (data) {
        if (res.statusCode === 200) {
          cache.set(pathname, { html: data })
        }
        res.original_end(data, 'utf-8')
      }
    }
  }
  next()
}
