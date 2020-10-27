/**
 * store
 * @return {proxy} store
 */
function createStore() {
  const handler = {
    get(target, property) {
      let value = target[property]
      if (value == null) {
        value = GM_getValue(property)
        target[property] = value
      }
      return value
    },
    set(target, property, value) {
      target[property] = value
      GM_setValue(property, value)
      return true
    },
    deleteProperty(target, property) {
      const deleted = delete target[property]
      GM_deleteValue(property)
      return deleted
    },
  }
  const store = new Proxy({}, handler)
  return store
}

export default createStore()
