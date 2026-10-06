import type { PanelPosition, SiteSettings } from '../core/types'
import { uncappedIcon, panelIcon, wideIcon } from './icons'
import { mountGlassSurface } from './glass-surface'
import { applyPanelPosition, clearPanelPosition, createPanelDrag } from './panel-position'
import panelStyles from './control-panel.scss?inline'
import glassStyles from './glass-surface.scss?inline'

export interface PanelState {
  siteId: string
  siteName: string
  pageName: string
  settings: SiteSettings
}

export class ControlPanel {
  #host: HTMLDivElement | null = null
  #shadow: ShadowRoot | null = null
  #state: PanelState | null = null
  #glassCleanup: (() => void) | null = null
  #dragCleanup: (() => void) | null = null
  #visible = true
  #onEnabledChange: (siteId: string, value: boolean) => void
  #onUncappedChange: (siteId: string, value: boolean) => void
  #getPanelPosition: () => PanelPosition | null
  #setPanelPosition: (position: PanelPosition) => void

  constructor(options: {
    getPanelPosition: () => PanelPosition | null
    setPanelPosition: (position: PanelPosition) => void
    onEnabledChange: (siteId: string, value: boolean) => void
    onUncappedChange: (siteId: string, value: boolean) => void
  }) {
    this.#onEnabledChange = options.onEnabledChange
    this.#onUncappedChange = options.onUncappedChange
    this.#getPanelPosition = options.getPanelPosition
    this.#setPanelPosition = options.setPanelPosition
  }

  mount() {
    if (this.#host) return

    this.#host = document.createElement('div')
    this.#host.dataset.wsControl = 'true'
    this.#shadow = this.#host.attachShadow({ mode: 'closed' })
    this.#shadow.innerHTML = `
      <style>${panelStyles}${glassStyles}</style>
      <div class="panel" aria-hidden="true"></div>
    `

    const parent = document.body ?? document.documentElement
    parent.append(this.#host)

    const panel = this.#getPanel()
    panel?.addEventListener('pointerenter', event => {
      if ((event as PointerEvent).pointerType !== 'mouse') return
      this.#syncHoverState(panel)
    })
    panel?.addEventListener('pointerleave', event => {
      if ((event as PointerEvent).pointerType !== 'mouse') return
      this.#syncHoverState(panel)
    })
  }

  show(state: PanelState) {
    this.mount()
    this.#state = state
    this.#render()
  }

  hide() {
    const panel = this.#getPanel()
    if (!panel) return

    ;(this.#shadow?.activeElement as HTMLElement | null)?.blur()
    this.#glassCleanup?.()
    this.#glassCleanup = null
    this.#dragCleanup?.()
    this.#dragCleanup = null
    panel.classList.remove('is-visible')
    panel.setAttribute('aria-hidden', 'true')
    this.#state = null
  }

  setVisible(visible: boolean) {
    this.mount()
    this.#visible = visible
    this.#render()
  }

  #getPanel() {
    return this.#shadow?.querySelector('.panel') as HTMLElement | null
  }

  #syncHoverState(panel: HTMLElement) {
    const expanded =
      (panel.matches(':hover') || panel.classList.contains('is-dragging')) && this.#visible && this.#state !== null
    panel.querySelector('.content')?.setAttribute('aria-hidden', String(!expanded))
    panel.querySelectorAll<HTMLButtonElement>('.control').forEach(control => {
      control.tabIndex = expanded ? 0 : -1
    })
  }

  #render() {
    const panel = this.#getPanel()
    if (!panel) return

    this.#glassCleanup?.()
    this.#glassCleanup = null
    this.#dragCleanup?.()
    this.#dragCleanup = null
    panel.replaceChildren()
    panel.classList.toggle('is-visible', Boolean(this.#state && this.#visible))
    panel.setAttribute('aria-hidden', String(!this.#state || !this.#visible))

    if (!this.#state) return

    const card = document.createElement('div')
    card.className = 'card'

    const trigger = document.createElement('div')
    trigger.className = 'trigger'
    trigger.setAttribute('role', 'img')
    trigger.setAttribute('aria-label', '宽屏控制')
    trigger.title = '宽屏控制'
    trigger.innerHTML = panelIcon

    const content = document.createElement('div')
    content.className = 'content'
    content.id = 'widescreen-control-content'
    content.setAttribute('aria-hidden', 'true')
    const contentInner = document.createElement('div')
    contentInner.className = 'content-inner'

    const title = document.createElement('div')
    title.className = 'site-name'
    title.textContent = this.#state.siteName

    const actions = document.createElement('div')
    actions.className = 'actions'
    const enabled = this.#createControl('宽屏', wideIcon, this.#state.settings.enabled, value => {
      this.#onEnabledChange(this.#state!.siteId, value)
    })
    const uncapped = this.#createControl('铺满', uncappedIcon, this.#state.settings.uncapped, value => {
      this.#onUncappedChange(this.#state!.siteId, value)
    })
    uncapped.disabled = !this.#state.settings.enabled

    actions.append(enabled.button, uncapped.button)
    contentInner.append(title, actions)
    content.append(contentInner)
    const glassContent = document.createElement('div')
    glassContent.className = 'glass-content'
    glassContent.append(content, trigger)
    card.append(glassContent)
    panel.append(card)
    const savedPosition = this.#getPanelPosition()
    if (savedPosition) applyPanelPosition(panel, savedPosition)
    else clearPanelPosition(panel)
    this.#glassCleanup = mountGlassSurface(card)
    this.#dragCleanup = createPanelDrag({
      panel,
      handle: trigger,
      getPosition: this.#getPanelPosition,
      setPosition: this.#setPanelPosition,
      onDragStateChange: () => this.#syncHoverState(panel),
    })
    this.#syncHoverState(panel)
  }

  #createControl(text: string, icon: string, checked: boolean, onChange: (value: boolean) => void) {
    const button = document.createElement('button')
    button.className = 'control'
    button.dataset.control = text
    button.type = 'button'
    button.tabIndex = -1
    button.setAttribute('aria-label', text)
    button.title = text
    button.setAttribute('aria-pressed', String(checked))
    button.innerHTML = `${icon}<span>${text}</span>`
    button.addEventListener('click', () => {
      const nextValue = button.getAttribute('aria-pressed') !== 'true'
      button.setAttribute('aria-pressed', String(nextValue))
      onChange(nextValue)
    })
    return {
      button,
      set disabled(value: boolean) {
        button.disabled = value
      },
    }
  }
}
