import { watchEffect } from 'vue'
import { mountComponent } from '@monkey/shared/utils'
import { useGMvalue } from '@monkey/shared/composables'
import { Button } from '@monkey/shared/components'
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
