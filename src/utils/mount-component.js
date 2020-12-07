/*
  引用：https://github.com/youzan/vant/blob/dev/src/utils/mount-component.ts
*/

import { createApp } from 'vue'

function append(el) {
  document.body
    ? document.body.appendChild(el)
    : window.addEventListener('DOMContentLoaded', () => append(el))
}

export function mountComponent(RootComponent) {
  const app = createApp(RootComponent)
  const root = document.createElement('div')

  append(root)

  return {
    instance: app.mount(root),
    unmount() {
      app.unmount(root)
      document.body.removeChild(root)
    },
  }
}
