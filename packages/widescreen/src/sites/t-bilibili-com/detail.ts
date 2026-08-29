import './mocha-official-gifts'
import styles from './detail.lazy.scss'
import type { Site } from '../../types'

export const bilibiliDynamicDetail: Site['use'] = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
