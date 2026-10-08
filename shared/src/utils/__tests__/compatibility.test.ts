import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

const { toastError } = vi.hoisted(() => ({ toastError: vi.fn() }))

vi.mock('../../components/toast', () => ({
  default: {
    error: toastError,
  },
}))

async function loadChecker(userAgent: string) {
  vi.resetModules()
  vi.stubGlobal('window', { navigator: { userAgent } })
  return (await import('../compatibility')).checker
}

describe('浏览器兼容性检查', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    toastError.mockReset()
  })

  it('通过受支持的浏览器版本检查', async () => {
    const checker = await loadChecker('Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36')

    expect(checker()).toBe(true)
    expect(toastError).not.toHaveBeenCalled()
  })

  it('识别 Firefox、Edge 和 Safari 的 User-Agent 格式', async () => {
    const checker = await loadChecker('Mozilla/5.0 Firefox/120.0')
    expect(checker({ firefox: 120 })).toBe(true)

    vi.unstubAllGlobals()
    const edgeChecker = await loadChecker('Mozilla/5.0 Chrome/80.0 Edg/120.0')
    expect(edgeChecker({ edge: 120 })).toBe(true)

    vi.unstubAllGlobals()
    const safariChecker = await loadChecker('Mozilla/5.0 Version/17.0 Safari/605.1.15')
    expect(safariChecker({ safari: 17 })).toBe(true)
  })

  it('不支持的浏览器默认发送通知，也可以关闭通知', async () => {
    const checker = await loadChecker('Mozilla/5.0 Chrome/79.0.3945.79 Safari/537.36')

    expect(checker()).toBe(false)
    expect(toastError).toHaveBeenCalledWith(expect.stringContaining('Chrome80'), 0)

    toastError.mockClear()
    expect(checker({ notify: false })).toBe(false)
    expect(toastError).not.toHaveBeenCalled()
  })

  it('接受恰好达到最低要求的浏览器版本', async () => {
    const checker = await loadChecker('Mozilla/5.0 Chrome/80.0.3987.0 Safari/537.36')

    expect(checker()).toBe(true)
    expect(toastError).not.toHaveBeenCalled()
  })

  it('没有可识别浏览器版本时返回 false 并通知', async () => {
    const checker = await loadChecker('Mozilla/5.0 CustomBrowser/1.0')

    expect(checker()).toBe(false)
    expect(toastError).toHaveBeenCalledOnce()
  })
})
