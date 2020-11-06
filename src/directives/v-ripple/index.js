import { calcDiagInRect } from './utils'
import './index.scss'

const containerClassname = 'skr-ripple-container'
const rippleClassname = 'skr-ripple'
const vmap = new WeakMap()

/**
 * 创建容器元素
 */
function createRippleContainer() {
  const div = document.createElement('div')
  div.classList.add(containerClassname)
  return div
}
/**
 * 创建涟漪元素
 */
function createRippleEl() {
  const span = document.createElement('div')
  span.classList.add(rippleClassname)
  return span
}
function checkOptions(options = {}) {
  if (typeof options === 'boolean') {
    return {
      disabled: !options,
    }
  }
  return options
}

/**
 * 添加涟漪效果
 * @param {object} options color颜色 disabled禁用   布尔值时false为禁用
 */
const addRippleEffect = function(options = {}) {
  options = checkOptions(options)
  // 涟漪个数
  let count = 0

  function listener(event) {
    if (options.disabled) return
    const { currentTarget } = event

    // 优化: 处理过后不再调用getComputedStyle
    if (vmap.get(currentTarget).position === false) {
      vmap.get(currentTarget).position = true
      // 注意：会改变当前元素定位方式
      if (getComputedStyle(currentTarget).position === 'static') {
        currentTarget.style.position = 'relative'
      }
    }

    const rect = currentTarget.getBoundingClientRect()
    const rippleEl = createRippleEl()
    // 取元素长的一边作为涟漪的周长
    const side = Math.max(rect.width, rect.height)
    const radius = side / 2
    // 鼠标在元素中的坐标
    const left = event.pageX - rect.left - window.scrollX
    const top = event.pageY - rect.top - window.scrollY

    // 选项加入到元素中
    rippleEl.style.background = options.color
    rippleEl.style.width = side + 'px'
    rippleEl.style.height = side + 'px'
    // 元素定位再各减自身的宽高一半
    rippleEl.style.top = top - radius + 'px'
    rippleEl.style.left = left - radius + 'px'
    // 动画在元素中间扩散时基础时长1.5s，当点击范围处于元素边缘时，动画扩散比在元素中间位置要长，所以要加快动画进行
    const base = 1.5
    const diagonal = calcDiagInRect(rect.width, rect.height)(left, top)
    rippleEl.style.animationDuration = base - base * diagonal / side + 's'

    let container = currentTarget.querySelector(`.${containerClassname}`)
    if (!container) {
      container = createRippleContainer()
      currentTarget.appendChild(container)
    }
    container.appendChild(rippleEl)
    count++

    const unlisten = (() => {
      const leaveEvents = ['mouseup', 'mouseleave']
      const listener = () => {
        // 为了尽量能看清动画效果，延时一下再进行透明
        setTimeout(() => {
          rippleEl.style.opacity = 0
        }, 100)
      }
      leaveEvents.forEach(eventname => currentTarget.addEventListener(eventname, listener))

      return () => {
        leaveEvents.forEach(eventname => currentTarget.removeEventListener(eventname, listener))
      }
    })()

    // 移除涟漪元素
    rippleEl.addEventListener('transitionend', transEvent => {
      if (transEvent.propertyName === 'opacity') {
        unlisten()
        rippleEl.remove()
        // 没有涟漪元素时移除容器
        if (--count <= 0) {
          container.remove()
        }
      }
    })
  }

  // 更新配置项
  function update(newOpts) {
    options = Object.assign({}, options, checkOptions(newOpts))
  }

  return {
    listener,
    update,
  }
}

const vRipple = {
  mounted(el, binding) {
    const { listener, update } = addRippleEffect(binding.value)
    vmap.set(el, {
      listener,
      update, // 更新配置项函数
      position: false, // 是否已经改变了el的定位方式
    })
    el.addEventListener('mousedown', listener, false)
  },
  updated(el, binding) {
    const val = vmap.get(el)
    val.update(binding.value)
  },
}

export default vRipple
