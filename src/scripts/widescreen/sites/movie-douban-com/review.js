// 貌似样式一样的，直接用subject的吧
import styles from './subject.lazy.scss'

export const doubanReview = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
