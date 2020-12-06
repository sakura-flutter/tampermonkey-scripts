/*
  引用：https://github.com/youzan/vant/blob/dev/src/utils/mount-component.ts
*/

import { createApp } from 'vue'

export function mountComponent(RootComponent) {
  const app = createApp(RootComponent)
  const root = document.createElement('div')

  document.body.appendChild(root)

  return {
    instance: app.mount(root),
    unmount() {
      app.unmount(root)
      document.body.removeChild(root)
    },
  }
}
