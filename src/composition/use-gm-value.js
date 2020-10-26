import { onUnmounted, reactive, toRefs } from 'vue'

/**
 * 同GM_getValue且在生命周期内自动GM_addValueChangeListener与GM_removeValueChangeListener，亦提供GM_setValue
 * 暂不提供GM_deleteValue
 * @param {string} name
 * @param {any} defaultValue
 */
export function useGMvalue(name, defaultValue) {
  const state = reactive({
    value: GM_getValue(name, defaultValue),
    old: undefined,
    name,
  })

  onUnmounted(() => {
    GM_removeValueChangeListener(id)
  })

  const id = GM_addValueChangeListener(name, (name, oldVal, newVal) => {
    state.value = newVal
    state.old = oldVal
  })

  function setValue(val) {
    GM_setValue(name, val)
  }

  return {
    ...toRefs(state),
    setValue,
  }
}
