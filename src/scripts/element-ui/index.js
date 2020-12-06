import { nextTick } from 'vue'
import { $ } from '@/utils/selector'
import { checker } from '@/utils/compatibility'
import { getVueRoot } from '@/utils/vue-root'
import { warn } from '@/utils/log'
import Catalogue from './catalogue'

function main() {
  if (!checker()) return

  const { instance } = getVueRoot($('#app'))
  if (!instance) return
  warn(instance)

  const catalogue = new Catalogue({
    // 注意：选择器要同时兼容element与element plus文档
    scope: '.page-container .page-component__content section.element-doc > h3',
  })

  let unwatch = null
  instance.$watch('$route', function(to, from) {
    nextTick(() => {
      const target = $('.page-component__content')
      if (target && unwatch == null) {
        unwatch = watchDocs(target)
      } else if (!target) {
        unwatch?.()
        unwatch = null
      }
    })
  }, { immediate: true })

  function watchDocs(target) {
    catalogue.update()
    const observer = new MutationObserver(() => catalogue.update())
    observer.observe(target, {
      subtree: true,
      childList: true,
    })

    return () => {
      observer.disconnect()
      catalogue.update()
    }
  }
}

// 非国内链接打开较慢，防止未完成加载
setTimeout(main, 500)
