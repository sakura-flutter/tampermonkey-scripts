import './mocha-official-gifts'
import styles from './detail.lazy.scss'

export const bilibiliDynamicDetail = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
