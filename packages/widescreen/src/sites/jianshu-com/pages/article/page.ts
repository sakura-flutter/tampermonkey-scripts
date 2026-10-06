import styles from './style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const articlePage: PageDefinition = {
  id: 'article',
  name: '文章',
  pathPattern: ['/p/:id', '/p/:id/*'],
  widthPolicy: {
    viewportRatio: 0.85,
    maxWidth: 1400,
  },
  styles: [styles],
}
