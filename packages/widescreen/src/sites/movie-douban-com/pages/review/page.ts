import styles from '../subject/style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const reviewPage: PageDefinition = {
  id: 'review',
  name: '剧评',
  pathPattern: '/review/*',
  widthPolicy: {
    viewportRatio: 0.82,
    maxWidth: 1318,
  },
  styles: [styles],
}
