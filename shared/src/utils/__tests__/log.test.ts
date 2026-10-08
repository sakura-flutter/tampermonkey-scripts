import { afterEach, describe, expect, it, vi } from 'vite-plus/test'
import { error, table, warn } from '../log'

describe('日志工具函数', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('格式化强制日志后转发到 console', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    warn.force('warning', 1)
    error.force('failure', 2)

    expect(warnSpy).toHaveBeenCalledWith(
      '%c      warn      ',
      'background: #ffa500; padding: 1px; color: #fff;',
      'warning',
      1,
    )
    expect(errorSpy).toHaveBeenCalledWith(
      '%c      error      ',
      'background: red; padding: 1px; color: #fff;',
      'failure',
      2,
    )
  })

  it('提供可直接调用的调试辅助函数', () => {
    expect(() => {
      warn('warning')
      error('failure')
      table([{ value: 1 }])
    }).not.toThrow()
  })
})
