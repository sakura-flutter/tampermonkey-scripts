import { qs, readyState, $, log } from '@monkey/shared/utils'
import sites from './sites'
import type { Site, SiteContext } from './types'

function hidePage() {
  const style = document.createElement('style')
  style.textContent = 'html{visibility:hidden!important}'
  document.documentElement.append(style)
}

class App {
  /** 白名单 */
  static readonly #SAFE_PROTOCOLS = new Set(['http:', 'https:'])

  #sites

  constructor(sites: Site[]) {
    this.#sites = sites
  }

  async run() {
    const hostPath = location.host + location.pathname

    const site = this.#sites.find(s => this.#matches(s.match, hostPath))
    if (!site) return

    if (site.readyState) await readyState[site.readyState]()

    const ctx = this.#createContext()
    const redirection = await this.#resolve(site.parse, ctx)
    log.table({ name: site.name, hostPath, redirection })
    if (!redirection) return

    // 为什么要这样做？
    // 只是为了避免被问“哎！怎么好像没有跳转啊？！”的烦恼（实际上跳转了只是外链打开慢）
    hidePage()
    window.stop()
    location.replace(redirection)
  }

  #matches(match: Site['match'], url: string) {
    return (Array.isArray(match) ? match : [match]).some(item => {
      if (typeof item === 'string') return item === url
      if (item instanceof RegExp) return item.test(url)
      return false
    })
  }

  #createContext(): SiteContext {
    let queryCache: Record<string, string>
    return {
      get query() {
        return (queryCache ??= qs.parse())
      },
    }
  }

  async #resolve(parse: Site['parse'], ctx: SiteContext) {
    const result = await parse(ctx)

    if (!result) return
    if (typeof result === 'string') return this.#sanitize(result)

    const { searchParam, link, selector, attr } = result
    let redirection: string | undefined

    if (searchParam) {
      redirection = qs.parse()[searchParam]
    } else if (link) {
      redirection = link
    } else if (selector) {
      redirection = ($(selector) as any)?.[attr ?? 'innerText']
    }

    return this.#sanitize(redirection)
  }

  /**
   * 危险协议（如 javascript:、data:）应该由用户自行打开
   */
  #sanitize(input: string | null | undefined): string | undefined {
    const raw = input?.trim()
    if (!raw) return

    // 尝试直接解析，失败则补 http://（某些链接缺少 protocol）
    // https://greasyfork.org/zh-CN/scripts/416338-redirect-外链跳转/discussions/69178
    let url: URL | undefined
    for (const candidate of [raw, `http://${raw}`]) {
      try {
        url = new URL(candidate)
        break
      } catch {}
    }

    if (!url) return
    if (!App.#SAFE_PROTOCOLS.has(url.protocol)) {
      log.warn.force('不安全的重定向：', raw)
      return
    }

    return url.href
  }
}

new App(sites).run()
