import { log } from '@monkey/shared/utils'
import { waitForElement } from './dom'
import { LifecycleScope } from './lifecycle'
import { matchRoute } from './matcher'
import { SettingsStore } from './settings'
import { StyleManager } from './styles'
import type { PageContext, RouteMatch, RouteSnapshot, SiteDefinition, SiteSettings, StyleResource } from './types'
import type { ControlPanel, PanelState } from '../ui'

export class WidescreenRuntime {
  /** 已注册的站点适配器 */
  #sites: SiteDefinition[]
  /** 站点设置存储 */
  #settings: SettingsStore
  /** 浮动控制面板 */
  #panel: ControlPanel
  /** 样式资源管理器 */
  #styles = new StyleManager()
  /** 当前路由快照 */
  #currentRoute: RouteSnapshot | null = null
  /** 当前路由匹配结果 */
  #currentMatch: RouteMatch | null = null
  /** 当前已激活的 URL */
  #activeHref: string | null = null
  /** 当前生效的站点设置 */
  #activeSettings: SiteSettings | null = null
  /** 站点级生命周期作用域 */
  #siteScope: LifecycleScope | null = null
  /** 页面级生命周期作用域 */
  #pageScope: LifecycleScope | null = null

  constructor(options: { sites: SiteDefinition[]; settings: SettingsStore; panel: ControlPanel }) {
    this.#sites = options.sites
    this.#settings = options.settings
    this.#panel = options.panel
  }

  /** 根据当前路由切换适配，或更新同页动态内容 */
  transition(route: RouteSnapshot) {
    this.#currentRoute = route
    const nextMatch = matchRoute(route, this.#sites)

    if (this.#samePage(nextMatch) && this.#activeHref === route.href) {
      this.#panel.show(this.#panelState(nextMatch!))
      if (this.#currentMatch?.page.update && this.#pageScope) {
        try {
          this.#currentMatch.page.update(this.#createContext(this.#currentMatch, this.#pageScope))
        } catch (error) {
          log.error.force(
            '[widescreen] page update failed',
            this.#currentMatch.site.id,
            this.#currentMatch.page.id,
            error,
          )
          this.#disposePage()
        }
      }
      return
    }

    this.#activate(nextMatch)
  }

  /** 按最新站点设置重新协调当前页面适配 */
  reconcile() {
    if (!this.#currentRoute) return

    const nextMatch = matchRoute(this.#currentRoute, this.#sites)
    if (nextMatch && this.#samePage(nextMatch)) {
      const nextSettings = this.#settings.get(nextMatch.site.id)
      if (
        this.#activeSettings?.enabled === nextSettings.enabled &&
        this.#activeSettings?.uncapped === nextSettings.uncapped
      ) {
        this.#panel.show(this.#panelState(nextMatch))
        return
      }
    }

    this.#activate(nextMatch)
  }

  /** 卸载当前站点和页面资源并隐藏控制面板 */
  dispose() {
    this.#disposeSite()
    this.#panel.hide()
    this.#activeHref = null
  }

  /** 激活匹配页面，并隔离其样式与生命周期资源 */
  #activate(nextMatch: RouteMatch | null) {
    this.#activeHref = this.#currentRoute?.href ?? null

    if (!nextMatch) {
      this.#disposeSite()
      this.#currentMatch = null
      this.#panel.hide()
      return
    }

    log.warn(`当前匹配：${nextMatch.site.name} -> ${nextMatch.page.name}`)

    const sameSite = this.#currentMatch?.site.host === nextMatch.site.host
    const reuseSite = sameSite && this.#siteScope !== null
    if (reuseSite) this.#disposePage()
    else this.#disposeSite()

    this.#currentMatch = nextMatch
    const settings = this.#settings.get(nextMatch.site.id)
    this.#panel.show(this.#panelState(nextMatch))

    if (!settings.enabled) {
      this.#disposeSite()
      this.#activeSettings = settings
      return
    }

    this.#siteScope ??= new LifecycleScope()
    this.#pageScope = new LifecycleScope()

    try {
      if (!reuseSite) this.#mountStyles(nextMatch.site.commonStyles, this.#siteScope)
      this.#mountStyles(nextMatch.page.styles, this.#pageScope)
      this.#applyWidth(nextMatch, settings.uncapped)

      const context = this.#createContext(nextMatch, this.#pageScope)
      const disposer = nextMatch.page.activate?.(context)
      if (disposer) this.#pageScope.onBeforeDispose(disposer)
      this.#activeSettings = settings
    } catch (error) {
      log.error.force('[widescreen] site activation failed', nextMatch.site.id, nextMatch.page.id, error)
      this.#disposePage()
      this.#activeSettings = null
    }
  }

  /** 将样式资源挂载到指定生命周期作用域 */
  #mountStyles(resources: StyleResource[] | undefined, scope: LifecycleScope) {
    resources?.forEach(resource => {
      const handle = this.#styles.mount(resource)
      scope.onBeforeDispose(() => handle.dispose())
    })
  }

  /** 为站点页面钩子创建运行上下文 */
  #createContext(match: RouteMatch, scope: LifecycleScope): PageContext {
    return {
      route: this.#currentRoute!,
      site: match.site,
      page: match.page,
      settings: this.#settings.get(match.site.id),
      signal: scope.signal,
      onBeforeDispose: disposer => scope.onBeforeDispose(disposer),
      onAfterDispose: disposer => scope.onAfterDispose(disposer),
      waitFor: selector => waitForElement(selector, scope.signal),
    }
  }

  /** 构造控制面板所需的站点和页面状态 */
  #panelState(match: RouteMatch): PanelState {
    return {
      siteId: match.site.id,
      siteName: match.site.name,
      pageName: match.page.name,
      settings: this.#settings.get(match.site.id),
    }
  }

  /** 将页面宽度策略写入根节点 CSS 变量和模式标记 */
  #applyWidth(match: RouteMatch, uncapped: boolean) {
    const policy = match.page.widthPolicy
    const root = document.documentElement
    const viewportWidth = `${policy.viewportRatio * 100}vw`
    const maxWidth = typeof policy.maxWidth === 'number' ? `${policy.maxWidth}px` : policy.maxWidth
    const width = uncapped ? viewportWidth : `min(${viewportWidth}, ${maxWidth})`

    root.style.setProperty('--ws-content-width', width)
    root.dataset.wsSite = match.site.id
    root.dataset.wsPage = match.page.id
    root.dataset.wsMode = uncapped ? 'uncapped' : 'normal'
  }

  /** 清除当前页面注入的宽度变量和模式标记 */
  #clearPageState() {
    const root = document.documentElement
    root.style.removeProperty('--ws-content-width')
    delete root.dataset.wsPage
    delete root.dataset.wsMode
  }

  /** 释放页面级资源并清除页面状态 */
  #disposePage() {
    this.#pageScope?.dispose()
    this.#pageScope = null
    this.#clearPageState()
  }

  /** 释放页面及站点级资源 */
  #disposeSite() {
    this.#disposePage()
    this.#siteScope?.dispose()
    this.#siteScope = null
    this.#activeSettings = null
    delete document.documentElement.dataset.wsSite
  }

  #samePage(nextMatch: RouteMatch | null) {
    return Boolean(
      nextMatch &&
      this.#currentMatch &&
      nextMatch.site.host === this.#currentMatch.site.host &&
      nextMatch.page.id === this.#currentMatch.page.id,
    )
  }
}
