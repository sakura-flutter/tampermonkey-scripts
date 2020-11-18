/**
 * 在tampermonkey中，DOMContentLoaded监听后会被缓存，总是会执行
 * readyState的值会因为脚本加载时间多数被抛弃没有版本被监听到
 *
 * 基于上面原因，pool中的状态区分先后顺序
 * 靠后定义的会自动将靠前定义的但没有监听到的执行一次，但实际上不再是原来的状态
 */

const pool = new Map([
  ['loading', []],
  ['interactive', []],
  ['DOMContentLoaded', []], // 扩展状态
  ['complete', []],
  ['load', []], // 扩展状态
])

const execute = readyState => {
  for (const [state, functions] of pool) {
    while (functions.length) {
      functions.shift()()
    }
    if (readyState === state) break
  }
}

execute(document.readyState)
document.readyState !== 'complete' && document.addEventListener('readystatechange', () => execute(document.readyState))
window.addEventListener('DOMContentLoaded', () => {
  // 确认tampermonkey中脚本真正加载状态
  execute(document.readyState === 'complete' ? 'complete' : 'DOMContentLoaded')
})
window.addEventListener('load', () => execute('load'))

const wrapper = (readyState, fn) => new Promise(resolve => {
  pool.get(readyState).push(function() {
    resolve(fn?.())
  })
})

export const loading = fn => wrapper('loading', fn)
export const interactive = fn => wrapper('interactive', fn)
export const DOMContentLoaded = fn => wrapper('DOMContentLoaded', fn)
export const complete = fn => wrapper('complete', fn)
export const load = fn => wrapper('load', fn)
