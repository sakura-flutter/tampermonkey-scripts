import styles from './index.lazy.scss'

export const sougou = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
