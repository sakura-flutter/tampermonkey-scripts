import { TapHold } from '@/scripts/playback-rate/tap-hold'
import { findBestVideoElement } from '@/scripts/playback-rate/utils'

function speed() {
  let savedRate = 1

  const tapHold = new TapHold()

  tapHold.on('KeyS', {
    onLongPressStart: () => {
      const video = findBestVideoElement()
      if (!video) return
      savedRate = video.playbackRate
      video.playbackRate = 6
    },
    onLongPressEnd: () => {
      const video = findBestVideoElement()
      if (video) video.playbackRate = savedRate
    },
  })

  tapHold.start()
}

speed()
