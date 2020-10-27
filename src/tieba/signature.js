/* global MD5 */

// 模拟的app版本
export const FAKE_VERSION = '11.8.8.0'

/**
 * 模拟APP参数
 * @param {object} obj
 * @return {object}
 */
export function makeFakeParams(obj) {
  return Object.assign({
    // 以下可选参数 为了模拟更加真实
    _client_type: 4, // 不要更改
    _client_version: FAKE_VERSION,
    _phone_imei: '0'.repeat(15),
    model: 'HUAWEI P40', // HUAWEI加油 ヾ(◍°∇°◍)ﾉﾞ
    net_type: 1,
    stErrorNums: 1,
    stMethod: 1,
    stMode: 1,
    stSize: 320,
    stTime: 117,
    stTimesNum: 1,
    timestamp: Date.now(),
  }, obj)
}

/**
 * 贴吧参数签名函数
 * @param {object} payload
 * @param {boolean} isFake true时会加入模拟APP参数
 * @return {string}
 */
export function signature(payload, isFake = true) {
  if (isFake) {
    payload = makeFakeParams(payload)
  }
  // 提交内容所有name-value按照name的字典序升序排列
  const sortKeys = Object.keys(payload).sort()
  // 所有内容按照key=value拼接
  let str = sortKeys.reduce((acc, key) => (acc += `${key}=${payload[key]}`), '')
  // 拼接后补充
  str += 'tiebaclient!!!'
  // 最后以UTF-8编码进行MD5
  return MD5(str)
}
