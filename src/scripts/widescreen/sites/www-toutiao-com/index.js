import styles from './index.lazy.scss'

export const toutiao = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
