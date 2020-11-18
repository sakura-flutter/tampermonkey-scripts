import styles from './index.lazy.scss'

export const weixin = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
