import styles from './index.lazy.scss'
import type { Site } from '../../types'

export const csdn: Site['use'] = ({ store, createControl }) => ({
  handler() {
    createControl({
      store,
      execute() {
        // 关闭登录弹窗
        document.cookie = `unlogin_scroll_step=${Date.now()};domain=.csdn.net;path=/`

        styles.use()
      },
    })
  },
})
