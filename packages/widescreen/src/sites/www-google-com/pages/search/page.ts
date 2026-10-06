import styles from './style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const searchPage: PageDefinition = {
  id: 'search',
  name: '搜索',
  pathPattern: '/search',
  widthPolicy: {
    viewportRatio: 0.73,
    maxWidth: 1530,
  },
  activate(context) {
    if (new URLSearchParams(context.route.search).has('tbm')) return

    styles.use()
    return () => styles.unuse()
  },
}
