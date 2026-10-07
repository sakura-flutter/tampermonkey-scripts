import { checker } from '@monkey/shared/utils'
import store from './store'
import { getPageData } from './utils'
import { createUI } from './ui'

/** 签到互斥锁名称 */
const LOCK_NAME = 'tieba-sign-owner'

/**
 * todo：暂时不支持超过 200 个吧
 * 一次只能获取 200 个，
 * 而且通过接口没有办法区分吧是否被封，签到时不好处理
 */

function main() {
  if (!checker()) return

  // 未登录时删除已有的 BDUSS
  if (!getPageData().user.is_login) {
    delete store.BDUSS
    delete store.is_complete
    return
  }

  // 加互斥锁，确保只有一个标签页在运行
  navigator.locks
    .request(LOCK_NAME, async () => {
      createUI()
      await new Promise<void>(() => {})
    })
    .catch(() => {})
}

main()
