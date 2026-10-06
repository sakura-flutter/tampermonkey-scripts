import styles from './style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const homePage: PageDefinition = {
  id: 'home',
  name: '搜索',
  pathPattern: '/*',
  widthPolicy: {
    viewportRatio: 0.775,
    maxWidth: 1580,
  },
  styles: [styles],
}
