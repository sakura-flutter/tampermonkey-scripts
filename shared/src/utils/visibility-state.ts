/**
 * 页面 visible 时执行 setInterval
 * 参数同 setInterval，返回终止函数
 */
export function onVisible<TArgs extends any[]>(callback: (...args: TArgs) => void, delay = 500, ...rest: TArgs) {
  let intervalId: number | undefined
  function listener() {
    if (intervalId !== undefined) window.clearInterval(intervalId)
    if (document.visibilityState === 'hidden') return

    callback(...rest)
    intervalId = window.setInterval(callback, delay, ...rest)
  }

  listener()
  document.addEventListener('visibilitychange', listener)

  return function abort() {
    if (intervalId !== undefined) window.clearInterval(intervalId)
    document.removeEventListener('visibilitychange', listener)
  }
}
