import styles from './topic.lazy.scss'

export const zhihuTopic = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
