import { $$ } from '@/utils/selector'
import { interactive } from '@/utils/ready-state'
import styles from './index.lazy.scss'

export const weixin = ({ store, createControl }) => ({
  handler() {
    function execute() {
      interactive(() => {
        // 原图处理
        $$('img').forEach(img => {
          const dataSrc = img.dataset.src
          if (!dataSrc) return

          const url = new URL(dataSrc)
          url.pathname = url.pathname.replace('/640', '/')
          img.dataset.src = url.href
        })
      })

      styles.use()
    }

    createControl({ store, execute })
  },
})
