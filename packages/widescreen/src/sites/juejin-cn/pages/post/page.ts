import styles from './style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const postPage: PageDefinition = {
  id: 'post',
  name: '文章',
  pathPattern: ['/post/:id', '/post/:id/*'],
  widthPolicy: {
    viewportRatio: 0.82,
    maxWidth: 1400,
  },
  styles: [styles],
}
