import styles from './topic.lazy.scss'
import type { Site } from '../../types'

export const zhihuTopic:Site['use'] = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
