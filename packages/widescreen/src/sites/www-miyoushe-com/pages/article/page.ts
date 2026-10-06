import styles from './style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const articlePage: PageDefinition = {
  id: 'article',
  name: '文章',
  pathPattern: /^\/ys\/article\//,
  widthPolicy: {
    viewportRatio: 0.82,
    maxWidth: 1450,
  },
  styles: [styles],
  activate(context) {
    context.waitFor('.mhy-article-page__content').then(element => {
      if (!(element instanceof HTMLElement) || context.signal.aborted) return

      const replaceImages = () => {
        element.querySelectorAll<HTMLImageElement>('.ql-image-box img:not([replaced="true"])').forEach(image => {
          const original = image.getAttribute('large')
          if (!original) return
          image.src = original
          image.setAttribute('replaced', 'true')
        })
      }

      replaceImages()
      const observer = new MutationObserver(replaceImages)
      observer.observe(element, { childList: true, subtree: true, attributes: true, attributeFilter: ['large'] })

      context.onBeforeDispose(() => observer.disconnect())
    })
  },
}
