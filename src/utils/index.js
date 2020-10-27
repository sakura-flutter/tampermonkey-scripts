/**
 * 解析url上的参数
 * @param {string} href 或 带有参数格式的string；有search则不再hash
 * @return {object}
 */
export function parseURL(href = location.href) {
  if (!href) return {}

  let search
  try {
    // 链接
    const url = new URL(href)
    ;({ search } = url)
    // 主要处理对hash的search
    if (!search && url.hash.includes('?')) {
      search = url.hash.split('?')[1]
    }
  } catch {
    // 非链接,如：a=1&b=2、?a=1、/foo?a=1、/foo#bar?a=1
    if (href.includes('?')) {
      search = href.split('?')[1]
    } else {
      search = href
    }
  }

  const searchParams = new URLSearchParams(search)
  return [...searchParams.entries()].reduce((acc, [key, value]) => (((acc[key] = value), acc)), {})
}

export function stringifyURL(obj) {
  return Object.entries(obj).map(([key, value]) => `${key}=${value}`).join('&')
}

export function throttle(fn, delay) {
  var t = null
  var begin = new Date().getTime()

  return function(...args) {
    var _self = this
    var cur = new Date().getTime()

    clearTimeout(t)

    if (cur - begin >= delay) {
      fn.apply(_self, args)
      begin = cur
    } else {
      t = setTimeout(function() {
        fn.apply(_self, args)
      }, delay)
    }
  }
}

export function once(fn) {
  let called = false
  return function(...args) {
    if (called === false) {
      called = true
      return fn.apply(this, args)
    }
  }
}

/**
 * 有些脚本是在document-start执行的，安全地获得document
 * @param {fn} cb
 */
export function documentLoaded(cb) {
  document.body
    ? cb()
    : window.addEventListener('DOMContentLoaded', cb)
}

/**
 * 延时
 * @param {number} ms 毫秒数
 */
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export function toFormData(params = {}) {
  const formData = new FormData()
  for (const [key, value] of Object.entries(params)) {
    formData.append(key, value)
  }
  return formData
}
