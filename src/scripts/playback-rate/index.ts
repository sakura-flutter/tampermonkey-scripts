import { createMultiPress, type MultiPressEvent } from './multi-press'
import { findBestVideoElement } from './utils'

// 由于 sohu 阻止了键盘事件，需要在捕获阶段监听

// eslint-disable-next-line no-new
new class PlaybackRateController {
  /** 触发按键 */
  private triggerKeys = ['`', '0']
  /** 按键次数 -> 倍速 映射 */
  private rateMap = {
    1: 3,
    2: 6,
    3: 9,
  }

  /** 是否正在加速播放 */
  private isBoosting = false

  private multiPress = createMultiPress()

  constructor() {
    this.init()
  }

  private init() {
    const changeHandler = this.handleChange.bind(this)

    for (const triggerKey of this.triggerKeys) {
      for (const pressCount of Object.keys(this.rateMap)) {
        this.multiPress.on(triggerKey, Number(pressCount), changeHandler)
      }
    }

    this.multiPress.start()
  }

  private handleChange(event: MultiPressEvent) {
    if (this.isBoosting || !event.isLongPress) return

    const video = findBestVideoElement()

    if (!video) return

    this.isBoosting = true
    const oldPlaybackRate = video.playbackRate
    video.playbackRate = this.rateMap[event.pressCount as keyof typeof this.rateMap] ?? oldPlaybackRate

    const controller = new AbortController()
    window.addEventListener('keyup',
      (keyupEvent) => {
        if (keyupEvent.key === event.key) {
          controller.abort()
          video.playbackRate = oldPlaybackRate
          this.isBoosting = false
        }
      },
      {
        capture: true,
        signal: controller.signal,
      })
  }

  destroy() {
    this.multiPress.stop()
  }
}()
