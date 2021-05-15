import styles from './index.lazy.scss'

export const csdn = ({ store, createControl }) => ({
  handler() {
    createControl({
      store,
      execute() {
        // 关闭登录弹窗
        document.cookie = `unlogin_scroll_step=${Date.now()};domain=.csdn.net;path=/`

        styles.use()
      },
    })
  },
})
