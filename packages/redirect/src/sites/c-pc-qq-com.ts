import type { Site } from '../types'

/**
 * 解析 QQNT 跳转链接
 *
 * QQNT 偶发会在 url 参数值末尾拼接 %2F（解码后即多余末斜杠）。由于 qs 解析时已把
 * %2F 解码为普通 /，无法区分它是 QQNT 偶发的产物还是链接本就合法的末尾斜杠，因此这里
 * 直接处理原始 query：仅当 url 参数原始值确实以 %2F 结尾时才剥除，避免误删正常链接末尾斜杠。
 *
 * @see https://greasyfork.org/zh-CN/scripts/416338-redirect-%E5%A4%96%E9%93%BE%E8%B7%B3%E8%BD%AC
 * @see https://github.com/sakura-flutter/tampermonkey-scripts/pull/658
 *
 * @param search 原始 query 字符串，可带或不带前导 `?`
 */
export function parseQQNTUrl(search: string): string | undefined {
  for (const pair of search.replace(/^\?/, '').split('&')) {
    const eq = pair.indexOf('=')
    if (eq === -1 || pair.slice(0, eq) !== 'url') continue
    const raw = pair.slice(eq + 1)
    const value = /(%2f)$/i.test(raw) ? raw.slice(0, -3) : raw
    return value ? decodeURIComponent(value) : undefined
  }
}

export const QQNT: Site['parse'] = () => parseQQNTUrl(location.search)
