import { $ } from '@/utils/selector'

export default function speed() {
  longPress('KeyS', () => {
    const video = ($('#bilibili-player video') || $('#bilibili-player bwp-video')) as HTMLVideoElement
    const oldPlaybackRate = video.playbackRate
    video.playbackRate = 6

    window.addEventListener('keyup', () => {
      video.playbackRate = oldPlaybackRate
    }, { once: true })
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

  window.addEventListener('keypress', event => {
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

    window.addEventListener('keyup', () => {
      clearTimeout(timeoutID)
      timeoutID = undefined
    }, { once: true })
  })
}
