import styles from './style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const articlePage: PageDefinition = {
  id: 'article',
  name: '文章',
  pathPattern: /^\/(?:article|w)\/\d+\/?$/,
  widthPolicy: {
    viewportRatio: 0.88,
    maxWidth: 1470,
  },
  styles: [styles],
}
