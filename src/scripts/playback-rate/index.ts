import { createMultiPress, type MultiPressEvent } from './multi-press'
import { findBestVideoElement, isInputActive } from './utils'
import { warn } from '@/utils/log'

// 由于 sohu 阻止了键盘事件，需要在捕获阶段监听

new (class PlaybackRateController {
  /** 触发按键 */
  private triggerKeys = ['ArrowLeft', 'ArrowRight']
  /** 按键次数 -> 倍速 映射 */
  private rateMap = {
    1: 3,
    2: 6,
    3: 9,
  }

  private currentTriggerKey: KeyboardEvent['key'] | null = null

  private videoPlaybackRate = 1
  /** 是否正在倍速播放 */
  private isBoosting = false

  private multiPress

  /** 当前视频元素 */
  private _video: HTMLVideoElement | null = null

  /** 当前视频元素 */
  private get video(): HTMLVideoElement | null {
    return this._video
  }

  private set video(video: HTMLVideoElement | null) {
    // 处于倍速时不能置空视频元素，否则播放速度无法恢复
    if (this.isBoosting && video === null) {
      return
    }

    this._video = video
  }

  /**
   * 判断当前是否处于输入状态，
   * 如果是，不处理任何快捷键。避免冲突，比如输入状态下按方向键。
   */
  private isInputActive = false

  constructor() {
    this.multiPress = createMultiPress({
      pressInterval: 100,
      longPressThreshold: 200,
      enableRepeat: true,
      onKeydown: event => {
        /**
         * 按下方向键时如果有视频元素，则阻止网站本身行为
         */
        if (!this.triggerKeys.includes(event.key)) return

        // 只在首次按下时获取状态，重复按下时不再获取避免影响性能
        if (event.repeat === false) {
          if ((this.isInputActive = isInputActive())) return

          this.video ??= findBestVideoElement()
        }

        if (this.isInputActive) return

        if (this.video) {
          event.stopPropagation()
          event.stopImmediatePropagation()
          event.preventDefault()
        }

        // ← ArrowLeft
        // 这里无多击判断延迟
        if (event.key === 'ArrowLeft') {
          this.handleSeek('backward')
        }
      },
      onKeyup: event => {
        // 松开方向键时如果有视频元素，则阻止网站本身行为
        // 虽然 keyup 不一定需要停止传播，但为了逻辑一致性避免页面响应 keyup
        if (this.triggerKeys.includes(event.key) && this.video) {
          event.stopPropagation()
          event.stopImmediatePropagation()
          event.preventDefault()
        }

        this.handleKeyUp(event)
      },
    })

    this.init()
  }

  private init() {
    // → ArrowRight
    for (const pressCount of Object.keys(this.rateMap)) {
      this.multiPress.on('ArrowRight', Number(pressCount), event => {
        if (event.isRepeat || this.isInputActive) return

        if (event.isLongPress) {
          this.handleSpeed(event)
        } else {
          this.handleSeek('forward')
        }
      })
    }

    this.multiPress.start()
  }

  private handleSpeed(event: MultiPressEvent) {
    warn('speed')
    if (this.isBoosting || !event.isLongPress) return

    const { video } = this

    if (!video) return

    this.isBoosting = true
    this.currentTriggerKey = event.key
    this.videoPlaybackRate = video.playbackRate

    video.playbackRate = this.rateMap[event.pressCount as keyof typeof this.rateMap] ?? this.videoPlaybackRate
  }

  private handleKeyUp(event: KeyboardEvent) {
    if (this.isBoosting && event.key === this.currentTriggerKey) {
      warn('恢复播放速度')
      this.video!.playbackRate = this.videoPlaybackRate
      this.isBoosting = false
      this.currentTriggerKey = null
      this.video = null
    }
  }

  /** 前进或后退 */
  private handleSeek(direction: 'forward' | 'backward' = 'forward') {
    warn('seek')
    const { video } = this

    if (video) {
      video.currentTime += direction === 'forward' ? 5 : -5
    }

    this.video = null
  }

  destroy() {
    this.multiPress.stop()
  }
})()
