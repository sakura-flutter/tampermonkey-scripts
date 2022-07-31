import { $, $$ } from '@/utils/selector'
import * as readyState from '@/utils/ready-state'
import styles from './p.lazy.scss'
import type { Site } from '../../types'

export const tieba:Site['use'] = ({ store, createControl }) => ({
  handler() {
    const postlistSelector = '#j_p_postlist'

    function execute() {
      const replaceOriSrc = (function() {
        const process = new WeakSet()

        return function() {
          const BDEImgEls = $$(`${postlistSelector} .BDE_Image`) as NodeListOf<HTMLImageElement>
          BDEImgEls.forEach(img => {
            if (process.has(img)) return
            process.add(img)
            // 贴吧自身根据
            // /^http:\/\/[^\/\?]*?\.baidu\.com[:8082]*\/(\w+)\/([^\/\?]+)\/([^\/\?]+)\/(\w+?)\.(?:webp|jpg|jpeg)/ 判断是否相册，
            // 后续chrome更改必须为https访问时可能需要更改这里的逻辑
            // eslint-disable-next-line no-useless-escape
            if (/^http(s?):\/\/[^\/\?]*?\.baidu\.com[:8082]*\/(\w+)\/([^\/\?]+)\/([^\/\?]+)\/(\w+?)\.(?:webp|jpg|jpeg)/.test(img.src)) {
              const protocol = img.src.match(/^(https?:\/\/)/)![0]
              img.src = `${protocol}tiebapic.baidu.com/forum/pic/item/${img.src.split('/').slice(-1)[0]}`
              // 不能直接用css：贴吧根据宽高判断,用css宽高auto时若图片未加载宽高获取到0 导致无法查看大图
              img.style.cssText += 'max-width: 100%; width: auto !important; height: auto; max-height: 130vh;'
            }
          })
        }
      })()

      readyState.interactive(() => {
        // 替换原图
        replaceOriSrc()
        const observer = new MutationObserver(mutationsList => {
          mutationsList.forEach(mutation => {
            const { target } = mutation
            if ((target as HTMLElement).id !== postlistSelector.slice(1)) return
            replaceOriSrc()
          })
        })
        observer.observe($('.left_section') as HTMLElement, { childList: true, subtree: true })
      })

      styles.use()
    }

    createControl({ store, execute })
  },
})
