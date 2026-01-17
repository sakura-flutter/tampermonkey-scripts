import { $$ } from '@/utils/selector'
import * as readyState from '@/utils/ready-state'
import styles from './index.lazy.scss'
import type { Site } from '../../types'

export const banciyuan: Site['use'] = ({ store, createControl }) => ({
  handler() {
    function execute() {
      readyState.interactive(() => {
        // eslint-disable-next-line no-constant-condition
        if ('It should not be enabled') return
        const { multi } = (unsafeWindow as any).__ssr_data.detail.post_data
        const imgEls = $$('.container .album .img-wrap-inner img') as NodeListOf<HTMLImageElement>
        if (multi.length !== imgEls.length) return
        imgEls.forEach((img, index) => {
          img.src = multi[index].original_path
        })
      })

      styles.use()
    }

    createControl({ store, execute })
  },
})
