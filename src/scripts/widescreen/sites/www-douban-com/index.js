import styles from './index.lazy.scss'

export const douban = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
