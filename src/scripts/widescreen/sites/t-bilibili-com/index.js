import styles from './index.lazy.scss'

export const bilibiliDynamic = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})

export { bilibiliDynamicDetail } from './detail'
