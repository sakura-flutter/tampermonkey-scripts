import store from '@/store'

// 用来解决类型问题
export default store as {
  BDUSS?: string
  size?: 'small' | 'normal' | 'large'
  /** 列表是否倒序展示 */
  is_reverse?: boolean
  /** 模拟 app */
  is_simulate?: boolean
  /** 自动签到 */
  is_complete?: boolean
}
