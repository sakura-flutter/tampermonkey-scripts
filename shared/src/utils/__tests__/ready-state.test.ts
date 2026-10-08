import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

type EventTargetStub = {
  addEventListener: ReturnType<typeof vi.fn>
  removeEventListener: ReturnType<typeof vi.fn>
  dispatch: (type: string) => void
}

function createEventTarget(): EventTargetStub {
  const listeners = new Map<string, Set<() => void>>()
  const addEventListener = vi.fn((type: string, listener: () => void) => {
    const handlers = listeners.get(type) ?? new Set<() => void>()
    handlers.add(listener)
    listeners.set(type, handlers)
  })
  const removeEventListener = vi.fn((type: string, listener: () => void) => {
    listeners.get(type)?.delete(listener)
  })

  return {
    addEventListener,
    removeEventListener,
    dispatch(type) {
      for (const listener of listeners.get(type) ?? []) listener()
    },
  }
}

async function loadReadyState(initialState: DocumentReadyState) {
  vi.resetModules()
  const documentEvents = createEventTarget()
  const windowEvents = createEventTarget()
  const documentStub = {
    readyState: initialState,
    addEventListener: documentEvents.addEventListener,
    removeEventListener: documentEvents.removeEventListener,
  }
  vi.stubGlobal('document', documentStub)
  vi.stubGlobal('window', {
    addEventListener: windowEvents.addEventListener,
    removeEventListener: windowEvents.removeEventListener,
  })

  return {
    readyState: documentStub,
    documentEvents,
    windowEvents,
    module: await import('../ready-state'),
  }
}

describe('ready-state 工具函数', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('随 document readyState 变化依次执行对应回调', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const context = await loadReadyState('loading')
    const loading = vi.fn()
    const interactive = vi.fn()
    const domContentLoaded = vi.fn()
    const complete = vi.fn()
    const load = vi.fn()

    await context.module.loading(loading)
    expect(loading).toHaveBeenCalledOnce()

    const interactivePromise = context.module.interactive(interactive)
    expect(interactive).not.toHaveBeenCalled()
    context.readyState.readyState = 'interactive'
    context.documentEvents.dispatch('readystatechange')
    await interactivePromise
    expect(interactive).toHaveBeenCalledOnce()

    const domContentLoadedPromise = context.module.DOMContentLoaded(domContentLoaded)
    context.windowEvents.dispatch('DOMContentLoaded')
    await domContentLoadedPromise
    expect(domContentLoaded).toHaveBeenCalledOnce()

    const completePromise = context.module.complete(complete)
    context.readyState.readyState = 'complete'
    context.documentEvents.dispatch('readystatechange')
    await completePromise
    expect(complete).toHaveBeenCalledOnce()

    const loadPromise = context.module.load(load)
    expect(load).not.toHaveBeenCalled()
    context.windowEvents.dispatch('load')
    await loadPromise
    expect(load).toHaveBeenCalledOnce()
  })

  it('document 初始为 complete 时不注册过渡状态监听器', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const context = await loadReadyState('complete')

    expect(context.documentEvents.addEventListener).not.toHaveBeenCalledWith('readystatechange', expect.any(Function))
    expect(context.documentEvents.addEventListener).not.toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function))

    await context.module.complete()
    const loadPromise = context.module.load()
    context.windowEvents.dispatch('load')
    await loadPromise
  })

  it('document 已进入 interactive 时立即补偿 loading 和 interactive 回调', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const context = await loadReadyState('interactive')
    const loading = vi.fn()
    const interactive = vi.fn()

    await context.module.loading(loading)
    await context.module.interactive(interactive)

    expect(loading).toHaveBeenCalledOnce()
    expect(interactive).toHaveBeenCalledOnce()
  })
})
