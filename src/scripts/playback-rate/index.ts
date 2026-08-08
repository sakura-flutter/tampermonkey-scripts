import { $$ } from '@/utils/selector'
import { TapHold } from './tap-hold'
import { findBestVideoElement, isInputActive } from './utils'
import { warn } from '@/utils/log'
import { Command, CommandMessage, isCommandMessage } from './command'

// 由于 sohu 阻止了键盘事件，需要在捕获阶段监听

new (class PlaybackRateController {
  /** 长按方向右键时的倍速 */
  private readonly arrowRightBoostRate = 3
  /** 点按快进/后退步长（秒） */
  private readonly seekStep = 5
  /** 长按方向左键持续后退的步长（秒） */
  private readonly continuousSeekStep = 2
  /** 长按方向左键持续后退的间隔（毫秒） */
  private readonly continuousSeekInterval = 80
  /** 数字键 -> 倍速映射（0 重置为 1x，1 为 1.5x） */
  private readonly numberRateMap: Record<string, number> = {
    '0': 1,
    '1': 1.5,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
  }

  /** 被追踪的按键（event.key） */
  private readonly trackedKeys = new Set<string>(['ArrowLeft', 'ArrowRight', ...Object.keys(this.numberRateMap)])

  /** 长按倍速期间保存的"按下前速度" */
  private savedRate = 1
  /** 当前长按激活的按键（event.key），null 表示未激活；用于锁住其它按键、避免互相干扰 */
  private activeKey: string | null = null
  /** 当前激活的操作类型，供失焦复位（cancelActive）区分是否需要恢复速率 */
  private activeMode: 'boost' | 'seek' | null = null
  /** 长按连退定时器 */
  private seekTimer: number | null = null
  /** 本实例是否处于 iframe 内（只有被嵌套时才可能收到父级下发的命令） */
  private readonly isFramed = window.parent !== window

  private tapHold: TapHold

  private _video: HTMLVideoElement | null = null
  private get video() {
    return this._video
  }
  private set video(video: HTMLVideoElement | null) {
    // 长按激活期间不能置空，否则倍速无法恢复 / 连退中断
    if (this.activeKey && video === null) return
    this._video = video
  }

  /** 失焦/切后台复位处理器的绑定引用，便于销毁时移除监听 */
  private readonly boundBlur: () => void
  private readonly boundVisibility: () => void
  /** 接收父实例下发的命令 */
  private readonly onMessage: (e: MessageEvent) => void

  constructor() {
    this.tapHold = new TapHold({
      longPressThreshold: 300,
      capture: true,
      onKeydown: event => this.handleKeydown(event),
      onKeyup: event => this.handleKeyup(event),
    })

    this.tapHold.on('ArrowRight', {
      onTap: () => this.dispatch({ type: 'seek', direction: 1 }),
      onLongPressStart: event => this.dispatch({ type: 'boostStart', rate: this.arrowRightBoostRate, key: event.key }),
      onLongPressEnd: () => this.dispatch({ type: 'boostEnd' }),
    })

    this.tapHold.on('ArrowLeft', {
      onTap: () => this.dispatch({ type: 'seek', direction: -1 }),
      onLongPressStart: event => this.dispatch({ type: 'seekStart', direction: -1, key: event.key }),
      onLongPressEnd: () => this.dispatch({ type: 'seekEnd' }),
    })

    for (const [key, rate] of Object.entries(this.numberRateMap)) {
      this.tapHold.on(key, {
        onTap: () => this.dispatch({ type: 'setRate', rate }),
        onLongPressStart: event => this.dispatch({ type: 'boostStart', rate, key: event.key }),
        onLongPressEnd: () => this.dispatch({ type: 'boostEnd' }),
      })
    }

    this.boundBlur = () => this.handleBlur()
    this.boundVisibility = () => {
      if (document.hidden) this.handleBlur()
    }
    this.onMessage = e => this.handleMessage(e)

    window.addEventListener('blur', this.boundBlur)
    document.addEventListener('visibilitychange', this.boundVisibility)
    // 仅当本实例处于 iframe 内时才监听命令：顶级文档不会收到父级下发，无需该监听
    if (this.isFramed) window.addEventListener('message', this.onMessage)

    this.tapHold.start()
  }

  private handleKeydown(event: KeyboardEvent): boolean | void {
    if (!this.trackedKeys.has(event.key)) return false

    // 输入框激活时不处理任何快捷键
    if (isInputActive()) return false

    // 首次按下时刷新本地视频引用（已连接则保留，否则重查；长按激活期不覆盖受保护引用）
    if (!event.repeat) {
      this.resolveLocalVideo()
    }
    // [当前文档] 有视频则阻止网站自身行为，不检测 iframe 避免误伤
    if (this.video) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
    }

    // 长按激活期间锁住"其它按键"，避免倍速/连退互相干扰
    if (this.activeKey && event.key !== this.activeKey) return false
  }

  private handleKeyup(event: KeyboardEvent) {
    if (!this.trackedKeys.has(event.key)) return
    if (this.video) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
    }
  }

  /** 在本地文档中查找最优视频并缓存到 this.video（仅在非激活态刷新，避免覆盖长按保护中的引用） */
  private resolveLocalVideo() {
    if (this.activeKey) return
    if (this.video && this.video.isConnected) return
    this.video = findBestVideoElement()
  }

  /**
   * 统一命令入口（顶层与各级 iframe 实例共用）：
   * - 本实例文档能找到视频 → 本地执行；
   * - 找不到 → 向下 relay 给直接子 iframe，由子实例重复本逻辑（自然穿透任意嵌套深度）。
   * 本地视频引用由 resolveLocalVideo 统一查找，此处不再重复查询。
   */
  private dispatch(cmd: Command) {
    if (this.video) {
      this.applyCommand(cmd)
    } else {
      this.relay(cmd)
    }
  }

  /** 在本实例文档内执行命令 */
  private applyCommand(cmd: Command) {
    switch (cmd.type) {
      case 'setRate':
        this.setRate(cmd.rate)
        break
      case 'seek':
        this.seek(cmd.direction)
        break
      case 'boostStart':
        this.startBoost(cmd.rate, cmd.key)
        break
      case 'boostEnd':
        this.endBoost()
        break
      case 'seekStart':
        this.startContinuousSeek(cmd.direction, cmd.key)
        break
      case 'seekEnd':
        this.stopContinuousSeek()
        break
      case 'cancel':
        this.cancelActive()
        break
    }
  }

  /** 把命令转发给所有直接子 iframe（执行或继续向下 relay 由子实例决定） */
  private relay(cmd: Command) {
    const msg: CommandMessage = { __pbCmd: true, cmd }
    $$('iframe').forEach(iframe => {
      iframe.contentWindow?.postMessage(msg, '*')
    })
  }

  /** 点按：前进 / 后退一次 */
  private seek(direction: 1 | -1) {
    const { video } = this
    if (video) {
      const step = this.getSeekStep(video)
      video.currentTime += direction * step
      warn(`seek ${step}s`)
    }
    this.video = null
  }

  /**
   * 计算点按 seek 步长
   *
   * 默认 5s；视频时长较短时按"至少能跳 10 次"缩放（时长 / 10），
   * 下限 0.5s，避免短视频跳一次就结束。直播流（duration 为 Infinity/NaN）用默认值。
   */
  private getSeekStep(video: HTMLVideoElement): number {
    const { duration } = video
    if (!Number.isFinite(duration)) return this.seekStep

    const rawStep = duration / 10
    const roundedStep = Math.round(rawStep * 10) / 10
    return Math.max(0.5, Math.min(this.seekStep, roundedStep))
  }

  /** 长按连退：单次 seek（不释放视频引用） */
  private seekBy(direction: 1 | -1, step: number) {
    if (this.video) {
      this.video.currentTime += direction * step
    }
  }

  /** 点按数字键：永久设置倍速 */
  private setRate(rate: number) {
    const { video } = this
    if (video) {
      video.playbackRate = rate
      warn(`rate ${rate}x`)
    }
    this.video = null
  }

  /** 长按开始：临时倍速，保存按下前速度 */
  private startBoost(rate: number, key: string) {
    const { video } = this
    if (!video) return

    this.savedRate = video.playbackRate
    this.activeKey = key
    this.activeMode = 'boost'
    video.playbackRate = rate
    warn(`boost ${rate}x`)
  }

  /** 长按结束：恢复按下前速度 */
  private endBoost() {
    if (this.activeKey && this.video) {
      this.video.playbackRate = this.savedRate
      warn('恢复播放速度')
    }
    this.activeKey = null
    this.activeMode = null
    this.video = null
  }

  /** 长按连退开始：立即后退一次，随后持续后退 */
  private startContinuousSeek(direction: 1 | -1, key: string) {
    const { video } = this
    if (!video) return

    this.activeKey = key
    this.activeMode = 'seek'
    this.seekBy(direction, this.continuousSeekStep)
    this.seekTimer = window.setInterval(() => {
      this.seekBy(direction, this.continuousSeekStep)
    }, this.continuousSeekInterval)
  }

  /** 长按连退结束：停止定时器 */
  private stopContinuousSeek() {
    if (this.seekTimer !== null) {
      clearInterval(this.seekTimer)
      this.seekTimer = null
    }
    this.activeKey = null
    this.activeMode = null
    this.video = null
  }

  /**
   * 复位所有激活态：恢复速率、停止连退、清空视频引用（用于失焦 / 切后台等中断场景）。
   * 同时向下 relay 取消指令，确保深层 iframe 实例一并复位。
   */
  private cancelActive() {
    if (this.seekTimer !== null) {
      clearInterval(this.seekTimer)
      this.seekTimer = null
    }
    // 长按倍速（非连退）需恢复按下前的速率；连退不改变速率，无需处理
    if (this.activeKey && this.activeMode === 'boost' && this.video) {
      this.video.playbackRate = this.savedRate
    }
    this.activeKey = null
    this.activeMode = null
    this.video = null
  }

  /** 失焦 / 切后台：复位本地并广播取消指令给子 iframe */
  private handleBlur() {
    this.cancelActive()
    this.relay({ type: 'cancel' })
  }

  /** 只接受来自直接父级（window.parent）的命令，避免任意来源驱动 */
  private handleMessage(e: MessageEvent) {
    if (e.source !== window.parent) return
    if (!isCommandMessage(e.data)) return

    const { cmd } = e.data
    if (cmd.type === 'cancel') {
      this.cancelActive()
      this.relay(cmd) // 继续向下传播
      return
    }
    this.resolveLocalVideo()
    this.dispatch(cmd)
  }

  destroy() {
    window.removeEventListener('blur', this.boundBlur)
    document.removeEventListener('visibilitychange', this.boundVisibility)
    if (this.isFramed) window.removeEventListener('message', this.onMessage)
    this.tapHold.destroy()
    if (this.seekTimer !== null) {
      clearInterval(this.seekTimer)
      this.seekTimer = null
    }
  }
})()
