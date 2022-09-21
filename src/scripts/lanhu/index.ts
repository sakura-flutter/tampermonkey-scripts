import { $ } from '@/utils/selector'
import { sleep } from '@/utils/base'
import { checker } from '@/utils/compatibility'
import { createRecorder } from './record'
import { autofill } from './password'
import type { VueHTMLElement } from '@/utils/vue-root'

async function main() {
  if (!checker()) return

  let app: Record<string, any> | undefined
  // 不确保一次可以获取到
  while (!app) {
    app = ($('.whole') as VueHTMLElement)?.__vue__
    await sleep(500)
  }

  const recorder = createRecorder()

  app.$watch('$route', function() {
    autofill()
    // 蓝湖title是动态获取的，可能有延时，延时处理
    setTimeout(recorder.record, 500)
  }, { immediate: true })
}

main()
