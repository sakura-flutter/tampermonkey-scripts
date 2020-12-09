import { onUnmounted, ref, watch } from 'vue'

/**
 * 同GM_getValue、GM_setValue
 * @param {string} name
 * @param {any} defaultValue
 * @param {boolean} listening
 * @return {any}
 */
export function useGMvalue(name, defaultValue, listening = true) {
  const value = ref(GM_getValue(name, defaultValue))
  watch(value, () => { GM_setValue(name, value.value) })

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
