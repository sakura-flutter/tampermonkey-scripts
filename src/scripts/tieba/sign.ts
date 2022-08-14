/* eslint-disable camelcase */
import Queue from '@/utils/queue'
import { sleep } from '@/utils/base'
import * as qs from '@/utils/querystring'
import { doSignWeb, doSignApp } from './api'
import { getElementsInPage, getPageData } from './utils'
import type { AppApiSignResponse } from './types'

class ResponseError extends Error {
  response
  constructor(msg = '未知错误', response?: Record<string, any>) {
    super(msg)
    this.response = response
  }
}

interface Task {
  /** 页面上关注的吧 */
  readonly element: HTMLAnchorElement
  /** BDUSS */
  readonly BDUSS?: string
  /** 签到失败次数 */
  fail: number
  /** 签到逻辑 */
  execute(): Promise<{
    /** 页面上对应吧的 a 标签 */
    element: HTMLAnchorElement,
    fid?: string,
    data?: AppApiSignResponse['user_info'] & {
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
  readonly element
  fail = 0
  constructor(options: {
    element: HTMLAnchorElement
  }) {
    this.element = options.element
  }

  async execute() {
    const { element } = this
    const { kw } = qs.parse(element.href)
    try {
      const response = await doSignWeb({ kw })
      const { no, error } = response
      if (no !== 0) throw new ResponseError(error, response)
      return {
        element,
      }
    } catch (e) {
      this.fail++
      throw e
    } finally {
      // 网页签到不能太短，否则很容易出现验证码(ಥ﹏ಥ) 验证码：2150040
      const ms = parseInt(String(Math.random() * 500 + 600))
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
  readonly element
  readonly BDUSS
  fail = 0
  constructor(options: {
    element: HTMLAnchorElement
    BDUSS: string
  }) {
    this.element = options.element
    this.BDUSS = options.BDUSS
  }

  async execute() {
    const { element, BDUSS } = this
    const { tbs } = getPageData()
    const { fid } = element.dataset
    const { kw } = qs.parse(element.href)
    if (!fid) throw new Error('获取吧 id 为空')
    try {
      const response = await doSignApp({
        BDUSS,
        tbs,
        fid,
        kw,
      })
      // 签到太快时有可能直接不响应
      if (response == null) throw new ResponseError('无响应')
      const { error_code, error_msg, user_info } = response
      // 贴吧成功码为 0
      if (error_code !== '0') throw new ResponseError(error_msg, response)
      return {
        element,
        fid,
        data: {
          ...user_info,
          // 标记为已签到
          is_sign: 1,
        } as Awaited<ReturnType<Task['execute']>>['data'],
      }
    } catch (e) {
      this.fail++
      throw e
    } finally {
      // 客户端签到可以将延时缩短，随机延时一下 50ms 以上
      const ms = parseInt(String(Math.random() * 20 + 50))
      await sleep(ms)
    }
  }
}

export type SignMode = 'web' | 'app'

export class Adapter {
  options: {
    BDUSS?: string
    onSuccess: (result: Awaited<ReturnType<Task['execute']>>) => void
  }

  constructor(options: Adapter['options']) {
    this.options = options
  }

  /**
   * 签到
   * @param mode 签到方式
   * @returns 签到失败数
   */
  async sign(mode: SignMode): Promise<number> {
    let Task: typeof WebTask | typeof AppTask
    let limit: number

    switch (mode) {
      case 'web':
        Task = WebTask
        // 网页签到要 1 个个来，太快会被禁止一段时间
        limit = 1
        break

      case 'app':
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

    let failCount = 0
    const unsignEls = getElementsInPage().unsigns
    const queue = new Queue({ limit })

    queue.enqueue(unsignEls.map(element => {
      const task = new Task({
        element,
        BDUSS: this.options.BDUSS!,
      })

      return async function callback(this: Adapter) {
        try {
          const result = await task.execute()
          this.options.onSuccess(result)
        } catch (_e: any) {
          const error: ResponseError = _e
          console.error('签到失败', error, error.response)
          // 失败重签 1 次
          if (task.fail <= 1) {
            queue.enqueue(callback)
          } else {
            failCount++
            const { kw } = qs.parse(element.href)
            Toast.error(`${decodeURIComponent(kw)} 签到失败：${error.message}`)
          }
        }
      }.bind(this)
    }))
    await queue.run()

    return failCount
  }
}
