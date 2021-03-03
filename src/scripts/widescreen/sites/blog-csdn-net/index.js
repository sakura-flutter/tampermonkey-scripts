import styles from './index.lazy.scss'

export const csdn = ({ store, createControl }) => ({
  handler() {
    styles.use()
  },
})
