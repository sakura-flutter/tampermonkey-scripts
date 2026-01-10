// =====================================================
// Name: 多击键盘事件
// Author: AI
// =====================================================

/**
 * 多击长按事件配置
 */
export interface MultiPressConfig {
  /** 多击之间的最大时间间隔（毫秒），默认 150ms */
  pressInterval?: number;
  /** 长按触发的时间阈值（毫秒），默认 350ms */
  longPressThreshold?: number;
  /** 是否在长按期间持续触发事件，默认 false */
  enableRepeat?: boolean;
  /** 重复触发的间隔（毫秒），默认 100ms */
  repeatInterval?: number;
}

/**
 * 多击长按事件详情
 */
export interface MultiPressEvent {
  /** 按键代码 */
  key: KeyboardEvent['key'];
  /** 按键次数 (1=单次, 2=两次, 3=三次, 4=四次, ...) */
  pressCount: number;
  /** 是否为长按事件 */
  isLongPress: boolean;
  /** 长按持续时间（毫秒），仅在长按时有效 */
  pressDuration?: number;
  /** 原始键盘事件 */
  originalEvent: KeyboardEvent;
}

/**
 * 事件回调函数类型
 */
export type MultiPressCallback = (event: MultiPressEvent) => void;

/**
 * 多击长按键盘事件处理器
 *
 * 功能特点：
 * - 支持单次、两次、三次、四次等任意多击检测
 * - 支持长按检测（按下后持续一段时间）
 * - 支持双击长按、三击长按等组合模式
 * - 可配置时间阈值
 * - 支持长按期间重复触发
 *
 * @example
 * ```typescript
 * // 创建处理器
 * const handler = new MultiPress({
 *   pressInterval: 300,      // 多击间隔 300ms
 *   longPressThreshold: 500, // 长按阈值 500ms
 *   enableRepeat: true,      // 启用重复触发
 *   repeatInterval: 100      // 每 100ms 重复一次
 * });
 *
 * // 监听单击长按（按一次并长按）
 * handler.on('Space', 1, (event) => {
 *   console.log('空格单击长按', event.pressDuration);
 * });
 *
 * // 监听双击长按（按两次后第二次长按）
 * handler.on('Enter', 2, (event) => {
 *   console.log('回车双击长按', event.pressCount);
 * });
 *
 * // 监听三击长按
 * handler.on('ArrowUp', 3, (event) => {
 *   console.log('上箭头三击长按');
 * });
 *
 * // 启动监听
 * handler.start();
 *
 * // 停止监听
 * handler.stop();
 * ```
 */
export class MultiPress {
  private config: Required<MultiPressConfig>
  private listeners: Map<KeyboardEvent['key'], Map<number, MultiPressCallback[]>>
  private keyStates: Map<KeyboardEvent['key'], {
    pressCount: number;
    lastKeyDownTime: number;
    lastKeyUpTime: number;
    longPressTimer: number | null;
    repeatTimer: number | null;
    pressResetTimer: number | null;
    pressTriggerTimer: number | null;
    isLongPressing: boolean;
    pressStartTime: number;
    lastEvent: KeyboardEvent | null;
  }>

  private isActive: boolean
  private boundKeyDown: (e: KeyboardEvent) => void
  private boundKeyUp: (e: KeyboardEvent) => void

  constructor(config?: MultiPressConfig) {
    const defaultConfig: Required<MultiPressConfig> = {
      pressInterval: 150,
      longPressThreshold: 350,
      enableRepeat: false,
      repeatInterval: 100,
    }

    this.config = { ...defaultConfig, ...config }
    this.listeners = new Map()
    this.keyStates = new Map()
    this.isActive = false

    this.boundKeyDown = this.handleKeyDown.bind(this)
    this.boundKeyUp = this.handleKeyUp.bind(this)
  }

  /**
   * 注册事件监听器
   * @param key 按键代码（如 'Space', 'Enter', 'a', 'A', 'ArrowUp' 等）
   * @param pressCount 按键次数（1=单次, 2=两次, 3=三次, ...）
   * @param callback 回调函数
   */
  on(key: KeyboardEvent['key'], pressCount: number, callback: MultiPressCallback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Map())
    }

    const keyListeners = this.listeners.get(key)!
    if (!keyListeners.has(pressCount)) {
      keyListeners.set(pressCount, [])
    }

    keyListeners.get(pressCount)!.push(callback)
  }

  /**
   * 移除事件监听器
   * @param key 按键代码
   * @param pressCount 按键次数
   * @param callback 要移除的回调函数（可选，不传则移除该按键和按键次数的所有监听器）
   */
  off(key: string, pressCount?: number, callback?: MultiPressCallback) {
    if (!this.listeners.has(key)) return

    const keyListeners = this.listeners.get(key)!

    if (pressCount === undefined) {
      // 移除该按键的所有监听器
      this.listeners.delete(key)
      return
    }

    if (!keyListeners.has(pressCount)) return

    if (callback === undefined) {
      // 移除该按键和按键次数的所有监听器
      keyListeners.delete(pressCount)
    } else {
      // 移除特定回调
      const callbacks = keyListeners.get(pressCount)!
      const index = callbacks.indexOf(callback)
      if (index !== -1) {
        callbacks.splice(index, 1)
      }
      if (callbacks.length === 0) {
        keyListeners.delete(pressCount)
      }
    }

    if (keyListeners.size === 0) {
      this.listeners.delete(key)
    }
  }

  /**
   * 获取当前配置
   */
  getConfig(): Required<MultiPressConfig> {
    return { ...this.config }
  }

  /**
   * 更新配置
   */
  updateConfig(config: Partial<MultiPressConfig>) {
    this.config = {
      ...this.config,
      ...config,
    }
  }

  /**
   * 启动键盘事件监听
   */
  start() {
    if (this.isActive) return

    this.isActive = true
    window.addEventListener('keydown', this.boundKeyDown, true)
    window.addEventListener('keyup', this.boundKeyUp, true)
  }

  /**
   * 停止键盘事件监听
   */
  stop() {
    if (!this.isActive) return

    this.isActive = false
    window.removeEventListener('keydown', this.boundKeyDown, true)
    window.removeEventListener('keyup', this.boundKeyUp, true)
    this.clearAllTimers()
  }

  /**
   * 销毁处理器，清理所有资源
   */
  destroy() {
    this.stop()
    this.listeners.clear()
    this.keyStates.clear()
  }

  private handleKeyDown(event: KeyboardEvent) {
    const key = event.key

    // 避免重复触发（按住不放）
    if (event.repeat) return

    const now = Date.now()
    let state = this.keyStates.get(key)

    if (!state) {
      state = {
        pressCount: 0,
        lastKeyDownTime: 0,
        lastKeyUpTime: 0,
        longPressTimer: null,
        repeatTimer: null,
        pressResetTimer: null,
        pressTriggerTimer: null,
        isLongPressing: false,
        pressStartTime: 0,
        lastEvent: null,
      }
      this.keyStates.set(key, state)
    }

    // 判断是否为连续点击
    const timeSinceLastUp = now - state.lastKeyUpTime
    if (timeSinceLastUp <= this.config.pressInterval && state.lastKeyUpTime > 0) {
      // 连续点击，增加计数
      state.pressCount++
    } else {
      // 新的点击序列
      state.pressCount = 1
    }

    state.lastKeyDownTime = now
    state.pressStartTime = now
    state.isLongPressing = false
    state.lastEvent = event

    // 清除之前的定时器（包括按键触发定时器）
    this.clearTimers(state)
    if (state.pressTriggerTimer !== null) {
      clearTimeout(state.pressTriggerTimer)
      state.pressTriggerTimer = null
    }

    // 设置长按检测定时器
    state.longPressTimer = window.setTimeout(() => {
      state.isLongPressing = true
      this.triggerEvent(key, state.pressCount, true, event, now)

      // 如果启用重复触发
      if (this.config.enableRepeat) {
        state.repeatTimer = window.setInterval(() => {
          if (state.isLongPressing) {
            this.triggerEvent(key, state.pressCount, true, event, state.pressStartTime)
          }
        }, this.config.repeatInterval)
      }
    }, this.config.longPressThreshold)
  }

  private handleKeyUp(event: KeyboardEvent) {
    const key = event.key
    const state = this.keyStates.get(key)
    if (!state) return

    const now = Date.now()
    state.lastKeyUpTime = now

    // 清除长按和重复定时器
    this.clearTimers(state)

    // 如果没有触发长按，需要延迟触发以等待可能的后续点击
    if (!state.isLongPressing) {
      // 清除之前的延迟触发定时器
      if (state.pressTriggerTimer !== null) {
        clearTimeout(state.pressTriggerTimer)
        state.pressTriggerTimer = null
      }

      // 保存当前的 pressCount 和 event
      const currentPressCount = state.pressCount
      const currentEvent = state.lastEvent || event

      // 设置延迟触发定时器，等待 pressInterval 时间
      // 如果在这个时间内没有新的点击，则触发当前次数的回调
      state.pressTriggerTimer = window.setTimeout(() => {
        // 触发当前点击次数的事件
        this.triggerEvent(key, currentPressCount, false, currentEvent)

        // 重置按键计数
        state.pressCount = 0
        state.pressTriggerTimer = null
      }, this.config.pressInterval)
    } else {
      // 如果已经触发长按，只需要重置状态
      state.isLongPressing = false

      // 设置按键计数重置定时器
      state.pressResetTimer = window.setTimeout(() => {
        state.pressCount = 0
      }, this.config.pressInterval)
    }
  }

  private triggerEvent(
    key: string,
    pressCount: number,
    isLongPress: boolean,
    originalEvent: KeyboardEvent,
    pressStartTime?: number,
  ) {
    const keyListeners = this.listeners.get(key)
    if (!keyListeners) return

    const callbacks = keyListeners.get(pressCount)
    if (!callbacks || callbacks.length === 0) return

    const eventDetail: MultiPressEvent = {
      key,
      pressCount,
      isLongPress,
      pressDuration: pressStartTime ? Date.now() - pressStartTime : undefined,
      originalEvent,
    }

    callbacks.forEach(callback => {
      try {
        callback(eventDetail)
      } catch (error) {
        console.error('MultiPress callback error:', error)
      }
    })
  }

  private clearTimers(state: {
    longPressTimer: number | null;
    repeatTimer: number | null;
    pressResetTimer: number | null;
    pressTriggerTimer: number | null;
  }) {
    if (state.longPressTimer !== null) {
      clearTimeout(state.longPressTimer)
      state.longPressTimer = null
    }
    if (state.repeatTimer !== null) {
      clearInterval(state.repeatTimer)
      state.repeatTimer = null
    }
  }

  private clearAllTimers() {
    this.keyStates.forEach(state => {
      this.clearTimers(state)
      if (state.pressResetTimer !== null) {
        clearTimeout(state.pressResetTimer)
        state.pressResetTimer = null
      }
      if (state.pressTriggerTimer !== null) {
        clearTimeout(state.pressTriggerTimer)
        state.pressTriggerTimer = null
      }
    })
  }
}

/**
 * 便捷工厂函数
 */
export function createMultiPress(
  config?: MultiPressConfig,
): MultiPress {
  return new MultiPress(config)
}
