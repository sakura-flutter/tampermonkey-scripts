import styles from './style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const fPage: PageDefinition = {
  id: 'f',
  name: '吧页',
  pathPattern: '/f',
  widthPolicy: {
    viewportRatio: 1,
    maxWidth: 1920,
  },
  styles: [styles],
}
