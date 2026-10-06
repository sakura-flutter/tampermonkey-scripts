import styles from '../gallery/style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const notePage: PageDefinition = {
  id: 'note',
  name: '日记',
  pathPattern: '/note/*',
  widthPolicy: {
    viewportRatio: 0.82,
    maxWidth: 1318,
  },
  styles: [styles],
}
