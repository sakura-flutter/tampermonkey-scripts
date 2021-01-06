import { $$ } from '@/utils/selector'
import { warn } from '@/utils/log'

/* global Viewer */

function main() {
  GM_addStyle(GM_getResourceText('viewerCSS'))

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
    if (!this.#options.includePathname.test(location.pathname)) return
    const artworks = this.#getArtworks()
    if (artworks.length === 0) return
    const index = event.composedPath().findIndex(target => artworks.includes(target))
    if (index === -1) return
    warn(event, index)

    event.preventDefault()
    event.stopPropagation()
    event.stopImmediatePropagation()

    this.#viewer = this.#preview(this.#createOriginalImgEls(artworks), {
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
    /* 不要用reduce，webpack生成的代码太多 */
    const originalImgEls = []
    for (const img of imgEls) {
      // 原图在其父级a标签href上
      const { parentNode } = img
      if (parentNode.tagName !== 'A') continue
      const image = new Image()
      image.src = parentNode.href
      originalImgEls.push(image)
    }
    return originalImgEls
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
    }, viewerOpts)
    const viewer = new Viewer(container, viewerOpts)
    viewer.show()
    warn('viewer:', container, viewer)
    return viewer
  }
}

main()
