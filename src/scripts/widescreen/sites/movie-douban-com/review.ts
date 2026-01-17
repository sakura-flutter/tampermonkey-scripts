// 貌似样式一样的，直接用subject的吧
import styles from './subject.lazy.scss'
import type { Site } from '../../types'

export const doubanReview: Site['use'] = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
