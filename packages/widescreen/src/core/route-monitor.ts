import type { RouteSnapshot } from './types'

type RouteListener = (route: RouteSnapshot) => void

/** 从浏览器 location 创建当前路由快照 */
export function createRouteSnapshot(): RouteSnapshot {
  return {
    href: location.href,
    host: location.hostname,
    pathname: location.pathname || '/',
    search: location.search,
    hash: location.hash,
  }
}

export class RouteMonitor {
  /** 当前路由订阅者集合 */
  #listeners = new Set<RouteListener>()
  /** 最近一次已通知的路由 */
  #current: RouteSnapshot | null = null
  /** 是否已排队刷新路由 */
  #flushQueued = false
  /** 是否已启动监听 */
  #started = false

  /** 开始监听 Navigation API 路由事件 */
  start() {
    if (this.#started) return
    this.#started = true

    navigation.addEventListener('currententrychange', this.#queueEmit)
    this.#queueEmit()
  }

  /** 注册路由变化监听器，并返回取消订阅函数 */
  subscribe(listener: RouteListener) {
    this.#listeners.add(listener)
    return () => this.#listeners.delete(listener)
  }

  /** 停止监听 Navigation API 路由事件 */
  stop() {
    if (!this.#started) return
    this.#started = false
    navigation.removeEventListener('currententrychange', this.#queueEmit)
    this.#current = null
  }

  /** 排队合并路由变更，并仅在地址变化后通知订阅者 */
  #queueEmit = () => {
    if (this.#flushQueued) return
    this.#flushQueued = true

    queueMicrotask(() => {
      this.#flushQueued = false
      if (!this.#started) return
      const next = createRouteSnapshot()
      if (this.#current?.href === next.href) return

      this.#current = next
      this.#listeners.forEach(listener => listener(next))
    })
  }
}
