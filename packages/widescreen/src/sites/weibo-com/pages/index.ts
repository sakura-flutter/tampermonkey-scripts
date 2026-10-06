import tvStyles from './tv/style.lazy.scss'
import articleStyles from './article/style.lazy.scss'
import homeStyles from './home/style.lazy.scss'
import type { PageDefinition } from '../../../core/types'

export const tvPage: PageDefinition = {
  id: 'tv',
  name: '视频详情',
  pathPattern: /^\/tv\/show\//,
  priority: 20,
  widthPolicy: {
    viewportRatio: 0.91,
    maxWidth: '91vw',
  },
  styles: [tvStyles],
}

export const articlePage: PageDefinition = {
  id: 'article',
  name: '文章',
  pathPattern: '/ttarticle/p/show',
  priority: 10,
  widthPolicy: {
    viewportRatio: 0.9,
    maxWidth: 1380,
  },
  styles: [articleStyles],
}

export const homePage: PageDefinition = {
  id: 'home',
  name: '首页',
  pathPattern: '/*',
  widthPolicy: {
    viewportRatio: 0.52,
    maxWidth: 1100,
  },
  styles: [homeStyles],
}
