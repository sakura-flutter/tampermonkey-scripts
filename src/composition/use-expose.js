/*
  引用：https://github.com/youzan/vant/blob/dev/src/composables/use-expose.ts
*/

import { getCurrentInstance } from 'vue'

// expose public api
export function useExpose(apis) {
  const instance = getCurrentInstance()
  if (instance) {
    Object.assign(instance.proxy, apis)
  }
}
