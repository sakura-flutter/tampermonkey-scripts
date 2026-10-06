import styles from './style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const articlePage: PageDefinition = {
  id: 'article',
  name: '文章',
  pathPattern: /^\/s(?:\/|$)/,
  widthPolicy: {
    viewportRatio: 0.9,
    maxWidth: 1150,
  },
  styles: [styles],
  activate(context) {
    context.waitFor('body').then(element => {
      if (!(element instanceof HTMLElement) || context.signal.aborted) return

      const restoreOriginalImage = () => {
        element.querySelectorAll<HTMLImageElement>('img[data-src]').forEach(image => {
          const dataSrc = image.dataset.src
          if (!dataSrc) return

          try {
            const url = new URL(dataSrc)
            url.pathname = url.pathname.replace('/640', '/')
            if (url.href !== dataSrc) image.dataset.src = url.href
          } catch {
            // Ignore malformed lazy image URLs.
          }
        })
      }

      restoreOriginalImage()
      const observer = new MutationObserver(restoreOriginalImage)
      observer.observe(element, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-src'] })

      context.onBeforeDispose(() => observer.disconnect())
    })
  },
}
