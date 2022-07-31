import { nextTick } from 'vue'
import { sleep } from '@/utils/base'
import { $ } from '@/utils/selector'
import { checker } from '@/utils/compatibility'
import { getVueRoot, type VueHTMLElement } from '@/utils/vue-root'
import { warn } from '@/utils/log'
import Catalogue from './catalogue'

async function main() {
  if (!checker()) return

  let instance: unknown
  // 非国内链接打开较慢，防止未完成加载
  while (instance == null) {
    ({ instance } = getVueRoot($('#app')!))
    await sleep(500)
  }
  warn(instance)
  // element-plus 已支持
  if (($('#app') as VueHTMLElement).__vue_app__) return

  const catalogue = new Catalogue({
    // 注意：选择器要同时兼容element与element plus文档
    scope: '.page-container .page-component__content section.element-doc > h3',
  })

  let unwatch: (() => void) | undefined
  (instance as any).$watch('$route', function() {
    nextTick(() => {
      const target = $('.page-component__content')
      if (target && unwatch == null) {
        unwatch = watchDocs(target)
      } else if (!target) {
        unwatch?.()
        unwatch = undefined
      }
    })
  }, { immediate: true })

  function watchDocs(target: Node) {
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

main()
