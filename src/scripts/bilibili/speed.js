import { $ } from '@/utils/selector'

export default function speed() {
  longPress('KeyS', () => {
    const video = $('#bilibili-player video') || $('#bilibili-player bwp-video')
    const oldPlaybackRate = video.playbackRate
    video.playbackRate = 6

    window.addEventListener('keyup', () => {
      video.playbackRate = oldPlaybackRate
    }, { once: true })
  })
}

/**
 * 长按键盘
 * @param {string} code keyCode
 * @param {function} callback
 * @param {number} duration 长按时间
 */
function longPress(code, callback, duration = 350) {
  let timeoutID = null

  window.addEventListener('keypress', event => {
    if (event.code === code && timeoutID) return

    if (event.code !== code) {
      if (timeoutID) {
        clearTimeout(timeoutID)
        timeoutID = null
      }
      return
    }

    timeoutID = setTimeout(() => {
      callback()
    }, duration)

    window.addEventListener('keyup', () => {
      clearTimeout(timeoutID)
      timeoutID = null
    }, { once: true })
  })
}
