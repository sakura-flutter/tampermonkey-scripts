export function parseURL(search = location.search) {
  if (!search) {
    // 主要处理对hash的search
    if (location.hash.includes('?')) {
      search = location.hash.split('?')[1]
    }
    if (!search) return {}
  }

  const searchParams = new URLSearchParams(search)
  return [...searchParams.entries()].reduce((acc, [key, value]) => (((acc[key] = value), acc)), {})
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
