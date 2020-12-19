import * as readyState from '@/utils/ready-state'
import { $ } from '@/utils/selector'
import { warn, table as logTable } from '@/utils/log'
import sites from './sites'

class App {
  #sites = []
  constructor(sites) {
    this.#sites = sites
  }

  boot() {
    const briefURL = location.origin + location.pathname

    this.#sites.forEach(async site => {
      const { name, test, use } = site
      const some = [].concat(test).some(item => {
        if (item instanceof RegExp) return item.test(briefURL)
        if (typeof item === 'boolean') return item

        return false
      })
      if (some === false) return

      const config = use()
      const { readyState: state } = config
      if (state) await readyState[state]()

      let redirection = null
      const { link, selector, attr } = config
      if (link) {
        redirection = link
      } else if (selector) {
        redirection = $(selector)?.[attr ?? 'innerText']?.trim()
      }

      logTable({ name, briefURL, redirection })
      redirection && location.replace(this.ensure(redirection))
    })
  }

  ensure(url) {
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
