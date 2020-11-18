import styles from './index.lazy.scss'

export const segmentfault = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
