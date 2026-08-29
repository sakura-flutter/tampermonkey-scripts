import styles from './home.lazy.scss'
import type { Site } from '../../types'

export const zhihuHome: Site['use'] = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
