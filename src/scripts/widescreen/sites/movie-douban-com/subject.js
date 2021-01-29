import styles from './subject.lazy.scss'

export const doubanSubject = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
