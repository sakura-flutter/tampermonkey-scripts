import styles from './style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const homePage: PageDefinition = {
  id: 'home',
  name: '动态',
  pathPattern: '/',
  widthPolicy: {
    viewportRatio: 0.85,
    maxWidth: 1700,
  },
  styles: [styles],
}
