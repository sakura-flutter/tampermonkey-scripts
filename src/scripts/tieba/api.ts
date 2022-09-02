import * as qs from '@/utils/querystring'
import {
  GMRequest,
  request,
  ResponseError,
  getPageData,
  FAKE_VERSION,
  signRequestParams,
} from './utils'
import store from './store'
import type {
  WebApiLikeForumResponse,
  WebApiSignResponse,
  AppApiLikeForumResponse,
  AppApiSignResponse,
  AppApiBatchSignResponse,
  LikeForumData,
  PageData,
} from './types'

/**
 *
 * web 接口
 *
 */

/**
 * web 获取关注列表
 */
export function getNewmoindex() {
  return request.post<WebApiLikeForumResponse>('/mo/q/newmoindex')
}

/**
 * web 签到
 */
export function doSignWeb(params: {
  /** 吧名 */
  kw: LikeForumData['forum_name']
}) {
  const { tbs } = getPageData()

  return request.post<WebApiSignResponse>(
    '/sign/add',
    { ie: 'utf-8', tbs, ...params },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    },
  )
}

/**
 *
 * app 接口
 *
 */

const appCommonHeader = Object.freeze({
  'User-agent': `bdtb for Android ${FAKE_VERSION}`,
  Accept: '',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept-Encoding': 'gzip',
  Cookie: 'ka=open',
})

/**
 * app 获取关注列表
 */
export function getForumLike(params: {
  BDUSS: string
  tbs: PageData['tbs']
}) {
  return GMRequest.post<AppApiLikeForumResponse>(
    'http://c.tieba.baidu.com/c/f/forum/like',
    qs.stringify(signRequestParams(params)),
    {
      headers: appCommonHeader,
    },
  )
}

/**
 * app 签到
 */
export function doSignApp(params: {
  BDUSS: string
  tbs: PageData['tbs']
  /** 吧 id */
  fid: LikeForumData['forum_id'] | string
  /** 吧名 */
  kw: LikeForumData['forum_name']
}) {
  return GMRequest.post<AppApiSignResponse>(
    'http://c.tieba.baidu.com/c/c/forum/sign',
    qs.stringify(signRequestParams(params)),
    {
      headers: appCommonHeader,
    })
}

/**
 * app 批量签到
 */
export function batchSignApp(params: {
  BDUSS: string
  tbs: PageData['tbs']
  /** 吧 id */
  forum_ids: (LikeForumData['forum_id'] | string)[]
}) {
  return GMRequest.post<AppApiBatchSignResponse>(
    'http://c.tieba.baidu.com/c/c/forum/msign',
    qs.stringify(signRequestParams(params)),
    {
      headers: appCommonHeader,
    })
    .then(response => {
      if (response.error.errno !== '0') {
        throw new ResponseError(response.error.usermsg, response)
      }
      return response
    })
}

/**
 *
 * 合成接口
 *
 */

/**
 * 界面上无法获得失效的贴吧，这里调用接口获取所有关注的贴吧
 */
export async function mergeLikeForum() {
  const { BDUSS } = store
  if (!BDUSS) throw new Error('BDUSS 不能为空')
  const { tbs } = getPageData()
  const req2 = {
    BDUSS,
    tbs,
  }
  const [like1, like2Map] = await Promise.all([
    getNewmoindex()
      .then(data => data.data.like_forum),
    getForumLike(req2)
      .then(data => data.forum_list)
      .then(forumList => forumList.reduce(
        (acc, val) => (((acc[val.id] = val), acc)),
        {} as Record<string, typeof forumList[number]>),
      ),
  ])

  // 融合数据
  like1.forEach(forum => {
    const forumId = forum.forum_id
    const like2Forum = like2Map[forumId]
    if (!like2Forum) return
    Object.assign(forum, {
      levelup_score: like2Forum.levelup_score,
      level_name: like2Forum.level_name,
      slogan: like2Forum.slogan,
    })
  })
  // 经验降序
  like1.sort((a, b) => +b.user_exp - +a.user_exp)
  return like1 as LikeForumData[]
}
