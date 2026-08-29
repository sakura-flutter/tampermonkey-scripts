// =====================================================
// Name: 点按与长按键盘事件
// Author: AI
// =====================================================

/**
 * 点按与长按处理器配置
 */
export interface TapHoldConfig {
  /** 长按阈值（毫秒），默认 300 */
  longPressThreshold?: number
  /** 是否在捕获阶段监听，默认 false */
  capture?: boolean
  /** keydown 钩子，返回 false 可阻止 TapHold 处理该事件 */
  onKeydown?: (event: KeyboardEvent) => boolean | void
  /** keyup 钩子（仅副作用，不影响 TapHold 流程） */
  onKeyup?: (event: KeyboardEvent) => void
}

/**
 * 按键回调集合
 */
export interface TapHoldHandlers {
  /** 点按：在长按阈值内松开时触发 */
  onTap?: (event: KeyboardEvent) => void
  /** 长按开始：按住超过阈值时触发 */
  onLongPressStart?: (event: KeyboardEvent) => void
  /** 长按结束：长按后松开时触发（不会与 onTap 同时触发） */
  onLongPressEnd?: (event: KeyboardEvent) => void
}

interface KeyState {
  longPressTimer: number | null
  isHolding: boolean
}

/**
 * 点按与长按键盘事件检测器
 *
 * - 点按：按下后在长按阈值内松开
 * - 长按：按下后持续超过阈值
 *
 * 长按触发后松开只会触发 `onLongPressEnd`，不会触发 `onTap`；
 * 未注册 `onLongPressStart` 的键长按后松开同样不触发 `onTap`（长按视为"取消点按"）。
 *
 * `on(key, handlers)` 的 `key` 既可匹配 `event.key` 也可匹配 `event.code`。
 */
export class TapHold {
  private longPressThreshold: number
  private capture: boolean
  private onKeydown?: (event: KeyboardEvent) => boolean | void
  private onKeyup?: (event: KeyboardEvent) => void

  private handlers: Map<string, TapHoldHandlers>
  private keyStates: Map<string, KeyState>
  private isActive = false

  private boundKeyDown: (e: KeyboardEvent) => void
  private boundKeyUp: (e: KeyboardEvent) => void

  constructor(config?: TapHoldConfig) {
    this.longPressThreshold = config?.longPressThreshold ?? 300
    this.capture = config?.capture ?? false
    this.onKeydown = config?.onKeydown
    this.onKeyup = config?.onKeyup

    this.handlers = new Map()
    this.keyStates = new Map()

    this.boundKeyDown = this.handleKeyDown.bind(this)
    this.boundKeyUp = this.handleKeyUp.bind(this)
  }

  /**
   * 注册按键回调
   * @param key 按键标识，可为 `event.key`（如 'ArrowRight'、'2'）或 `event.code`（如 'KeyS'）
   * @param handlers 回调集合
   */
  on(key: string, handlers: TapHoldHandlers) {
    this.handlers.set(key, handlers)
  }

  /** 启动监听 */
  start() {
    if (this.isActive) return
    this.isActive = true
    window.addEventListener('keydown', this.boundKeyDown, this.capture)
    window.addEventListener('keyup', this.boundKeyUp, this.capture)
  }

  /** 停止监听并清理计时器 */
  stop() {
    if (!this.isActive) return
    this.isActive = false
    window.removeEventListener('keydown', this.boundKeyDown, this.capture)
    window.removeEventListener('keyup', this.boundKeyUp, this.capture)
    this.clearAllTimers()
  }

  /** 销毁，释放所有资源 */
  destroy() {
    this.stop()
    this.handlers.clear()
  }

  /** 解析事件对应的注册 key，未注册返回 null */
  private resolveKey(event: KeyboardEvent): string | null {
    if (this.handlers.has(event.key)) return event.key
    if (this.handlers.has(event.code)) return event.code
    return null
  }

  private handleKeyDown(event: KeyboardEvent) {
    // keydown 钩子，返回 false 则不处理
    if (this.onKeydown?.(event) === false) return
    // 忽略系统重复 keydown
    if (event.repeat) return

    const key = this.resolveKey(event)
    if (!key) return

    let state = this.keyStates.get(key)
    if (!state) {
      state = { longPressTimer: null, isHolding: false }
      this.keyStates.set(key, state)
    }
    // 已在计时中，防御性跳过
    if (state.longPressTimer !== null) return

    state.isHolding = false
    state.longPressTimer = window.setTimeout(() => {
      state.longPressTimer = null
      state.isHolding = true
      this.handlers.get(key)?.onLongPressStart?.(event)
    }, this.longPressThreshold)
  }

  private handleKeyUp(event: KeyboardEvent) {
    this.onKeyup?.(event)

    const key = this.resolveKey(event)
    if (!key) return

    const state = this.keyStates.get(key)
    if (!state) return

    if (state.longPressTimer !== null) {
      clearTimeout(state.longPressTimer)
      state.longPressTimer = null
    }

    const handlers = this.handlers.get(key)
    if (state.isHolding) {
      handlers?.onLongPressEnd?.(event)
    } else {
      handlers?.onTap?.(event)
    }

    this.keyStates.delete(key)
  }

  private clearAllTimers() {
    this.keyStates.forEach(state => {
      if (state.longPressTimer !== null) {
        clearTimeout(state.longPressTimer)
        state.longPressTimer = null
      }
    })
    this.keyStates.clear()
  }
}
