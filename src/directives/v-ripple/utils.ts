/**
 * 计算一个点离矩形中心点的距离
 * @param width 矩形宽
 * @param height 矩形高
 * @return (left top 在矩形内点的坐标) => {} => () => {} 距离
 */
export function calcDiagInRect(width: number, height: number) {
  const halfWidth = width / 2
  const halfHeight = height / 2

  return function(left: number, top: number) {
    const a = left <= halfWidth
      ? halfWidth - left
      : left - halfWidth
    const b = top <= halfHeight
      ? halfHeight - top
      : top - halfHeight
    const c = Math.sqrt((a * a) + (b * b))
    return c
  }
}

/**
 * 计算当前值离总值中心的位置 越靠近中心值为1，远离中心值为0
 * @param value 当前值
 * @param extent 总值
 * @return 取值 0-1
 * @example value：50 extent：100 则计算 50 在 0-100 中的位置返回 1
 * value：0 或 100 extent：100 返回 0
 */
export function closeness(value: number, extent: number) {
  if (!value || !extent) return 0

  const half = extent / 2
  return value <= half
    ? value / half
    : 1 - value / extent
}
