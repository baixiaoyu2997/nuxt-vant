import Cookies from 'js-cookie'
import { globalConfig } from '../../config'

export function getCookie(name) {
  return Cookies.get(name)
}
export function setCookie(name, value, opts) {
  Cookies.set(name, value, {
    ...opts,
    expires: 7,
  })
}

export const getLang = () => getCookie('lang') || globalConfig.locale
export const saveLang = (l) => {
  setCookie('lang', l)
}
export const getTheme = () => getCookie('theme') || globalConfig.locale
export const saveTheme = (l) => {
  setCookie('theme', l)
}
