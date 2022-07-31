import { $$ } from '@/utils/selector'
import * as readyState from '@/utils/ready-state'
import styles from './index.lazy.scss'
import type { Site } from '../../types'

export const bilibili:Site['use'] = ({ store, createControl }) => ({
  handler() {
    function execute() {
      /* 替换为原图 */
      // 稍微延时，待哔哩哔哩处理图片
      readyState.DOMContentLoaded(() => {
        ($$('#article-content .img-box img[data-type="preview"][data-src]') as NodeListOf<HTMLImageElement>).forEach(img => {
          const { src } = img.dataset
          const original = src!.replace(/@[0-9a-z]+_[0-9a-z]+_/i, '@')
          img.dataset.src = original
        })
      })

      styles.use()
    }

    createControl({ store, execute })
  },
})
