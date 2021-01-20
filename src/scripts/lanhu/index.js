import { $ } from '@/utils/selector'
import { checker } from '@/utils/compatibility'
import { createRecorder } from './record'
import { autofill } from './password'
import { fixBarHeight } from './bar'

function main() {
  if (!checker()) return

  fixBarHeight()

  const app = $('.whole').__vue__
  if (!app) {
    console.warn('蓝湖脚本：获取vue失败')
    return
  }
  const recorder = createRecorder()

  app.$watch('$route', function(to, from) {
    autofill()
    // 蓝湖title是动态获取的，可能有延时，延时处理
    setTimeout(recorder.record, 500)
  }, { immediate: true })
}

main()
