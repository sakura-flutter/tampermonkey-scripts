/**
 * 兼容性检查
 * @param {object} param0 & param1 版本, notify
 * @return {boolean} 是否通过
 */
export function checker({ chrome = 80, firefox = 75, notify = true } = {}) {
  const { userAgent } = window.navigator
  const chromeVersion = userAgent.match(/Chrome\/(\d+)/)?.[1]
  const firefoxVersion = userAgent.match(/Firefox\/(\d+)/)?.[1]

  let pass = false
  if (chromeVersion && chromeVersion >= chrome) {
    pass = true
  } else if (firefoxVersion && firefoxVersion >= firefox) {
    pass = true
  }
  if (!pass) {
    notify && Toast.error(`哎呀！遇到错误：不支持的浏览器版本(需要Chrome${chrome}或Firefox${firefox}以上~)，请更新浏览器版本 o(╥﹏╥)o`, 0)
  }
  return pass
}
