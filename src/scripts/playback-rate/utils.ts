import { warn } from '@/utils/log'

/** 判断视频是否正在播放 */
function isPlaying(video: HTMLVideoElement) {
  return !video.paused && !video.ended
}

/** 判断视频是否有声音（非静音） */
function isAudible(video: HTMLVideoElement) {
  return !video.muted && video.volume > 0
}

/** 计算矩形中心到视口中心的距离 */
function getDistanceFromViewportCenter(rect: DOMRect) {
  const viewportCenterX = window.innerWidth / 2
  const viewportCenterY = window.innerHeight / 2
  const videoCenterX = rect.left + rect.width / 2
  const videoCenterY = rect.top + rect.height / 2
  const dx = videoCenterX - viewportCenterX
  const dy = videoCenterY - viewportCenterY
  // 这里不需要 `Math.sqrt` 开根号，避免计算开销，比较时平方距离也是有效的
  return dx * dx + dy * dy
}

/**
 * 深度收集某个文档（及其下所有「开放」shadow DOM）中**正在播放**的 video 元素
 *
 * 只收集正在播放的 video（倍速/seek 仅对播放中有效），免去后续再过滤。
 * 注意：mode 为 'closed' 的 shadow root 无法访问，其中的 video 会漏掉。
 */
function getVideosDeep(root: Document | ShadowRoot): HTMLVideoElement[] {
  const videos: HTMLVideoElement[] = []
  const collect = (node: Document | ShadowRoot) => {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT)
    let el: Element | null
    while ((el = walker.nextNode() as Element | null)) {
      const video = el as HTMLVideoElement
      if (el.tagName === 'VIDEO' && isPlaying(video)) videos.push(video)
      if (el.shadowRoot) collect(el.shadowRoot)
    }
  }
  collect(root)
  return videos
}

/**
 * 查找「当前文档」（含 shadow DOM）中最优的「正在播放」video 元素，供快捷键操作。
 *
 * 只扫描本实例所在文档：iframe 内的 video 由各 iframe 自身的实例通过 postMessage
 * 链逐层处理，不在父文档里跨文档查找（统一一套机制，不分同源 / 跨域）。
 *
 * 多个视频同时播放时的权重优先级：
 * 1. 音频状态 (有声 > 静音)：静音的通常是广告或背景视频，理想情况下不会出现多个有声音的视频
 * 2. 元素大小 (大 > 小)：大尺寸的视频通常是主要内容
 * 3. 视口距离 (距离视口中心近 > 远)：短视频或信息流页面可滚动时，优先处理视口中心附近
 */
export function findBestVideoElement(): HTMLVideoElement | null {
  const videos = getVideosDeep(document)
  if (videos.length === 0) {
    warn('视频元素为空')
    return null
  }

  videos.sort((a, b) => {
    // 优先级 1 音频状态：非静音优先
    const audibleA = isAudible(a)
    const audibleB = isAudible(b)
    if (audibleA !== audibleB) {
      return audibleA ? -1 : 1
    }

    const rectA = a.getBoundingClientRect()
    const rectB = b.getBoundingClientRect()

    // 优先级 2 元素大小：大尺寸优先
    const sizeA = rectA.width * rectA.height
    const sizeB = rectB.width * rectB.height
    if (sizeA !== sizeB) {
      return sizeB - sizeA
    }

    // 优先级 3 视口距离：距离视口中心越近越优先 (距离越小越好)
    const distA = getDistanceFromViewportCenter(rectA)
    const distB = getDistanceFromViewportCenter(rectB)
    return distA - distB
  })

  warn(videos)

  // 返回排序后的第一个元素，即最优匹配
  return videos[0]
}

/** 判断元素是否为输入元素（输入框 / 文本域 / 下拉选择 / 可编辑元素） */
function isInputElement(el: Element | null): boolean {
  if (!el) return false
  const { tagName } = el
  return (
    tagName === 'INPUT' ||
    tagName === 'TEXTAREA' ||
    tagName === 'SELECT' ||
    (el instanceof HTMLElement && el.isContentEditable)
  )
}

/** 检测当前焦点是否落在输入元素上 */
export function isInputActive(): boolean {
  let { activeElement } = document

  // 穿透 shadowRoot 与同域 iframe，定位真正获得焦点的元素；无更深层则结束
  while (true) {
    const shadowEl = activeElement!.shadowRoot?.activeElement
    if (shadowEl) {
      activeElement = shadowEl
      continue
    }

    if (activeElement instanceof HTMLIFrameElement) {
      const innerEl = activeElement.contentDocument?.activeElement
      if (innerEl) {
        activeElement = innerEl
        continue
      }
    }

    break
  }

  return isInputElement(activeElement)
}
