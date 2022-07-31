interface ParseReturn {
  [key: string]: string
}

/**
 * 解析 query
 * @param href 或 带有参数格式的 string；有 search 则不再 hash
 */
export function parse(href: string | null = location.href): ParseReturn {
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

  return Object.fromEntries(new URLSearchParams(search))
}

export function stringify(obj: ParseReturn | {
  [key: string]: number
}): string {
  return Object.entries(obj)
    // 过滤 undefined，保留 null 且转成 ''
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value ?? ''}`)
    .join('&')
}
