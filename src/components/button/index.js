import { defineComponent, computed } from 'vue'
import { vRipple } from '@/directives'
import './index.scss'

const prefixCls = 'skr-button'
// 根据button type定义的颜色
const rippleColors = {
  primary: 'rgb(128 208 255 / 0.3)',
}

const Button = defineComponent({
  name: 'skr-button',
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
  directives: {
    ripple: vRipple,
  },
  setup(props, { slots }) {
    const rippleOptions = computed(() => {
      return Object.assign(
        {}, {
          color: rippleColors[props.type],
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
