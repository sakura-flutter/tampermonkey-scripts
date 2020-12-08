import { createApp, watchEffect } from 'vue'
import { useGMvalue } from '@/composables/use-gm-value'
import { Button } from '@/components'
import styles from './hide.lazy.scss'
import './ui.scss'

const app = createApp({
  setup() {
    const { value: hidden, setValue: setHidden } = useGMvalue('menu_hidden', false)
    watchEffect(() => {
      hidden.value ? styles.use() : styles.unuse()
    })

    function toggle() {
      setHidden(!hidden.value)
    }

    return () => (
      <Button
        id="hide-menu-control-js"
        size="mini"
        shadow
        onClick={toggle}
      >
        <p>切换</p>
      </Button>
    )
  },
})

const rootContainer = document.createElement('div')
app.mount(rootContainer)
document.body.appendChild(rootContainer)
