import { defineComponent, type PropType } from 'vue'
import './index.scss'

const prefixCls = 'skr-input'

const Input = defineComponent({
  name: 'SkrInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    size: {
      type: String as PropType<'small' | 'normal' | 'large'>,
      validator: (value: string) => ['small', 'normal', 'large'].includes(value),
      default: 'normal',
    },
    scale: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleInput = (event: Event) => {
      // vue 自带的
      if (!(event.target as any).composing) {
        emit('update:modelValue', (event.target as HTMLInputElement).value)
      }
    }

    return () => (
      <input
        class={[prefixCls, `${prefixCls}--${props.size}`, { [`${prefixCls}--scale`]: props.scale }]}
        value={props.modelValue}
        type="text"
        onInput={handleInput}
      />
    )
  },
})

export default Input
