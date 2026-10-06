import { log } from '@monkey/shared/utils'

/** 管理页面或站点资源的生命周期清理 */
export class LifecycleScope {
  /** 作用域销毁前的清理队列 */
  #beforeDisposers: Array<() => void> = []
  /** 作用域销毁后的回调队列 */
  #afterDisposers: Array<() => void> = []
  /** 控制异步任务取消的控制器 */
  #controller = new AbortController()
  /** 当前作用域状态 */
  #state: 'active' | 'disposing' | 'disposed' = 'active'

  /** 获取用于取消异步任务的信号 */
  get signal() {
    return this.#controller.signal
  }

  /** 注册在作用域销毁前执行的清理函数 */
  onBeforeDispose(disposer: () => void) {
    if (this.#state !== 'active') {
      disposer()
      return
    }

    this.#beforeDisposers.push(disposer)
  }

  /** 注册在作用域销毁及其资源清理完成后执行的回调 */
  onAfterDispose(disposer: () => void) {
    if (this.#state === 'disposed') {
      disposer()
      return
    }

    this.#afterDisposers.push(disposer)
  }

  /** 取消作用域，依次执行销毁前和销毁后的回调 */
  dispose() {
    if (this.#state !== 'active') return

    this.#state = 'disposing'
    this.#controller.abort()

    this.#run(this.#beforeDisposers)
    this.#state = 'disposed'
    this.#run(this.#afterDisposers)

    this.#beforeDisposers = []
    this.#afterDisposers = []
  }

  #run(disposers: Array<() => void>) {
    for (const disposer of disposers.reverse()) {
      try {
        disposer()
      } catch (error) {
        log.error.force('[widescreen] cleanup failed', error)
      }
    }
  }
}
