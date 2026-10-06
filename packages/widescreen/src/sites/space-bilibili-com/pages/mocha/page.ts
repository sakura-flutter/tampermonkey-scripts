import { activateMochaGift } from '../../../t-bilibili-com/mocha'
import type { PageDefinition } from '../../../../core/types'

export const mochaPage: PageDefinition = {
  id: 'mocha-space',
  name: '空间',
  pathPattern: '/212535360',
  widthPolicy: {
    viewportRatio: 1,
    maxWidth: '100vw',
  },
  activate(context) {
    activateMochaGift(context, 'space')
  },
}
