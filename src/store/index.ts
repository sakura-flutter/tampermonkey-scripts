/**
 * store
 * @param modulename 会加入 [[modulename]]- 前缀
 * @param local 是否本地存储
 */
function createStore<T extends Record<string, any>>(modulename = '', local = true): T {
  const getRealProp = (property: string) =>
    modulename
      ? `[[${modulename}]]-${property}`
      : property

  const store = new Proxy(<T>{}, {
    get(target, property: string, receiver) {
      const realProp = getRealProp(property)
      const value = local
        ? GM_getValue(realProp)
        : Reflect.get(target, realProp, receiver)
      return value
    },
    set(target, property: string, value, receiver) {
      const realProp = getRealProp(property)
      local
        ? GM_setValue(realProp, value)
        : Reflect.set(target, realProp, value, receiver)
      return true
    },
    deleteProperty(target, property: string) {
      const realProp = getRealProp(property)
      local
        ? GM_deleteValue(realProp)
        : Reflect.deleteProperty(target, realProp)
      return true
    },
  })

  return store
}

export default createStore()
export {
  createStore,
}
