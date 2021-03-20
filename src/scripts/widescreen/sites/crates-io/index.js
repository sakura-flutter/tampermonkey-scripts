import styles from './index.lazy.scss'

export const crates = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
