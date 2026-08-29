export type LazyStyle = {
  use: () => void
  unuse: () => void
}

export function createLazyStyle(css: string): LazyStyle {
  let count = 0
  let styleElement: HTMLStyleElement | null = null

  return {
    use() {
      if (count === 0) {
        styleElement = document.createElement('style')
        styleElement.textContent = css
        ;(document.head ?? document.documentElement).appendChild(styleElement)
      }
      count += 1
    },
    unuse() {
      if (count === 0) return

      count -= 1
      if (count === 0 && styleElement) {
        styleElement.remove()
        styleElement = null
      }
    },
  }
}
