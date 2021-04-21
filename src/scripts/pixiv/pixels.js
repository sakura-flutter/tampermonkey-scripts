import { $$ } from '@/utils/selector'

export default function attachPixels(el) {
  const ws = new WeakSet()
  function handler() {
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
      elem.innerText = `${width} × ${height} (${calcRectPercent(width, height)})`
      ws.add(img)
    })
  }

  const scheduling = (function() {
    let intervalId
    return function() {
      clearInterval(intervalId)
      if (document.visibilityState === 'hidden') return
      handler()
      intervalId = setInterval(handler, 800)
    }
  })()

  scheduling()
  document.addEventListener('visibilitychange', scheduling)
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

// 计算图片屏占比
function calcRectPercent(width, height) {
  const [sw, sh] = [screen.width, screen.height]
  let ratio
  if (width >= sw || height >= sh) {
    ratio = (width / height) / (sw / sh)
  } else {
    ratio = (width * height) / (sw * sh)
  }
  return (ratio * 100).toFixed(0) + '%'
}
