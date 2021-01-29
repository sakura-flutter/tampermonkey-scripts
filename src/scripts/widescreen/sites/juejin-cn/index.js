import styles from './index.lazy.scss'

export const juejin = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
