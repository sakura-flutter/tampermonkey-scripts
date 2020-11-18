import * as readyState from '@/utils/ready-state'
import { table as logTable } from '@/utils/log'
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
      if (test instanceof RegExp) {
        if (test.test(briefURL) === false) return
      }

      const config = use()
      const { readyState: state } = config
      if (state) await readyState[state]()

      let redirection = null
      const { link, selector } = config
      if (link) {
        redirection = link
      } else if (selector) {
        redirection = document.querySelector(selector).innerText
      }

      logTable({ name, briefURL, redirection })
      redirection && location.replace(redirection)
    })
  }
}

new App(sites).boot()
