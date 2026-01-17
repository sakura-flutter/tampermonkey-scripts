import { checker } from '@/utils/compatibility'
import * as readyState from '@/utils/ready-state'
import { warn } from '@/utils/log'
import globalStore, { createStore as _createStore } from '@/store'
import sites from './sites'
import createControl from './control'
import type { Site } from './types'

// 主函数
function main() {
  if (!checker()) return

  GM_registerMenuCommand('宽屏通知', function () {
    const nextStatus = !(globalStore.notify_enabled ?? false)
    Toast.success(nextStatus ? '已开启通知' : '已关闭通知')
    globalStore.notify_enabled = nextStatus
  })
  GM_registerMenuCommand('控制按钮', function () {
    const nextStatus = !(globalStore.ui_visible ?? true)
    Toast.success(nextStatus ? '已显示按钮' : '已隐藏按钮')
    globalStore.ui_visible = nextStatus
  })

  new App(sites).boot()
}

class App {
  #sites
  constructor(sites: Site[]) {
    this.#sites = sites
  }

  boot() {
    const briefURL = location.host + location.pathname

    this.#sites.forEach(async site => {
      const { name, namespace, test, use } = site
      if (!this.#includes(test, briefURL)) return

      const { readyState: state } = site
      if (state) await readyState[state]()
      // fix: 罕见情况下会获取不到 head，原因未知
      // 偶尔会在知乎中出现
      if (document.head == null) await readyState.interactive()

      const config = use({
        createControl,
        store: createStore(namespace),
      })
      warn(name)
      config.handler()
    })
  }

  #includes(test: Site['test'], url: string) {
    return ([] as Site['test'][]).concat(test).some(item => {
      if (item instanceof RegExp) return item.test(url)
      if (typeof item === 'boolean') return item
      return false
    })
  }
}

// 存储
function createStore(namespace: string) {
  const store = new Proxy(_createStore(namespace), {
    get(target, property: string, receiver) {
      let value = Reflect.get(target, property, receiver)
      if (property === 'enabled') {
        // 默认开启
        value ??= true
      }
      return value
    },
  })
  return store
}

main()
