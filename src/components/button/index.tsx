import { defineComponent, computed, type PropType } from 'vue'
import { vRipple, type RippleOptions } from '@/directives'
import './index.scss'

const prefixCls = 'skr-button'
// button type 非 default 时覆盖一层白色
const rippleColor = 'rgb(255 255 255 / 15%)'

const Button = defineComponent({
  name: 'SkrButton',
  directives: {
    ripple: vRipple,
  },
  props: {
    type: {
      type: String as PropType<'primary' | 'info' | 'warning' | 'danger' | 'default'>,
      validator: (value: string) => ['primary', 'info', 'warning', 'danger', 'default'].includes(value),
      default: 'default',
    },
    plain: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<'mini' | 'small' | 'normal' | 'large'>,
      validator: (value: string) => ['mini', 'small', 'normal', 'large'].includes(value),
      default: 'normal',
    },
    // 涟漪效果 object 时参数会透传给 ripple
    ripple: {
      type: [Boolean, Object] as PropType<RippleOptions>,
      default: true,
    },
  },
  setup(props, { slots }) {
    const rippleOptions = computed(() => {
      return Object.assign(
        {}, {
          color: props.type === 'default' ? undefined : rippleColor,
        },
        typeof props.ripple === 'boolean' ? { disabled: !props.ripple } : props.ripple,
      )
    })

    return () => (
      <button
        class={[
          prefixCls,
          `${prefixCls}--${props.type}`,
          {
            [`${prefixCls}--round`]: props.round,
            [`${prefixCls}--shadow`]: props.shadow,
          },
          `${prefixCls}--${props.size}`,
        ]}
        v-ripple={rippleOptions.value}
      >
        {slots.default?.()}
      </button>
    )
  },
})

export default Button
