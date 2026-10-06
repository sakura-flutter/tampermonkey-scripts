import styles from './style.lazy.scss'
import type { PageDefinition } from '../../../../core/types'

export const cratePage: PageDefinition = {
  id: 'crate',
  name: '包页面',
  pathPattern: ['/crates/:name', '/crates/:name/*'],
  widthPolicy: {
    viewportRatio: 0.82,
    maxWidth: 1400,
  },
  styles: [styles],
}
