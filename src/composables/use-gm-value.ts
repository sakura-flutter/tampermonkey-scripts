import { onUnmounted, ref, watch } from 'vue'

/**
 * 同 GM_getValue、GM_setValue
 */
export function useGMvalue<T>(
  name: string,
  defaultValue: T,
  _options?:
    | boolean
    | {
        /** 用于页面间同步 */
        listening?: boolean
        /** vue watch.deep */
        deep?: boolean
      },
) {
  const { listening, deep } = Object.assign(
    {
      listening: typeof _options === 'boolean' ? _options : true,
      deep: false,
    },
    _options,
  )

  const value = ref(GM_getValue(name, defaultValue))
  watch(
    value,
    () => {
      GM_setValue(name, value.value)
    },
    { deep },
  )

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
