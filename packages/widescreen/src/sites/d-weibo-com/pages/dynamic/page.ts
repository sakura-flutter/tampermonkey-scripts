import styles from './style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const dynamicPage: PageDefinition = {
  id: 'dynamic',
  name: '动态',
  pathPattern: '/*',
  widthPolicy: {
    viewportRatio: 0.775,
    maxWidth: 1330,
  },
  styles: [styles],
}
