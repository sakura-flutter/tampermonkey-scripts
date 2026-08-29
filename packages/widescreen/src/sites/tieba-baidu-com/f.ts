import styles from './f.lazy.scss'
import type { Site } from '../../types'

export const tiebaForum: Site['use'] = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
