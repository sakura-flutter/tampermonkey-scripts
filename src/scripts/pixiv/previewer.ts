import Viewer from 'viewerjs'
import { $$ } from '@/utils/selector'
import { warn } from '@/utils/log'

GM_addStyle(GM_getResourceText('viewerCSS'))
GM_addStyle([
  '.viewer-backdrop { background-color: rgb(0 0 0 / 0.8) }', // 背景暗一点
  '.viewer-container .viewer-title { text-shadow: 1px 1px 1px #000 }', // 添加标题阴影 在图片是白底时显示得清楚点
  '.viewer-container .viewer-navbar ul, .viewer-container .viewer-navbar li { width: 66px; height: 110px }', // 加大导航栏
].join(''))

interface PreviewerOptions {
  includePathname: RegExp
}

export default class Previewer {
  #el
  #viewer?: Viewer
  #options: PreviewerOptions

  constructor(el: string, options: PreviewerOptions) {
    this.#process = this.#process.bind(this)
    this.#el = el
    this.#options = options
    this.#init()
  }

  #init() {
    window.addEventListener('click', this.#process, true)
    window.addEventListener('urlchange', info => {
      warn('urlchange', info)
      this.#viewer?.hide()
    })
  }

  #process = function(this: Previewer, event: Event) {
    /**
     * 这么多的判断多数是没有意义的
     * 只是为了日后可能失效，尽量避免影响原点击事件
     */
    if (!this.#options.includePathname.test(location.pathname)) return
    const artworks = this.#getArtworks()
    if (artworks.length === 0) return
    let index = -1
    // 比较5层深度应该足够了
    event.composedPath().slice(0, 5).find(target => {
      index = artworks.findIndex(artwork => artwork === target)
      return index > -1
    })
    warn(event, index)
    if (index === -1) return
    const originalArtworks = this.#createOriginalImgEls(artworks)
    if (originalArtworks.length === 0) return

    event.preventDefault()
    event.stopPropagation()
    event.stopImmediatePropagation()

    this.#viewer = this.#preview(originalArtworks, {
      initialViewIndex: index,
    })
  }

  /**
   * 获取要预览图片的节点
   */
  #getArtworks() {
    return [...$$(this.#el)] as HTMLImageElement[]
  }

  /**
   * 将getArtworks的图片转成原图
   * @param {nodes}
   * @return {nodes}
   */
  #createOriginalImgEls(imgEls: HTMLImageElement[]) {
    return imgEls.reduce((acc, img) => {
      const parentNode = img.parentNode as HTMLAnchorElement
      // 原图在其父级a标签href上
      if (parentNode.tagName === 'A') {
        const image = new Image()
        image.src = parentNode.href
        image.alt = img.alt
        acc.push(image)
      }

      return acc
    }, <HTMLImageElement[]>[])
  }

  /**
   * 预览
   * @param {nodes}
   * @param {object} viewerOpts
   * @return {viewer}
   */
  #preview(imgEls: HTMLImageElement[], viewerOpts: Viewer.Options) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    const container = document.createElement('div')
    container.append(...imgEls)
    viewerOpts = Object.assign({
      navbar: imgEls.length > 1,
      loop: false,
      zoomRatio: 0.5,
      minZoomRatio: 0.1,
      maxZoomRatio: 1.5,
      viewed(this: any) {
        this.viewer.tooltip()
      },
      // 销毁
      hide() {
        self.#viewer = undefined
      },
      hidden(this: any) {
        this.viewer.destroy()
      },
    }, viewerOpts)

    const viewer = new Viewer(container, viewerOpts)
    viewer.show()
    warn('viewer:', container, viewer)
    return viewer
  }
}
