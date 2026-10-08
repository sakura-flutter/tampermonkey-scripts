import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { isFunction, once, sleep, throttle } from '../base'

describe('基础工具函数', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('将连续调用合并为最后一次参数，并保留 this 指向', () => {
    const calls: Array<{ value: string; receiver: string }> = []
    const fn = function (this: { name: string }, value: string) {
      calls.push({ value, receiver: this.name })
    }
    const throttled = throttle(fn, 100)
    const receiver = { name: 'receiver' }

    throttled.call(receiver, 'first')
    throttled.call(receiver, 'latest')

    expect(calls).toEqual([])
    vi.advanceTimersByTime(100)
    expect(calls).toEqual([{ value: 'latest', receiver: 'receiver' }])

    throttled.call(receiver, 'immediate')
    expect(calls).toEqual([
      { value: 'latest', receiver: 'receiver' },
      { value: 'immediate', receiver: 'receiver' },
    ])
  })

  it('只使用第一次调用的上下文和参数执行函数', () => {
    const fn = vi.fn(function (this: { value: number }, amount: number) {
      return this.value + amount
    })
    const wrapped = once(fn)
    const receiver = { value: 2 }

    wrapped.call(receiver, 3)
    wrapped.call({ value: 10 }, 20)

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(3)
    expect(fn.mock.instances[0]).toBe(receiver)
  })

  it('节流尾调用执行后重新开始计时', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)

    throttled('first')
    vi.advanceTimersByTime(50)
    throttled('latest')
    vi.advanceTimersByTime(99)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledWith('latest')

    throttled('after-trailing')
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('once 在原函数抛错后也不会再次执行', () => {
    const error = new Error('failed')
    const fn = vi.fn(() => {
      throw error
    })
    const wrapped = once(fn)

    expect(() => wrapped()).toThrow(error)
    expect(() => wrapped()).not.toThrow()
    expect(fn).toHaveBeenCalledOnce()
  })

  it('在指定延迟后完成 sleep', async () => {
    let resolved = false
    const pending = sleep(50).then(() => {
      resolved = true
    })

    vi.advanceTimersByTime(49)
    await Promise.resolve()
    expect(resolved).toBe(false)

    vi.advanceTimersByTime(1)
    await pending
    expect(resolved).toBe(true)
  })

  it('正确识别函数值', () => {
    expect(isFunction(() => undefined)).toBe(true)
    expect(isFunction(class Example {})).toBe(true)
    expect(isFunction(null)).toBe(false)
    expect(isFunction({})).toBe(false)
    expect(isFunction('function')).toBe(false)
  })
})
