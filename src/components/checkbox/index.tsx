import { defineComponent, ref } from 'vue'
import './index.scss'

const prefixCls = 'skr-checkbox'

const Checkbox = defineComponent({
  name: 'SkrCheckbox',
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
    title: String,
    disabled: Boolean,
  },
  emits: [
    'update:checked',
  ],
  setup(props, { slots, emit }) {
    const inputRef = ref<HTMLInputElement>()
    const handleChange = (event: Event) => {
      emit('update:checked', (event.target as HTMLInputElement).checked)
      // 受控
      inputRef.value!.checked = !!props.checked
    }

    return () => (
      <label class={prefixCls} title={props.title}>
        <input
          ref={inputRef}
          checked={props.checked}
          type="checkbox"
          disabled={props.disabled}
          onChange={handleChange}
        />
        {slots.default?.()}
      </label>
    )
  },
})

export default Checkbox
