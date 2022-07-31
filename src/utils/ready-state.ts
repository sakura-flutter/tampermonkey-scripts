/**
 * readyState 因为脚本加载时机不一定监听到所有变化
 * 所以 pool 中的状态区分先后顺序
 * 靠后定义的会自动将靠前定义的但没有监听到的执行一次，但实际上不再是原来的状态
 */

import { warn } from '@/utils/log'

export type ReadyState = DocumentReadyState | 'DOMContentLoaded' | 'load'
type ListenerFunc = () => void

const pool = new Map<ReadyState, ListenerFunc[]>([
  ['loading', []],
  ['interactive', []],
  ['DOMContentLoaded', []], // 扩展状态
  ['complete', []],
  ['load', []], // 扩展状态，不一定可以监听到
])

let currentState: ReadyState = document.readyState
const execute = (readyState: ReadyState = currentState) => {
  currentState = readyState

  for (const [state, functions] of pool) {
    while (functions.length) {
      functions.shift()!()
    }
    if (readyState === state) break
  }
}

warn('document.readyState', currentState)
execute()
if (document.readyState !== 'complete') {
  document.addEventListener('readystatechange', () => execute(document.readyState))
  window.addEventListener('DOMContentLoaded', () => execute('DOMContentLoaded'))
}
window.addEventListener('load', () => execute('load'))

const wrapper = (readyState: ReadyState, fn?: ListenerFunc): Promise<void> => new Promise(resolve => {
  pool.get(readyState)!.push(function() {
    resolve(fn?.())
  })

  // 边界情况，加载完还有回调添加也执行一下
  ;['complete', 'load'].includes(currentState) && execute()
})

export const loading = (fn?: ListenerFunc) => wrapper('loading', fn)
export const interactive = (fn?: ListenerFunc) => wrapper('interactive', fn)
export const DOMContentLoaded = (fn?: ListenerFunc) => wrapper('DOMContentLoaded', fn)
export const complete = (fn?: ListenerFunc) => wrapper('complete', fn)
export const load = (fn?: ListenerFunc) => wrapper('load', fn)
