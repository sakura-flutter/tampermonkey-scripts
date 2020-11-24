import { $ } from '@/utils/selector'
import { checker } from '@/utils/compatibility'
import { createRecorder } from './record'
import { autofill } from './password'
import { fixBarHeight } from './bar'

function main() {
  if (!checker()) return

  updateStorage()
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

// 将已保存的旧格式替换为新数据格式
function updateStorage() {
  const records = GM_getValue('records')
  if (!records) return
  let hasDiff = false
  const newRecords = records.map(record => {
    if (record.href) return record
    hasDiff = true
    const PATH = 'https://lanhuapp.com/web/'
    const { hash, queryString, ...rest } = record
    return {
      href: PATH + hash + '?' + queryString,
      ...rest,
    }
  })
  if (hasDiff) {
    GM_setValue('records', newRecords)
  }
}

main()
