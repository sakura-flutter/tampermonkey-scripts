/** 等待元素出现，并在生命周期取消时结束等待 */
export function waitForElement(selector: string, signal?: AbortSignal): Promise<Element | null> {
  const current = document.querySelector(selector)
  if (current) return Promise.resolve(current)
  if (signal?.aborted) return Promise.resolve(null)

  return new Promise(resolve => {
    const root = document.documentElement
    if (!root) {
      const retry = () => {
        signal?.removeEventListener('abort', abort)
        waitForElement(selector, signal).then(resolve)
      }
      const abort = () => {
        document.removeEventListener('DOMContentLoaded', retry)
        resolve(null)
      }

      document.addEventListener('DOMContentLoaded', retry, { once: true })
      signal?.addEventListener('abort', abort, { once: true })
      return
    }

    let settled = false
    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector)
      if (element) finish(element)
    })

    const abort = () => finish(null)

    /** 结束观察并返回找到的元素或空值 */
    function finish(element: Element | null) {
      if (settled) return
      settled = true
      observer.disconnect()
      signal?.removeEventListener('abort', abort)
      resolve(element)
    }

    observer.observe(root, { childList: true, subtree: true })
    signal?.addEventListener('abort', abort, { once: true })
  })
}
