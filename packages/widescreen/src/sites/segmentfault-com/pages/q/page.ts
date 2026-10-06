import styles from './style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const qPage: PageDefinition = {
  id: 'q',
  name: '内容',
  pathPattern: ['/q/:id', '/q/:id/*', '/a/:id', '/a/:id/*'],
  widthPolicy: {
    viewportRatio: 0.82,
    maxWidth: 1350,
  },
  styles: [styles],
}
