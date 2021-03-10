import * as readyState from '@/utils/ready-state'
import { parse } from '@/utils/querystring'
import { $ } from '@/utils/selector'
import { warn, table as logTable } from '@/utils/log'
import sites from './sites'

class App {
  #sites = []
  constructor(sites) {
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
      redirection && location.replace(redirection)
    })
  }

  #includes(test, url) {
    return [].concat(test).some(item => {
      if (item instanceof RegExp) return item.test(url)
      if (typeof item === 'boolean') return item
      return false
    })
  }

  async #parse(use) {
    const { query, link, selector, attr } = await use()
    let redirection = null

    if (query) {
      redirection = parse()[query]
    } else if (link) {
      redirection = link
    } else if (selector) {
      redirection = $(selector)?.[attr ?? 'innerText']
    }

    redirection &&= this.#ensure(redirection.trim())
    return redirection
  }

  #ensure(url) {
    try {
      // eslint-disable-next-line no-new
      new URL(url)
    } catch (error) {
      warn(error)
      // 修复某些链接没有protocol导致跳转不正确
      // https://greasyfork.org/zh-CN/scripts/416338-redirect-自动跳转到目标链接/discussions/69178
      const protocol = 'http:'
      url = protocol + '//' + url
    }
    return url
  }
}

new App(sites).boot()
