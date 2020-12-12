import { onUnmounted, ref, watch } from 'vue'

/**
 * 同GM_getValue、GM_setValue
 * @param {string} name
 * @param {any} defaultValue
 * @param {boolean | object} options: listening, deep
 * @return {any}
 */
export function useGMvalue(name, defaultValue, _options) {
  const { listening, deep } = Object.assign({
    listening: typeof _options === 'boolean' ? _options : true,
    deep: false,
  }, _options)

  const value = ref(GM_getValue(name, defaultValue))
  watch(value, () => { GM_setValue(name, value.value) }, { deep })

  if (listening) {
    onUnmounted(() => {
      GM_removeValueChangeListener(id)
    })
    const id = GM_addValueChangeListener(name, (name, oldVal, newVal) => {
      value.value = newVal
    })
  }

  return value
}
