import { once } from '@/utils'
import styles from './index.lazy.scss'

export const toutiao = ({ store, createControl }) => ({
  handler() {
    const call = once(() => {
      createControl({ store, execute: styles.use })
    })

    document.addEventListener('readystatechange', () => {
      unsafeWindow.Page && call()
    })
  },
})
