import { defineComponent, computed } from 'vue'
import { vRipple } from '@/directives'
import './index.scss'

const prefixCls = 'skr-button'
// button type非default时覆盖一层白色
const rippleColor = 'rgb(255 255 255 / 15%)'

const Button = defineComponent({
  name: 'SkrButton',
  directives: {
    ripple: vRipple,
  },
  props: {
    type: {
      type: String,
      validator: value => ['primary', 'info', 'warning', 'danger', 'default'].includes(value),
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
      type: String,
      validator: value => ['mini', 'small', 'normal', 'large'].includes(value),
      default: 'normal',
    },
    // 涟漪效果 object时参数会透传给ripple
    ripple: {
      type: [Boolean, Object],
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
        {slots.default()}
      </button>
    )
  },
})

export default Button
