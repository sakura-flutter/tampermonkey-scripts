import { parseURL, sleep } from '@/utils'
import Queue from '@/utils/queue'
import store from './store'
import * as api from './api'
import { createUI } from './ui'

/* eslint-disable camelcase */

const $$ = document.querySelectorAll.bind(document)
// 页面节点 jquery元素
let $moreforumEl

async function main() {
  const { jQuery } = unsafeWindow
  $moreforumEl = jQuery('#moreforum')
  // 未登录时删除已有的BDUSS
  if (!$moreforumEl.length) {
    delete store.BDUSS
    delete store.is_complete
    return
  }

  let likeForums = null
  if (store.BDUSS) {
    try {
      likeForums = await getLikeForums()
    } catch (error) {
      console.error(error)
      Toast.error('获取贴吧列表失败。。请刷新重试~', 0)
    }
  }
  const ui = createUI({ store, runByBDUSS, runByWeb })
  if (likeForums) {
    ui.setLikeForums(likeForums)
    ui.checkUnsign()
  }
}

// 界面上无法获得失效的贴吧，这里调用接口获取所有关注的贴吧
async function getLikeForums() {
  const { BDUSS } = store
  const tbs = unsafeWindow.PageData.tbs
  const req2 = {
    BDUSS,
    tbs,
  }
  const [like1, like2Map] = await Promise.all([
    api.getNewmoindex().then(response => response.json()).then(data => data.data.like_forum),
    api.getForumLike(req2).then(data => data.forum_list).then(forum_list => forum_list.reduce((acc, val) => (((acc[val.id] = val), acc)), {})),
  ])

  // 融合数据
  like1.forEach(forum => {
    const { forum_id } = forum
    const like2Forum = like2Map[forum_id]
    if (!like2Forum) return
    Object.assign(forum, {
      levelup_score: like2Forum.levelup_score,
      level_name: like2Forum.level_name,
      slogan: like2Forum.slogan,
    })
  })
  // 经验降序
  like1.sort((a, b) => b.user_exp - a.user_exp)
  return like1
}

// 通过BDUSS签到 获得经验与客户端签到相同
async function runByBDUSS(ui) {
  // 贴吧必须先触发才能获取剩下贴吧
  $moreforumEl.trigger(new MouseEvent('mouseenter'))
  // 侧边元素
  const likeUnsignEls = $$('#likeforumwraper .unsign')
  // 查看更多元素
  const alwayUnsignEls = $$('#alwayforum-wraper .unsign')
  // 关闭面板
  $moreforumEl.trigger(new Event('click'))
  const allUnsignEls = [...likeUnsignEls, ...alwayUnsignEls]
  // 需要重新签到元素（失败时尝试重签）
  const resignEls = []
  if (!allUnsignEls.length) {
    Toast.success('所有贴吧已经签到')
    return
  }
  const toast = Toast('开始签到，请等待', 0)

  // 签到
  function doSign(data) {
    const { BDUSS } = store
    const { tbs, fid, kw } = data
    const params = {
      // 以下4个参数 + sign参数 是必选的
      BDUSS,
      tbs,
      fid,
      kw,
    }
    return api.doSign(params)
  }

  const tbs = unsafeWindow.PageData.tbs
  const queue = new Queue({
    // 限制5个任务，大于5个签到失败的概率好像大点了！
    limit: 5,
    tasks: allUnsignEls.map(current => {
      return async function() {
        const { kw } = parseURL(current.href)
        const { fid } = current.dataset
        try {
          const response = await doSign({ tbs, kw, fid })
          const { error_code, error, user_info } = response
          // 贴吧成功码为0 还会出现code为0但error的情况
          if (error_code !== '0' || error) throw response
          // 标记为已签到
          user_info.is_sign = true
          ui.updateLikeForum(fid, user_info)
          // 替换已签到样式
          current.classList.replace('unsign', 'sign')
        } catch (e) {
          console.error(e)
          // 重签
          resignEls.push(current)
        }
        // 客户端签到可以将延时缩短，随机延时一下 50ms以上
        const ms = parseInt(Math.random() * 20 + 50)
        await sleep(ms)
      }
    }),
  })
  await queue.run()

  let failCount = 0

  // 重签
  while (resignEls.length) {
    const current = resignEls.shift()
    const { kw } = parseURL(current.href)
    const { fid } = current.dataset
    try {
      const response = await doSign({ tbs, kw, fid })
      const { error_code, error, user_info } = response
      if (error_code !== '0' || error) throw response
      user_info.is_sign = true
      ui.updateLikeForum(fid, user_info)
      current.classList.replace('unsign', 'sign')
    } catch (e) {
      console.error(e)
      failCount++
      Toast.error(`${decodeURIComponent(kw)} 签到失败`)
    }
    await sleep(500)
  }

  toast.close()
  failCount
    ? Toast.warning({
        content: `签到成功，失败${failCount}个`,
        duration: 0,
      })
    : Toast.success('签到成功')
  ui.checkUnsign()
}

// 网页签到 经验没客户端那么多 但不需要获得BDUSS只需贴吧已登录即可
async function runByWeb() {
  // 贴吧必须先触发才能获取剩下贴吧
  $moreforumEl.trigger(new MouseEvent('mouseenter'))
  // 侧边元素
  const likeUnsignEls = $$('#likeforumwraper .unsign')
  // 查看更多元素
  const alwayUnsignEls = $$('#alwayforum-wraper .unsign')
  // 关闭面板
  $moreforumEl.trigger(new Event('click'))
  const allUnsignEls = [...likeUnsignEls, ...alwayUnsignEls]
  // 需要重新签到元素（失败时尝试重签）
  const resignEls = []
  if (!allUnsignEls.length) {
    Toast.success('所有贴吧已经签到')
    return
  }
  const toast = Toast('开始签到，请等待', 0)

  // 签到
  function doSign(data) {
    return api.doWebSign(data).then(response => response.json())
  }
  while (allUnsignEls.length) {
    const current = allUnsignEls.shift()
    const { kw } = parseURL(current.href)
    try {
      const response = await doSign({ kw })
      const { no } = response
      // 贴吧成功码为0
      if (no !== 0) throw response
      // 替换已签到样式
      current.classList.replace('unsign', 'sign')
    } catch (e) {
      console.error(e)
      // 重签
      resignEls.push(current)
    }
    // 网页签到不能太短，否则很容易出现验证码(ಥ﹏ಥ) 验证码2150040
    const ms = parseInt(Math.random() * 500 + 500)
    await sleep(ms)
  }

  let failCount = 0
  // 重签
  while (resignEls.length) {
    const current = resignEls.shift()
    const { kw } = parseURL(current.href)
    try {
      const response = await doSign({ kw })
      const { no } = response
      if (no !== 0) throw response
      current.classList.replace('unsign', 'sign')
    } catch (e) {
      console.error(e)
      failCount++
      Toast.error(`${decodeURIComponent(kw)} 签到失败`)
    }
    await sleep(500)
  }

  toast.close()
  failCount
    ? Toast.warning(`签到成功，失败${failCount}个`, 0)
    : Toast.success('签到成功')
}

main()
