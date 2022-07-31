import * as readyState from '@/utils/ready-state'
import { parse } from '@/utils/querystring'
import { $ } from '@/utils/selector'
import { warn, table as logTable } from '@/utils/log'
import sites from './sites'
import type { Site } from './types'

function hidePage() {
  function hide() {
    document.body.style.cssText = 'display:none !important;'
  }
  document.body ? hide() : readyState.interactive(hide)
}

class App {
  #sites
  constructor(sites: Site[]) {
    this.#sites = sites
  }

  boot() {
    const briefURL = location.host + location.pathname

    this.#sites.forEach(async site => {
      const { name, test, use } = site
      if (!this.#includes(test, briefURL)) return

      const { readyState: state } = site
      if (state) await readyState[state]()

      const redirection = await this.#parse(use)
      logTable({ name, briefURL, redirection })
      if (!redirection) return
      location.replace(redirection)
      // 为什么要这样做？
      // 只是为了避免被问“哎！怎么好像没有跳转啊？！”的烦恼（实际上跳转了只是外链打开慢）(x_x)
      hidePage()
    })
  }

  #includes(test: Site['test'], url: string) {
    return ([] as Site['test'][]).concat(test).some(item => {
      if (typeof item === 'string') return item === url
      if (item instanceof RegExp) return item.test(url)
      return false
    })
  }

  async #parse(use: Site['use']) {
    const { query, link, selector, attr } = await use()
    let redirection: Location['href'] | undefined

    if (query) {
      redirection = parse()[query]
    } else if (link) {
      redirection = link
    } else if (selector) {
      redirection = ($(selector) as any)?.[attr ?? 'innerText']
    }

    redirection &&= this.#ensure(redirection.trim())
    return redirection
  }

  #ensure(url: string): Location['href'] {
    try {
      // eslint-disable-next-line no-new
      new URL(url)
    } catch (error) {
      warn(error)
      // 修复某些链接没有 protocol 导致跳转不正确
      // https://greasyfork.org/zh-CN/scripts/416338-redirect-外链跳转/discussions/69178
      const protocol = 'http:'
      url = protocol + '//' + url
    }
    return url
  }
}

new App(sites).boot()
