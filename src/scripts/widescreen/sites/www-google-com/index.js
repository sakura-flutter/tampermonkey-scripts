import { parse } from '@/utils/querystring'
import styles from './index.lazy.scss'

export const google = ({ store, createControl }) => ({
  handler() {
    if (parse().tbm) return // 选择了tab搜索时终止

    createControl({ store, execute: styles.use })
  },
})
