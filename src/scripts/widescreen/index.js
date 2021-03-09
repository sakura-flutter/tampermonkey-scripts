import { checker } from '@/utils/compatibility'
import * as readyState from '@/utils/ready-state'
import { warn } from '@/utils/log'
import globalStore, { createStore as _createStore } from '@/store'
import sites from './sites'
import createControl from './control'

// 主函数
function main() {
  if (!checker()) return

  GM_registerMenuCommand('宽屏通知', function() {
    const nextStatus = !(globalStore.notify_enabled ?? false)
    Toast.success(nextStatus ? '已开启通知' : '已关闭通知')
    globalStore.notify_enabled = nextStatus
  })
  GM_registerMenuCommand('控制按钮', function() {
    const nextStatus = !(globalStore.ui_visible ?? true)
    Toast.success(nextStatus ? '已显示按钮' : '已隐藏按钮')
    globalStore.ui_visible = nextStatus
  })

  new App(sites).boot()
}

class App {
  #sites = []
  constructor(sites) {
    this.#sites = sites
  }

  boot() {
    const briefURL = location.host + location.pathname

    this.#sites.forEach(async site => {
      const { name, namespace, test, use } = site
      if (!this.#includes(test, briefURL)) return

      const { readyState: state } = site
      if (state) await readyState[state]()

      const config = use({
        createControl,
        store: createStore(namespace),
      })
      warn(name)
      config.handler()
    })
  }

  #includes(test, url) {
    return [].concat(test).some(item => {
      if (item instanceof RegExp) return item.test(url)
      if (typeof item === 'boolean') return item
      return false
    })
  }
}

// 存储
function createStore(namespace) {
  if (!namespace) throw new TypeError('缺少namespace，期望<string>')

  const handler = {
    get(target, property) {
      let value = target[property]
      if (property === 'enabled') {
        // 默认开启
        value ??= true
      }
      return value
    },
  }
  const store = new Proxy(_createStore(namespace), handler)
  return store
}

main()
