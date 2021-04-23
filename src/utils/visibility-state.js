// 页面 visible 时执行 setInterval
// 参数同 setInterval，返回终止函数
export function onVisible(callback, delay = 500, ...rest) {
  let intervalId
  function listener() {
    clearInterval(intervalId)
    if (document.visibilityState === 'hidden') return
    // eslint-disable-next-line node/no-callback-literal
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
