import './index.scss'

const containerClassname = 'skr-ripple-container'
const rippleClassname = 'skr-ripple'
const wm = new WeakMap()

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
 * @param {object} options color颜色 disabled禁用   布尔值时为false禁用
 */
const addRippleEffect = function(options = {}) {
  options = checkOptions(options)
  // 涟漪个数
  let count = 0

  function listener(event) {
    if (options.disabled) return

    const { currentTarget, target } = event
    const rect = currentTarget.getBoundingClientRect()
    const rippleEl = createRippleEl()
    // 取元素长的一边作为涟漪的周长
    const side = Math.max(rect.width, rect.height)
    let left = event.offsetX - side / 2
    let top = event.offsetY - side / 2
    // 补充当前触发元素的距离
    if (currentTarget !== target) {
      left += target.offsetLeft
      top += target.offsetTop
    }
    // 选项加入到元素中
    rippleEl.style.background = options.color
    rippleEl.style.width = side + 'px'
    rippleEl.style.height = side + 'px'
    rippleEl.style.top = top + 'px'
    rippleEl.style.left = left + 'px'
    // 动画在元素中间扩散时基础时长1.5s，当点击范围处于元素边缘时，动画扩散比在元素中间位置要长，所以要加快动画进行
    const baseDuration = 1.5
    rippleEl.style.animationDuration = baseDuration - (Math.abs(event.offsetX - side / 2) / side) + 's'

    let container = currentTarget.querySelector(`.${containerClassname}`)
    if (!container) {
      container = createRippleContainer()
      currentTarget.appendChild(container)
    }
    container.appendChild(rippleEl)
    count++

    ;['mouseup', 'mouseleave'].forEach(eventname => {
      currentTarget.addEventListener(eventname, () => {
        // 为了尽量能看清动画效果，延时一下再进行透明
        setTimeout(() => {
          rippleEl.style.opacity = 0
        }, 100)
      })
    })
    // 移除涟漪元素
    rippleEl.addEventListener('transitionend', transEvent => {
      if (transEvent.propertyName === 'opacity') {
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
    wm.set(el, {
      listener,
      update, // 更新配置项函数
      position: false, // 是否已经改变了el的定位方式
    })
    el.addEventListener('mousedown', listener, false)
  },
  updated(el, binding) {
    const val = wm.get(el)
    val.update(binding.value)
    // 优化: 处理过后不再调用getComputedStyle
    if (val.position) return
    val.position = true
    // 注意：会改变当前元素定位方式
    if (getComputedStyle(el).position === 'static') {
      el.style.position = 'relative'
    }
  },
}

export default vRipple
