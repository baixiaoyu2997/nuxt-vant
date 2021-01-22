export const getUserAgent = () => {
  let ua = navigator.userAgent
  try {
    ua = Object.fromEntries(
      ua
        .slice(ua.indexOf(' (platform:'))
        .trim()
        .slice(1, -1)
        .split(';')
        .map((x) => x.split(':').map((x) => x.trim()))
    )
  } catch (error) {
    ua = ''
  }
  return ua
}
export const setNumUnit = (value) => {
  let newValue = value
  let unit = ''
  if (value / 100000000 >= 1) {
    unit = '亿'
    newValue = newValue / 100000000
  } else if (value / 10000 >= 1) {
    unit = '万'
    newValue = newValue / 10000
  }
  return toFixedNum(newValue) + unit
}
export const functionOrValue = (value, keyValue, otherProps) => {
  if (typeof value === 'function') {
    return value(keyValue, otherProps)
  } else {
    return value
  }
}
export const toFixedNum = (value) => {
  return parseFloat(Math.floor(value * 100) / 100)
}

export const deepClone = (obj) => {
  if (obj === null) return null
  const clone = Object.assign({}, obj)
  Object.keys(clone).forEach(
    (key) =>
      (clone[key] =
        typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  )
  if (Array.isArray(obj)) {
    clone.length = obj.length
    return Array.from(clone)
  }
  return clone
}

export function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export function mergeDeep(target, ...sources) {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return mergeDeep(target, ...sources)
}
export const getColorVar = (v) => {
  const style = getComputedStyle(document.body)
  return style.getPropertyValue(v)
}
