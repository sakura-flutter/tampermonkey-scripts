import styles from './article.lazy.scss'

export const weiboArticle = ({ store, createControl }) => ({
  handler() {
    createControl({ store, execute: styles.use })
  },
})
