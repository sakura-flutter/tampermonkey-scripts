import styles from './style.lazy.scss'
import { activateMochaGift } from '../../../t-bilibili-com/mocha'
import type { PageDefinition } from '../../../../core/types'

/** 移除尺寸转换并保留哔哩哔哩图片的输出格式。 */
function getOriginalImageUrl(source: string) {
  const pathEnd = source.search(/[?#]/)
  const end = pathEnd === -1 ? source.length : pathEnd
  const at = source.lastIndexOf('@', end)
  if (at === -1) return source

  const format = source.slice(at + 1, end).match(/\.([a-z0-9]+)$/i)?.[1]
  return format ? `${source.slice(0, at)}@.${format}${source.slice(end)}` : `${source.slice(0, at)}${source.slice(end)}`
}

export const opusPage: PageDefinition = {
  id: 'opus',
  name: '动态详情',
  pathPattern: '/opus/:id',
  widthPolicy: {
    viewportRatio: 0.75,
    maxWidth: 1039,
  },
  styles: [styles],
  activate(context) {
    activateMochaGift(context, 'opus')
    dispatchEvent(new Event('resize'))

    context.waitFor('.opus-detail').then(element => {
      if (!(element instanceof HTMLElement) || context.signal.aborted) return

      const applyOriginalImages = () => {
        element.querySelectorAll<HTMLImageElement>('.opus-para-pic img').forEach(image => {
          image
            .closest('picture')
            ?.querySelectorAll('source')
            .forEach(source => source.remove())
          image.removeAttribute('srcset')

          const source = image.getAttribute('src')
          if (!source) return

          const original = getOriginalImageUrl(source)
          if (original !== source) image.setAttribute('src', original)
        })
      }

      applyOriginalImages()
      const observer = new MutationObserver(applyOriginalImages)
      observer.observe(element, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'srcset'],
      })

      context.onBeforeDispose(() => observer.disconnect())

      context.onAfterDispose(() => {
        dispatchEvent(new Event('resize'))
      })
    })
  },
}
