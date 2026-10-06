import styles from './style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const subjectPage: PageDefinition = {
  id: 'subject',
  name: '详情',
  pathPattern: '/subject/*',
  widthPolicy: {
    viewportRatio: 0.82,
    maxWidth: 1318,
  },
  styles: [styles],
}
