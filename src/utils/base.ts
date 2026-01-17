export function throttle<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timeoutId: NodeJS.Timeout
  let begin = Date.now()

  return function (this: any, ...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    const cur = Date.now()

    clearTimeout(timeoutId)

    if (cur - begin >= delay) {
      fn.apply(self, args)
      begin = cur
    } else {
      timeoutId = setTimeout(function () {
        fn.apply(self, args)
      }, delay)
    }
  } as any
}

export function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false
  return function (this: any, ...args: any[]) {
    if (!called) {
      called = true
      fn.apply(this, args)
    }
  } as any
}

/**
 * 延时
 * @param ms 毫秒数
 */
export const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function'
}
