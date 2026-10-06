import styles from './style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const articlePage: PageDefinition = {
  id: 'article',
  name: '专栏文章',
  pathPattern: /^\/read\/cv/,
  widthPolicy: {
    viewportRatio: 0.83,
    maxWidth: 1160,
  },
  styles: [styles],
  activate(context) {
    context.waitFor('#article-content').then(element => {
      if (!(element instanceof HTMLElement) || context.signal.aborted) return

      const applyOriginalImages = () => {
        element.querySelectorAll<HTMLImageElement>('img[data-type="preview"][data-src]').forEach(image => {
          const source = image.dataset.src
          if (!source) return
          const original = source.replace(/@[0-9a-z]+_[0-9a-z]+_/i, '@')
          if (original !== source) image.dataset.src = original
        })
      }

      applyOriginalImages()
      const observer = new MutationObserver(applyOriginalImages)
      observer.observe(element, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-src'] })
      context.onBeforeDispose(() => observer.disconnect())
    })
  },
}
