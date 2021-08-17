import { $ } from '@/utils/selector'
import { sleep } from '@/utils/base'
import { checker } from '@/utils/compatibility'
import { createRecorder } from './record'
import { autofill } from './password'
import { fixBarHeight } from './bar'

async function main() {
  if (!checker()) return

  fixBarHeight()

  let app = null
  // 不确保一次可以获取到
  while (!app) {
    app = $('.whole')?.__vue__
    await sleep(500)
  }

  const recorder = createRecorder()

  app.$watch('$route', function(to, from) {
    autofill()
    // 蓝湖title是动态获取的，可能有延时，延时处理
    setTimeout(recorder.record, 500)
  }, { immediate: true })
}

main()
