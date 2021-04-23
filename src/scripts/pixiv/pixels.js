import { $$ } from '@/utils/selector'
import { onVisible } from '@/utils/visibility-state'

export default function attachPixels(el, options) {
  options = Object.assign({
    includePathname: null,
  }, options)
  const ws = new WeakSet()

  onVisible(() => {
    if (!options.includePathname.test(location.pathname)) return

    $$(el).forEach(img => {
      if (ws.has(img)) return

      // 获取原尺寸
      let [width, height] = [
        img.getAttribute('width'),
        img.getAttribute('height'),
      ]
      if (width === null || height === null) return

      [width, height] = [+width, +height]
      img.parentElement.style.position = 'relative'
      const elem = createPixelsElement(img.parentElement)
      elem.innerText = `${width} × ${height} (${calcRectCoincide(width, height).percent})`
      ws.add(img)
    })
  })
}

function createPixelsElement(parentElement) {
  const classname = 'artwork-pixels'

  for (const child of parentElement.children) {
    if (child.classList.contains(classname)) return child
  }

  // 没有则插入一个
  const elem = document.createElement('span')
  elem.classList.add(classname)
  elem.style = [
    'position: absolute',
    'z-index: 1',
    'top: 32px',
    'right: 8px',
    'padding: 0 4px',
    'border-radius: 8px',
    'font-size: 12px',
    'line-height: initial',
    'color: #fff',
    'background: rgb(0 0 0 / 0.32)',
  ].join(';')
  parentElement.prepend(elem)
  return elem
}

// 计算图片与屏幕吻合度
function calcRectCoincide(width, height) {
  const { width: sw, height: sh } = window.screen
  const rectRate = width / height
  const screenRate = sw / sh
  let rate

  if (rectRate >= screenRate) {
    rate = screenRate / rectRate
  } else {
    rate = rectRate / screenRate
  }

  // 图片小于屏幕尺寸，降低值
  if (width < sw && height < sh) {
    rate *= (width / sw) * (height / sh)
  }

  // 符合屏幕比例且超过屏幕尺寸的图片，提高值
  // 接近比例也算符合
  if (rate >= 0.99) {
    if (width > sw) {
      rate *= width / sw
    } else if (height > sh) {
      rate *= height / sh
    }
  }

  return {
    rate,
    percent: (rate * 100).toFixed(0) + '%',
  }
}
