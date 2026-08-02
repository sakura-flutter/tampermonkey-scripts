import { TapHold } from './tap-hold'
import { findBestVideoElement, isInputActive } from './utils'
import { warn } from '@/utils/log'

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
  /** 当前长按激活的按键（倍速或连退），null 表示未激活 */
  private activeKey: string | null = null
  /** 长按连退定时器 */
  private seekTimer: number | null = null

  private _video: HTMLVideoElement | null = null
  private get video() {
    return this._video
  }
  private set video(video: HTMLVideoElement | null) {
    // 长按激活期间不能置空，否则倍速无法恢复 / 连退中断
    if (this.activeKey && video === null) return
    this._video = video
  }

  private tapHold: TapHold

  constructor() {
    this.tapHold = new TapHold({
      longPressThreshold: 300,
      capture: true,
      onKeydown: event => this.handleKeydown(event),
      onKeyup: event => this.handleKeyup(event),
    })

    this.tapHold.on('ArrowRight', {
      onTap: () => this.seek(1),
      onLongPressStart: event => this.startBoost(event, this.arrowRightBoostRate),
      onLongPressEnd: () => this.endBoost(),
    })

    this.tapHold.on('ArrowLeft', {
      onTap: () => this.seek(-1),
      onLongPressStart: () => this.startContinuousSeek(-1),
      onLongPressEnd: () => this.stopContinuousSeek(),
    })

    for (const [key, rate] of Object.entries(this.numberRateMap)) {
      this.tapHold.on(key, {
        onTap: () => this.setRate(rate),
        onLongPressStart: event => this.startBoost(event, rate),
        onLongPressEnd: () => this.endBoost(),
      })
    }

    this.tapHold.start()
  }

  private handleKeydown(event: KeyboardEvent): boolean | void {
    if (!this.trackedKeys.has(event.key)) return

    // 输入框激活时不处理任何快捷键
    if (isInputActive()) return false

    // 首次按下时查找视频元素
    if (!event.repeat) {
      this.video ??= findBestVideoElement()
    }

    // 有视频则阻止网站自身行为
    if (this.video) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      event.preventDefault()
    }

    // 长按激活期间锁住其他键，避免速率/seek 互相干扰
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

  /** 点按：前进 / 后退一次（结束后释放视频引用） */
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
  private startBoost(event: KeyboardEvent, rate: number) {
    const { video } = this
    if (!video) return

    this.savedRate = video.playbackRate
    this.activeKey = event.key
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
    this.video = null
  }

  /** 长按连退开始：立即后退一次，随后持续后退 */
  private startContinuousSeek(direction: 1 | -1) {
    const { video } = this
    if (!video) return

    this.activeKey = 'ArrowLeft'
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
    this.video = null
  }

  destroy() {
    this.tapHold.destroy()
    if (this.seekTimer !== null) {
      clearInterval(this.seekTimer)
      this.seekTimer = null
    }
  }
})()
