import * as readyState from '@/utils/ready-state'
import type { Site } from '../../types'

const styles = require('./index.string.scss').default.toString() as string

export const baidu: Site['use'] = ({ store, createControl }) => ({
  handler() {
    function execute() {
      const styleSheet = GM_addStyle(styles)

      readyState.interactive(() => {
        const template = document.createElement('template')
        template.appendChild(styleSheet)
        // 搜索时百度会清除head这里将样式插入一次到body
        document.body.insertAdjacentElement('afterbegin', template)
      })
    }

    createControl({ store, execute })
  },
})
