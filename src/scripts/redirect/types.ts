import { ReadyState } from '@/utils/ready-state'

export interface ParseRule {
  /** 获取 location.search 中某个 key */
  query?: string
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

export interface Site {
  name: string
  test:
    (string | RegExp)
    | (string | RegExp)[]
  readyState?: ReadyState
  use: () => ParseRule | Promise<ParseRule>
}
