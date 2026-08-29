import styles from './article.lazy.scss'
import type { Site } from '../../types'

export const weiboArticle: Site['use'] = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
