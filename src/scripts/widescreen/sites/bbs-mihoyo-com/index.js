import { $$ } from '@/utils/selector'
import { onVisible } from '@/utils/visibility-state'
import styles from './index.lazy.scss'

export const mihoyoBBS = ({ store, createControl }) => ({
  handler() {
    function replaceImgURL() {
      onVisible(() => {
        // 文章中的图片原图显示
        $$('.mhy-article-page__content .ql-image-box img:not([replaced=true])').forEach(img => {
          const original = img.getAttribute('large')
          if (!original) return

          img.src = original
          img.setAttribute('replaced', 'true') // 标记
        })
      })
    }

    createControl({
      store,
      execute() {
        replaceImgURL()
        styles.use()
      },
    })
  },
})
