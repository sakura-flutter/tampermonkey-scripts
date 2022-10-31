/* eslint-disable camelcase */
import Queue from '@/utils/queue'
import { sleep } from '@/utils/base'
import { warn, error as logError } from '@/utils/log'
import { doSignWeb, doSignApp, batchSignApp } from './api'
import { getPageData } from './utils'
import type { AppApiSignResponse } from './types'

interface Task {
  readonly fid?: string
  readonly kw?: string
  /** BDUSS */
  readonly BDUSS?: string
  /** 签到失败次数 */
  fail: number
  /** 签到逻辑 */
  execute(): Promise<{
    fid?: string,
    kw?: string,
    data?: Partial<AppApiSignResponse['user_info']> & {
      is_sign: 1
    },
  }>
}

/**
 * 网页签到
 *
 * 经验没客户端那么多，但不需要获得 BDUSS 只需登录即可
 */
class WebTask implements Task {
  readonly kw
  fail = 0
  constructor(options: {
    kw: string
  }) {
    this.kw = options.kw
  }

  async execute() {
    const { kw } = this
    try {
      await doSignWeb({ kw })
      return { kw }
    } catch (e: any) {
      // 签过
      if (e.response?.no === 1101) {
        return { kw }
      }
      this.fail++
      throw e
    } finally {
      // 网页签到不能太短，否则很容易出现验证码(ಥ﹏ಥ) 验证码：2150040
      const ms = ~~(Math.random() * 500 + 600)
      await sleep(ms)
    }
  }
}

/**
 * 模拟客户端签到
 *
 * 获得经验与客户端签到相同，需要获得 BDUSS
 */
class AppTask implements Task {
  readonly fid
  readonly kw
  readonly BDUSS
  fail = 0
  constructor(options: {
    fid: string
    kw: string
    BDUSS: string
  }) {
    this.fid = options.fid
    this.kw = options.kw
    this.BDUSS = options.BDUSS
  }

  async execute() {
    const { fid, kw, BDUSS } = this
    const { tbs } = getPageData()
    if (!fid) throw new Error('获取吧 id 为空')
    try {
      const response = await doSignApp({
        BDUSS,
        tbs,
        fid,
        kw,
      })
      const { user_info } = response
      return {
        fid,
        kw,
        data: {
          ...user_info,
          // 标记为已签到
          is_sign: 1,
        } as Awaited<ReturnType<Task['execute']>>['data'],
      }
    } catch (e: any) {
      // 签过
      if (e.response?.error_code === '160002') {
        return {
          fid,
          kw,
          data: {
            is_sign: 1,
          } as Awaited<ReturnType<Task['execute']>>['data'],
        }
      }
      this.fail++
      throw e
    } finally {
      // 客户端签到可以将延时缩短，随机延时一下 50ms 以上
      const ms = ~~(Math.random() * 20) + 50
      await sleep(ms)
    }
  }
}

async function batch(options: {
  BDUSS: string,
  forum_ids: string[]
}) {
  const { BDUSS, forum_ids } = options
  const { tbs } = getPageData()
  const { info } = await batchSignApp({
    BDUSS,
    tbs,
    forum_ids: forum_ids.slice(0, 200), // 接口限制最多 200 个
  })

  type NewInfoItem = Awaited<ReturnType<Task['execute']>>['data'] & {
    forum_id: string,
    forum_name: string,
  }
  const newInfo: NewInfoItem[] = info.map(item => ({
    forum_id: item.forum_id,
    forum_name: item.forum_name,
    sign_bonus_point: item.cur_score,
    is_sign: 1,
  }))
  return newInfo
}

export type SignMode = 'web' | 'app' | 'fast'

export class Adapter {
  options: {
    unsigns: { fid: string, kw: string }[],
    BDUSS?: string,
    onSuccess: (result: Awaited<ReturnType<Task['execute']>>) => void,
  }

  constructor(options: Adapter['options']) {
    this.options = { ...options }
    this.options.unsigns = [...this.options.unsigns]
  }

  /**
   * 签到
   * @param mode 签到方式
   * @returns 签到失败列表
   */
  async sign(mode: SignMode) {
    let Task: typeof WebTask | typeof AppTask
    let limit: number

    switch (mode) {
      case 'web':
        Task = WebTask
        // 网页签到要 1 个个来，太快会被禁止一段时间
        limit = 1
        break

      case 'app':
      case 'fast':
        if (!this.options.BDUSS) {
          throw new Error('签到方式为 app 时 BDUSS 不能为空')
        }
        Task = AppTask
        // 限制 3 个任务，大于 3 个签到失败的概率好像大点了
        limit = 3
        break

      default:
        // 类型检查
        return ((e: never) => { throw new Error(e) })(mode)
    }

    const { unsigns } = this.options

    if (mode === 'fast') {
      try {
        const data = await batch({
          BDUSS: this.options.BDUSS!,
          forum_ids: unsigns.map(unsign => unsign.fid),
        })
        for (let index = unsigns.length - 1; index >= 0; index--) {
          const unsign = unsigns[index]
          const found = data.find(item => item.forum_id === unsign.fid)
          if (found) {
            this.options.onSuccess({
              fid: found.forum_id,
              kw: found.forum_name,
              data: found,
            })
            unsigns.splice(index, 1)
          }
        }
      } catch (error) {
        logError.force('批量签到失败', error)
      }
    }
    warn('待签', unsigns)

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    const failList: typeof unsigns = []
    const queue = new Queue({ limit })

    queue.enqueue(unsigns.map(unsign => {
      const task = new Task({
        fid: unsign.fid,
        kw: unsign.kw,
        BDUSS: this.options.BDUSS!,
      })

      return async function callback() {
        try {
          const result = await task.execute()
          self.options.onSuccess(result)
        } catch (error: any) {
          logError.force('签到失败', error, error.response, error.info)
          // 失败重签 1 次
          if (task.fail <= 1) {
            queue.enqueue(callback)
          } else {
            failList.push(unsign)
          }
        }
      }
    }))
    await queue.run()

    return failList
  }
}
