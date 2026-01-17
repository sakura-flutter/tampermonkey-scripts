import { findBestVideoElement } from '@/scripts/playback-rate/utils'

export default function speed() {
  longPress('KeyS', () => {
    const video = findBestVideoElement()

    if (!video) return

    const oldPlaybackRate = video.playbackRate
    video.playbackRate = 6

    window.addEventListener(
      'keyup',
      () => {
        video.playbackRate = oldPlaybackRate
      },
      { once: true },
    )
  })
}

/**
 * 长按键盘
 * @param code keyCode
 * @param callback
 * @param duration 长按时间
 */
function longPress(code: string, callback: () => void, duration = 350) {
  let timeoutID: NodeJS.Timeout | undefined

  window.addEventListener('keydown', event => {
    if (event.code === code && timeoutID) return

    if (event.code !== code) {
      if (timeoutID) {
        clearTimeout(timeoutID)
        timeoutID = undefined
      }
      return
    }

    timeoutID = setTimeout(() => {
      callback()
    }, duration)

    window.addEventListener(
      'keyup',
      () => {
        clearTimeout(timeoutID)
        timeoutID = undefined
      },
      { once: true },
    )
  })
}
