/**
 * 解析querystring
 * @param {string} href 或 带有参数格式的string；有search则不再hash
 * @return {object}
 */
export function parse(href = location.href) {
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

export function stringify(obj) {
  return Object.entries(obj).map(([key, value]) => `${key}=${value}`).join('&')
}
