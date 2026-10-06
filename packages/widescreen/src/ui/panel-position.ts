import type { PanelPosition } from '../core/types'

/** 面板与视口边缘保持的最小间距，避免面板被拖到屏幕外。 */
const POSITION_MARGIN = 8

/** 开始拖动所需的最小指针移动距离，避免普通点击被误判为拖动。 */
const DRAG_THRESHOLD = 4

function getViewportSize() {
  const root = document.documentElement

  return {
    // clientWidth/clientHeight 不包含滚动条，适合用于 fixed 元素的边界计算。
    width: root.clientWidth || window.innerWidth,
    height: root.clientHeight || window.innerHeight,
  }
}

function getPanelLimits(panel: HTMLElement) {
  const rect = panel.getBoundingClientRect()
  const viewport = getViewportSize()

  return {
    horizontal: Math.max(POSITION_MARGIN, viewport.width - rect.width - POSITION_MARGIN),
    vertical: Math.max(POSITION_MARGIN, viewport.height - rect.height - POSITION_MARGIN),
  }
}

function clampCoordinate(value: number, maximum: number) {
  return Math.min(Math.max(value, POSITION_MARGIN), maximum)
}

/** 应用持久化的右侧和顶部偏移，并清除临时拖动坐标。 */
export function applyPanelPosition(panel: HTMLElement, position: PanelPosition) {
  panel.style.left = 'auto'
  panel.style.right = `${position.right}px`
  panel.style.top = `${position.top}px`
  panel.style.bottom = 'auto'
}

/** 清除面板的全部内联定位，让它恢复到样式表中的默认位置。 */
export function clearPanelPosition(panel: HTMLElement) {
  panel.style.removeProperty('left')
  panel.style.removeProperty('right')
  panel.style.removeProperty('top')
  panel.style.removeProperty('bottom')
}

/** 将持久化位置限制在当前视口内，并返回不会越界的新位置。 */
export function clampPanelPosition(panel: HTMLElement, position: PanelPosition): PanelPosition {
  const limits = getPanelLimits(panel)

  return {
    right: clampCoordinate(position.right, limits.horizontal),
    top: clampCoordinate(position.top, limits.vertical),
  }
}

/** 为面板安装指针拖动，并返回移除监听器和临时状态的清理函数。 */
export function createPanelDrag(options: {
  panel: HTMLElement
  handle: HTMLElement
  getPosition: () => PanelPosition | null
  setPosition: (position: PanelPosition) => void
  onDragStateChange?: (dragging: boolean) => void
}) {
  let activePointerId: number | null = null
  let startX = 0
  let startY = 0
  let startLeft = 0
  let startTop = 0
  let originPosition: PanelPosition | null = null
  let hasMoved = false
  let reclampFrame: number | null = null

  // 持久化使用 right/top，拖动过程中则使用实际矩形转换出的坐标。
  const positionFromRect = (rect: DOMRect): PanelPosition => ({
    right: getViewportSize().width - rect.right,
    top: rect.top,
  })

  // 拖动过程中使用 left/top，避免面板宽度变化时改变定位锚点。
  const applyDragPosition = (left: number, top: number) => {
    options.panel.style.left = `${left}px`
    options.panel.style.right = 'auto'
    options.panel.style.top = `${top}px`
    options.panel.style.bottom = 'auto'
  }

  // 每次移动都重新测量当前尺寸，因为悬停展开会改变面板宽度。
  const clampDragPosition = (left: number, top: number) => {
    const limits = getPanelLimits(options.panel)

    return {
      left: clampCoordinate(left, limits.horizontal),
      top: clampCoordinate(top, limits.vertical),
    }
  }

  const reclamp = () => {
    const position = options.getPosition()
    if (!position) return

    // 基于当前布局重新计算位置，不改变悬停或拖动状态。
    const clamped = clampPanelPosition(options.panel, position)
    applyPanelPosition(options.panel, clamped)
  }

  const releasePointerCapture = () => {
    if (activePointerId !== null && options.handle.hasPointerCapture(activePointerId)) {
      options.handle.releasePointerCapture(activePointerId)
    }
  }

  const restoreOrigin = () => {
    if (!hasMoved) return

    options.panel.classList.remove('is-dragging')
    if (originPosition) applyPanelPosition(options.panel, originPosition)
    else clearPanelPosition(options.panel)
    options.onDragStateChange?.(false)
  }

  const resetDragState = () => {
    activePointerId = null
    originPosition = null
    hasMoved = false
  }

  const finish = (event: PointerEvent) => {
    if (activePointerId !== event.pointerId) return

    if (hasMoved) {
      // 将临时的 left/top 拖动位置转换回持久化的 right/top。
      const rect = options.panel.getBoundingClientRect()
      const position = clampPanelPosition(options.panel, positionFromRect(rect))
      applyPanelPosition(options.panel, position)
      options.setPosition(position)
      options.panel.classList.remove('is-dragging')
      options.onDragStateChange?.(false)
    }

    releasePointerCapture()
    resetDragState()
  }

  const cancel = (event: PointerEvent) => {
    if (activePointerId !== event.pointerId) return

    releasePointerCapture()
    restoreOrigin()
    resetDragState()
  }

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0 || activePointerId !== null) return

    event.preventDefault()
    activePointerId = event.pointerId
    originPosition = options.getPosition()
    hasMoved = false
    startX = event.clientX
    startY = event.clientY
    // 在拖动状态可能改变面板宽度前，记录当前布局。
    const rect = options.panel.getBoundingClientRect()
    startLeft = rect.left
    startTop = rect.top
    options.handle.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: PointerEvent) => {
    if (activePointerId !== event.pointerId) return

    const deltaX = event.clientX - startX
    const deltaY = event.clientY - startY
    if (!hasMoved && Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD) return

    if (!hasMoved) {
      options.panel.classList.add('is-dragging')
      options.onDragStateChange?.(true)

      // 在应用指针位移前锁定展开后的当前矩形，避免拖动状态改变面板宽度时
      // 再次叠加用于跨过阈值的那段位移。
      const rect = options.panel.getBoundingClientRect()
      const lockedPosition = clampDragPosition(rect.left, rect.top)
      applyDragPosition(lockedPosition.left, lockedPosition.top)
      startX = event.clientX
      startY = event.clientY
      startLeft = lockedPosition.left
      startTop = lockedPosition.top
      hasMoved = true
      return
    }

    const position = clampDragPosition(startLeft + deltaX, startTop + deltaY)
    applyDragPosition(position.left, position.top)
  }

  const onPointerUp = (event: PointerEvent) => finish(event)
  const onPointerCancel = (event: PointerEvent) => cancel(event)
  const onPanelPointerEnter = () => {
    if (activePointerId !== null || reclampFrame !== null) return

    reclampFrame = requestAnimationFrame(() => {
      reclampFrame = null
      reclamp()
    })
  }
  const onResize = () => {
    if (activePointerId !== null) return

    reclamp()
  }

  options.handle.addEventListener('pointerdown', onPointerDown)
  options.handle.addEventListener('pointermove', onPointerMove)
  options.handle.addEventListener('pointerup', onPointerUp)
  options.handle.addEventListener('pointercancel', onPointerCancel)
  options.panel.addEventListener('pointerenter', onPanelPointerEnter)
  window.addEventListener('resize', onResize)

  reclamp()

  return () => {
    options.handle.removeEventListener('pointerdown', onPointerDown)
    options.handle.removeEventListener('pointermove', onPointerMove)
    options.handle.removeEventListener('pointerup', onPointerUp)
    options.handle.removeEventListener('pointercancel', onPointerCancel)
    options.panel.removeEventListener('pointerenter', onPanelPointerEnter)
    window.removeEventListener('resize', onResize)
    if (reclampFrame !== null) cancelAnimationFrame(reclampFrame)
    if (activePointerId !== null) {
      releasePointerCapture()
      restoreOrigin()
      resetDragState()
    }
  }
}
