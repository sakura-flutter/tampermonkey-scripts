export function throttle(fn, delay) {
  let t = null
  let begin = Date.now()

  return function(...args) {
    const self = this
    const cur = Date.now()

    clearTimeout(t)

    if (cur - begin >= delay) {
      fn.apply(self, args)
      begin = cur
    } else {
      t = setTimeout(function() {
        fn.apply(self, args)
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
