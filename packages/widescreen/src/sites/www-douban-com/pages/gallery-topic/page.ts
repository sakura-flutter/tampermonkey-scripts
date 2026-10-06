import styles from '../gallery/style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const galleryTopicPage: PageDefinition = {
  id: 'gallery-topic',
  name: '相册话题',
  pathPattern: '/gallery/topic/*',
  widthPolicy: {
    viewportRatio: 0.82,
    maxWidth: 1318,
  },
  styles: [styles],
}
