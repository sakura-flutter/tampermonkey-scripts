import { watchEffect } from 'vue'
import { mountComponent } from '@/utils/mount-component'
import { useGMvalue } from '@/composables/use-gm-value'
import Button from '@/components/button'
import styles from './hide.lazy.scss'
import './ui.scss'

mountComponent({
  setup() {
    const hidden = useGMvalue('menu_hidden', false)
    watchEffect(() => {
      hidden.value ? styles.use() : styles.unuse()
    })

    function toggle() {
      hidden.value = !hidden.value
    }

    return () => (
      <Button id="hide-menu-control-js" size="mini" shadow onClick={toggle}>
        <p>切换</p>
      </Button>
    )
  },
})
