import { $$ } from '@/utils/selector'
import { warn } from '@/utils/log'

/* global Viewer */

function main() {
  GM_addStyle(GM_getResourceText('viewerCSS'))
  GM_addStyle([
    '.viewer-backdrop { background-color: rgb(0 0 0 / 0.8) }', // 背景暗一点
    '.viewer-container .viewer-title { text-shadow: 1px 1px 1px #000 }', // 添加标题阴影 在图片是白底时显示得清楚点
  ].join(''))

  // eslint-disable-next-line no-new
  new Previewer('figure [role="presentation"] a img', {
    includePathname: /^\/artworks\/(\w)+/,
  })
}

class Previewer {
  #el
  #options = {
    includePathname: null,
  }

  #viewer = null

  constructor(el, options) {
    this.#process = this.#process.bind(this)
    this.#el = el
    Object.assign(this.#options, options)
    this.#init()
  }

  #init() {
    window.addEventListener('click', this.#process, true)
    window.addEventListener('urlchange', info => {
      warn('urlchange', info)
      if (this.#viewer) {
        this.#viewer.destroy()
        this.#viewer = null
      }
    })
  }

  #process = function(event) {
    /* 这么多的判断多数是没有意义的
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
    // 释放上一次
    this.#viewer?.destroy()
    this.#viewer = this.#preview(originalArtworks, {
      initialViewIndex: index,
    })
  }

  /**
   * 获取要预览图片的节点
   * @return {nodes}
   */
  #getArtworks() {
    return [...$$(this.#el)]
  }

  /**
   * 将getArtworks的图片转成原图
   * @param {nodes}
   * @return {nodes}
   */
  #createOriginalImgEls(imgEls) {
    return imgEls.reduce((acc, img) => {
      const { parentNode } = img
      // 原图在其父级a标签href上
      if (parentNode.tagName === 'A') {
        const image = new Image()
        image.src = parentNode.href
        image.alt = img.alt
        acc.push(image)
      }

      return acc
    }, [])
  }

  /**
   * 预览
   * @param {nodes}
   * @param {object} viewerOpts
   * @return {viewer}
   */
  #preview(imgEls, viewerOpts) {
    const container = document.createElement('div')
    container.append(...imgEls)
    viewerOpts = Object.assign({
      navbar: imgEls.length > 1,
      loop: false,
      zoomRatio: 0.5,
      minZoomRatio: 0.1,
      maxZoomRatio: 1.5,
      viewed() {
        this.viewer.tooltip()
      },
    }, viewerOpts)
    const viewer = new Viewer(container, viewerOpts)
    viewer.show()
    warn('viewer:', container, viewer)
    return viewer
  }
}

main()
