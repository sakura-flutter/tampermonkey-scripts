import styles from './index.lazy.scss'

export const doubanMovie = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
