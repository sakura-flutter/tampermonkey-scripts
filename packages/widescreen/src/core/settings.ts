import { GM_addValueChangeListener, GM_getValue, GM_removeValueChangeListener, GM_setValue } from '$'
import type { PanelPosition, SiteSettings } from './types'

const STORAGE_KEY = 'widescreen.config'

interface PanelSettings {
  visible: boolean
  position: PanelPosition | null
}

interface SettingsSchema {
  version: 2
  sites: Record<string, SiteSettings>
  panel: PanelSettings
}

/** 返回单个站点的默认开关状态 */
function defaultSiteSettings(): SiteSettings {
  return { enabled: true, uncapped: false }
}

function normalizeSiteSettings(value: unknown): SiteSettings {
  if (!value || typeof value !== 'object') return defaultSiteSettings()

  const candidate = value as Partial<SiteSettings>
  return {
    enabled: typeof candidate.enabled === 'boolean' ? candidate.enabled : true,
    uncapped: typeof candidate.uncapped === 'boolean' ? candidate.uncapped : false,
  }
}

/** 返回设置存储的初始结构 */
function defaultSettings(): SettingsSchema {
  return {
    version: 2,
    sites: {},
    panel: {
      visible: true,
      position: null,
    },
  }
}

function normalizePanelPosition(value: unknown): PanelPosition | null {
  if (!value || typeof value !== 'object') return null

  const candidate = value as Partial<PanelPosition>
  if (!Number.isFinite(candidate.right) || !Number.isFinite(candidate.top)) return null

  return {
    right: Math.max(0, candidate.right!),
    top: Math.max(0, candidate.top!),
  }
}

/** 校验存储值并合并站点设置默认值 */
function normalize(value: unknown): SettingsSchema {
  if (!value || typeof value !== 'object') {
    return defaultSettings()
  }

  const candidate = value as Partial<SettingsSchema>
  const sites = candidate.sites && typeof candidate.sites === 'object' ? candidate.sites : {}
  const panel = candidate.panel && typeof candidate.panel === 'object' ? candidate.panel : undefined
  const visible = typeof panel?.visible === 'boolean' ? panel.visible : true
  const position = normalizePanelPosition(panel?.position)

  return {
    version: 2,
    sites: Object.fromEntries(
      Object.entries(sites).map(([siteId, settings]) => [siteId, normalizeSiteSettings(settings)]),
    ),
    panel: { visible, position },
  }
}

/** 持久化每个站点的宽屏开关设置 */
export class SettingsStore {
  /** 读取并规范化当前设置 */
  #read() {
    return normalize(GM_getValue(STORAGE_KEY))
  }

  /** 获取指定站点设置，未保存时返回默认值 */
  get(siteId: string): SiteSettings {
    return this.#read().sites[siteId] ?? defaultSiteSettings()
  }

  /** 合并并持久化指定站点的设置变更 */
  update(siteId: string, patch: Partial<SiteSettings>) {
    const settings = this.#read()
    settings.sites[siteId] = {
      ...defaultSiteSettings(),
      ...settings.sites[siteId],
      ...patch,
    }
    GM_setValue(STORAGE_KEY, settings)
  }

  /** 获取跨站点共享的控制面板位置 */
  getPanelPosition(): PanelPosition | null {
    const position = this.#read().panel.position
    return position ? { ...position } : null
  }

  /** 持久化跨站点共享的控制面板位置 */
  setPanelPosition(position: PanelPosition) {
    const settings = this.#read()
    settings.panel.position = normalizePanelPosition(position)
    GM_setValue(STORAGE_KEY, settings)
  }

  /** 获取控制面板是否可见 */
  getPanelVisible() {
    return this.#read().panel.visible
  }

  /** 持久化控制面板可见状态 */
  setPanelVisible(visible: boolean) {
    const settings = this.#read()
    settings.panel.visible = visible
    GM_setValue(STORAGE_KEY, settings)
  }

  /** 监听设置存储变化，并返回取消订阅函数 */
  subscribe(listener: () => void) {
    const id = GM_addValueChangeListener(STORAGE_KEY, () => listener())
    return () => GM_removeValueChangeListener(id)
  }
}
