/** 描述当前浏览器地址及其各组成部分 */
export interface RouteSnapshot {
  /** 当前页面的完整 URL */
  href: string
  /** 当前页面的精确主机名 */
  host: string
  /** 不包含查询参数和片段的路径 */
  pathname: string
  /** URL 查询字符串 */
  search: string
  /** URL 片段标识符 */
  hash: string
}

/** 描述可被动态启用和撤销的样式资源 */
export interface StyleResource {
  /** 启用这份样式资源 */
  use(): void
  /** 撤销这份样式资源 */
  unuse(): void
}

/** 定义页面内容占视口的比例和普通模式的最大宽度 */
export interface WidthPolicy {
  /** 内容占视口宽度的比例 */
  viewportRatio: number
  /** 普通模式允许的最大宽度；数字按 px 处理 */
  maxWidth: string | number
}

/** 保存单个站点的用户开关设置 */
export interface SiteSettings {
  /** 是否启用当前站点的宽屏样式 */
  enabled: boolean
  /** 是否取消宽度最大值限制 */
  uncapped: boolean
}

/** 保存控制面板距视口右侧和顶部的像素距离 */
export interface PanelPosition {
  right: number
  top: number
}

/** 提供给页面生命周期钩子的运行时上下文 */
export interface PageContext {
  /** 当前路由快照 */
  route: RouteSnapshot
  /** 当前匹配到的站点 */
  site: SiteDefinition
  /** 当前匹配到的页面规则 */
  page: PageDefinition
  /** 当前站点的持久化设置 */
  settings: SiteSettings
  /** 页面生命周期的取消信号 */
  signal: AbortSignal
  /** 注册页面卸载前执行的清理函数 */
  onBeforeDispose(disposer: () => void): void
  /** 注册页面及其资源卸载完成后执行的回调 */
  onAfterDispose(disposer: () => void): void
  /** 等待指定选择器对应的元素出现 */
  waitFor(selector: string): Promise<Element | null>
}

/** 页面路径的字符串模式或正则表达式 */
export type PathPattern = string | RegExp

/** 描述一个可匹配的站点页面及其生命周期资源 */
export interface PageDefinition {
  /** 页面规则的稳定标识 */
  id: string
  /** 面向用户显示的页面名称 */
  name: string
  /** 用于匹配 pathname 的规则，可配置多个候选规则 */
  pathPattern: PathPattern | PathPattern[]
  /** 匹配优先级，数值越大越优先 */
  priority?: number
  /** 当前页面的宽度策略 */
  widthPolicy: WidthPolicy
  /** 当前页面需要挂载的样式资源 */
  styles?: StyleResource[]
  /** 进入当前页面时执行的生命周期钩子 */
  activate?(context: PageContext): void | (() => void)
  /** 同一页面 URL 变化时执行的更新钩子 */
  update?(context: PageContext): void
}

/** 描述一个站点及其页面适配器集合 */
export interface SiteDefinition {
  /** 站点英文标识，多域名可依据 id 共享同一站点设置，同时作为 settings.sites 的持久化键名 */
  id: string
  /** 必须完全匹配的主机名 */
  host: string
  /** 面向用户显示的站点名称 */
  name: string
  /** 该站点所有页面共用的样式资源 */
  commonStyles?: StyleResource[]
  /** 该站点的页面匹配规则 */
  pages: PageDefinition[]
}

/** 表示路由匹配得到的站点和页面组合 */
export interface RouteMatch {
  /** 匹配到的站点定义 */
  site: SiteDefinition
  /** 匹配到的页面定义 */
  page: PageDefinition
}
