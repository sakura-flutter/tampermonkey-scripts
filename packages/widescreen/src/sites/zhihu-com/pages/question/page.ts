import { waitForElement } from '../../../../core/dom'
import styles from './style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const questionPage: PageDefinition = {
  id: 'question',
  name: '问题页',
  pathPattern: ['/question/:id', '/question/:id/*'],
  widthPolicy: {
    viewportRatio: 0.8,
    maxWidth: 1400,
  },
  styles: [styles],
  activate(context) {
    dispatchEvent(new Event('resize')) // 触发一次 resize 事件，确保页面布局正确

    waitForElement('.QuestionAnswers-answers', context.signal).then(element => {
      if (!(element instanceof HTMLElement) || context.signal.aborted) return

      const applyOriginalImages = () => {
        element.querySelectorAll<HTMLImageElement>('img[data-original]').forEach(image => {
          const original = image.dataset.original
          if (original && image.src !== original) {
            image.src = original
          }
        })
      }

      applyOriginalImages()
      const observer = new MutationObserver(applyOriginalImages)
      observer.observe(element, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'data-original'],
      })

      context.onBeforeDispose(() => {
        observer.disconnect()
      })

      context.onAfterDispose(() => {
        dispatchEvent(new Event('resize'))
      })
    })
  },
}
