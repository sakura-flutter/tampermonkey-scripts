import { afterEach, describe, expect, it, vi } from 'vite-plus/test'
import { onVisible } from '../visibility-state'

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

describe('onVisible', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('可见时立即执行，并在可见性变化后重启 interval', () => {
    const documentEvents = createEventTarget()
    const intervals = new Map<number, () => void>()
    let nextIntervalId = 1
    const setIntervalMock = vi.fn((callback: (...args: unknown[]) => void, _delay: number, ...args: unknown[]) => {
      const id = nextIntervalId++
      intervals.set(id, () => callback(...args))
      return id
    })
    const clearIntervalMock = vi.fn((id: number) => {
      intervals.delete(id)
    })
    const documentStub = {
      visibilityState: 'visible' as DocumentVisibilityState,
      addEventListener: documentEvents.addEventListener,
      removeEventListener: documentEvents.removeEventListener,
    }
    vi.stubGlobal('document', documentStub)
    vi.stubGlobal('window', {
      setInterval: setIntervalMock,
      clearInterval: clearIntervalMock,
    })
    const callback = vi.fn()

    const stop = onVisible(callback, 250, 'argument')
    expect(callback).toHaveBeenCalledWith('argument')
    expect(setIntervalMock).toHaveBeenCalledWith(callback, 250, 'argument')
    const firstIntervalId = setIntervalMock.mock.results[0].value

    documentStub.visibilityState = 'hidden'
    documentEvents.dispatch('visibilitychange')
    expect(clearIntervalMock).toHaveBeenCalledWith(firstIntervalId)
    expect(callback).toHaveBeenCalledOnce()

    documentStub.visibilityState = 'visible'
    documentEvents.dispatch('visibilitychange')
    expect(callback).toHaveBeenCalledTimes(2)
    expect(setIntervalMock).toHaveBeenCalledTimes(2)

    stop()
    expect(clearIntervalMock).toHaveBeenCalledTimes(3)
    expect(documentEvents.removeEventListener).toHaveBeenCalledWith('visibilitychange', expect.any(Function))
  })

  it('初始隐藏时等待变为可见后再执行', () => {
    const documentEvents = createEventTarget()
    const setIntervalMock = vi.fn(() => 1)
    const clearIntervalMock = vi.fn()
    const documentStub = {
      visibilityState: 'hidden' as DocumentVisibilityState,
      addEventListener: documentEvents.addEventListener,
      removeEventListener: documentEvents.removeEventListener,
    }
    vi.stubGlobal('document', documentStub)
    vi.stubGlobal('window', { setInterval: setIntervalMock, clearInterval: clearIntervalMock })
    const callback = vi.fn()
    const stop = onVisible(callback)

    expect(callback).not.toHaveBeenCalled()
    expect(setIntervalMock).not.toHaveBeenCalled()

    documentStub.visibilityState = 'visible'
    documentEvents.dispatch('visibilitychange')
    expect(callback).toHaveBeenCalledOnce()
    stop()
  })

  it('隐藏时停止 interval，abort 后不再响应可见性变化', () => {
    const documentEvents = createEventTarget()
    const setIntervalMock = vi.fn(() => 1)
    const clearIntervalMock = vi.fn()
    const documentStub = {
      visibilityState: 'visible' as DocumentVisibilityState,
      addEventListener: documentEvents.addEventListener,
      removeEventListener: documentEvents.removeEventListener,
    }
    vi.stubGlobal('document', documentStub)
    vi.stubGlobal('window', { setInterval: setIntervalMock, clearInterval: clearIntervalMock })
    const callback = vi.fn()
    const stop = onVisible(callback)

    documentStub.visibilityState = 'hidden'
    documentEvents.dispatch('visibilitychange')
    expect(clearIntervalMock).toHaveBeenCalledWith(1)

    stop()
    documentStub.visibilityState = 'visible'
    documentEvents.dispatch('visibilitychange')
    expect(callback).toHaveBeenCalledOnce()
    expect(setIntervalMock).toHaveBeenCalledOnce()
  })
})
