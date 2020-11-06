/**
 * 计算一个点离矩形中心点的距离
 * @param {number} width 矩形宽
 * @param {number} height 矩形高
 * @return {function} function(left top 在矩形内点的坐标) @return {number} 距离
 */
export function calcDiagInRect(width, height) {
  const halfWidth = width / 2
  const halfHeight = height / 2

  return function(left, top) {
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
 * 例如：value:50 extent:100 则计算50在0-100中的位置返回1
 * value:0或100 extent:100 返回0
 * @param {number} value 当前值
 * @param {number} extent 总值
 * @return {number} 取值0-1
 */
export function closeness(value, extent) {
  if (!value || !extent) return 0

  const half = extent / 2
  return value <= half
    ? value / half
    : 1 - value / extent
}
