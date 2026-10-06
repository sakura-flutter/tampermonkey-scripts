import styles from './style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const homePage: PageDefinition = {
  id: 'home',
  name: '首页',
  pathPattern: ['/', '/follow', '/hot', '/column-square'],
  widthPolicy: {
    viewportRatio: 0.8,
    maxWidth: 1400,
  },
  styles: [styles],
}
