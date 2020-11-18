import styles from './f.lazy.scss'

export const tiebaForum = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
