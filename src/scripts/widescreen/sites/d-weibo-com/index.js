import styles from './index.lazy.scss'

export const weiboDynamic = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
