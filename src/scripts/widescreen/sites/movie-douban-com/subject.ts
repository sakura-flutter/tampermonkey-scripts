import styles from './subject.lazy.scss'
import type { Site } from '../../types'

export const doubanSubject:Site['use'] = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
