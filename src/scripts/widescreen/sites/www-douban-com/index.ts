import styles from './index.lazy.scss'
import type { Site } from '../../types'

export const douban: Site['use'] = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
