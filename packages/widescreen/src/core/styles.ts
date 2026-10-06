import type { StyleResource } from './types'

export interface StyleHandle {
  /** 撤销已挂载的样式资源 */
  dispose(): void
}

/** 统一挂载样式资源并提供生命周期释放句柄 */
export class StyleManager {
  /** 启用样式资源并返回幂等的卸载句柄 */
  mount(resource: StyleResource): StyleHandle {
    resource.use()
    let disposed = false

    return {
      dispose() {
        if (disposed) return
        disposed = true
        resource.unuse()
      },
    }
  }
}
