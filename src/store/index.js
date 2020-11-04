/**
 * store
 * @param {string} modulename key会加入modulename_前缀
 * @param {boolean} local 是否本地存储
 * @return {proxy}
 */
function createStore(modulename = '', local = true) {
  const getRealProp = property =>
    modulename
      ? `${modulename}_${property}`
      : property

  const handler = {
    get(target, property) {
      const realProp = getRealProp(property)
      const value = local
        ? GM_getValue(realProp)
        : target[realProp]
      return value
    },
    set(target, property, value) {
      const realProp = getRealProp(property)
      local
        ? GM_setValue(realProp, value)
        : (target[realProp] = value)
      return true
    },
    deleteProperty(target, property) {
      const realProp = getRealProp(property)
      local
        ? GM_deleteValue(realProp)
        : delete target[realProp]
      return true
    },
  }
  const store = new Proxy({}, handler)
  return store
}

export default createStore()
export {
  createStore,
}
