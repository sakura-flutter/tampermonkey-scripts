import { defineComponent } from 'vue'
import './index.scss'

const prefixCls = 'skr-input'

const Input = defineComponent({
  name: 'skr-input',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    size: {
      type: String,
      validator: value => ['small', 'normal', 'large'].includes(value),
      default: 'normal',
    },
    scale: {
      type: Boolean,
      default: false,
    },
  },
  emit: [
    'update:modelValue',
  ],
  setup(props, { emit }) {
    return () => (
      <input
        class={[
          prefixCls,
          `${prefixCls}--${props.size}`,
          { [`${prefixCls}--scale`]: props.scale },
        ]}
        value={props.modelValue}
        type="text"
        onInput={event => emit('update:modelValue', event.target.value)}
      />
    )
  },
})

export default Input
