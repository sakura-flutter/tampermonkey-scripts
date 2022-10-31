import { checker } from '@/utils/compatibility'
import store from './store'
import { getElementsInPage } from './utils'
import { createUI } from './ui'

/**
 * todo：暂时不支持超过 200 个吧
 * 一次只能获取 200 个，
 * 而且通过接口没有办法区分吧是否被封，签到时不好处理
 */

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
