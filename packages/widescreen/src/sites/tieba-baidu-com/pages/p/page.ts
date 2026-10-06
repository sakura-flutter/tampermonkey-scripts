import styles from './style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const pPage: PageDefinition = {
  id: 'p',
  name: '帖子',
  pathPattern: /^\/p\//,
  widthPolicy: {
    viewportRatio: 1,
    maxWidth: 1920,
  },
  styles: [styles],
}
