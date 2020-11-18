import styles from './home.lazy.scss'

export const zhihuHome = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
