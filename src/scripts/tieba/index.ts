import { checker } from '@/utils/compatibility'
import store from './store'
import { getElementsInPage } from './utils'
import { createUI } from './ui'

function main() {
  if (!checker()) return

  // 未登录时删除已有的 BDUSS
  if (!getElementsInPage().moreForum.length) {
    delete store.BDUSS
    delete store.is_complete
    return
  }

  createUI()
}

main()
