import type { ReadyState } from '@monkey/shared/utils'

export interface SiteContext {
  /** 已解析的 location.search 查询参数 */
  readonly query: Record<string, string>
}

export interface ParseRule {
  /** 获取 location.search 中某个 key */
  searchParam?: string
  /**
   * 选择页面上元素
   * 默认取元素的 innerText 值作为结果
   */
  selector?: string
  /** 配合 selector，获取元素的 attr 值作为结果 */
  attr?: string
  /** 跳转链接 */
  link?: string
}

type MatchPattern = string | RegExp

/** parse 的返回值：直接返回链接，或返回 ParseRule 由脚本代为提取 */
type ParseResult = ParseRule | string | null | void

export interface Site {
  name: string
  /**
   * 匹配 location.host + location.pathname
   * string 为全等匹配，RegExp 为自定义匹配
   */
  match: MatchPattern | MatchPattern[]
  readyState?: ReadyState
  parse: (ctx: SiteContext) => ParseResult | Promise<ParseResult>
}
