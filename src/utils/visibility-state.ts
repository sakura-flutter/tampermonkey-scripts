/**
 * 页面 visible 时执行 setInterval
 * 参数同 setInterval，返回终止函数
 */
export function onVisible<TArgs extends any[]>(callback: (...args: TArgs) => void, delay = 500, ...rest: TArgs) {
  let intervalId: NodeJS.Timer
  function listener() {
    clearInterval(intervalId)
    if (document.visibilityState === 'hidden') return
    // eslint-disable-next-line n/no-callback-literal
    callback(...rest)
    intervalId = setInterval(callback, delay, ...rest)
  }

  listener()
  document.addEventListener('visibilitychange', listener)

  return function abort() {
    clearInterval(intervalId)
    document.removeEventListener('visibilitychange', listener)
  }
}
