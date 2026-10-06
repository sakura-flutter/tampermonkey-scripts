import styles from './style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const topicPage: PageDefinition = {
  id: 'topic',
  name: '话题页',
  pathPattern: ['/topic/:id', '/topic/:id/*'],
  widthPolicy: {
    viewportRatio: 0.8,
    maxWidth: 1400,
  },
  styles: [styles],
}
