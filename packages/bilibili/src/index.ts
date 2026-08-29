import { TapHold } from '@monkey/playback-rate/tap-hold'
import { findBestVideoElement } from '@monkey/playback-rate/utils'

function speed() {
  let video: HTMLVideoElement | null = null

  let savedRate = 1

  const tapHold = new TapHold()

  tapHold.on('KeyS', {
    onLongPressStart: () => {
      video = findBestVideoElement()
      if (!video) return
      savedRate = video.playbackRate
      video.playbackRate = 6
    },
    onLongPressEnd: () => {
      if (video) video.playbackRate = savedRate
      video = null
    },
  })

  tapHold.start()
}

speed()
