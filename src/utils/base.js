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
 * 延时
 * @param {number} ms 毫秒数
 */
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export function isFunction(value) {
  return typeof value === 'function'
}
