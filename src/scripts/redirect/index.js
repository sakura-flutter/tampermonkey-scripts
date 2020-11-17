import sites from './sites'

const isDebug = process.env.NODE_ENV !== 'production'

class App {
  #sites = []
  constructor(sites) {
    this.#sites = sites
  }

  boot() {
    const briefURL = location.host + location.pathname

    this.#sites.forEach(site => {
      const { name, test, use } = site
      if (test instanceof RegExp) {
        if (test.test(briefURL) === false) return
      }

      const { link } = use()
      isDebug && console.table({ name, briefURL, link })
      link && location.replace(link)
    })
  }
}

new App(sites).boot()
