/*
  引用：https://github.com/youzan/vant/blob/dev/src/composables/use-expose.ts
*/

import { getCurrentInstance } from 'vue'

/**
 * expose public api
 * @deprecated vue3.2 已经支持
 */
export function useExpose(apis: Record<string, any>) {
  const instance = getCurrentInstance()
  if (instance) {
    Object.assign(instance.proxy!, apis)
  }
}
