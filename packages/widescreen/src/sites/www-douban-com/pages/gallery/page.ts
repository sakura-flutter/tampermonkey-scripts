import styles from './style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const galleryPage: PageDefinition = {
  id: 'gallery',
  name: '相册',
  pathPattern: '/gallery',
  widthPolicy: {
    viewportRatio: 0.82,
    maxWidth: 1318,
  },
  styles: [styles],
}
