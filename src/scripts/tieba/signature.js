/* global MD5 */

export const FAKE_VERSION = '11.8.8.0'

export function makeFakeParams(obj) {
  return Object.assign({
    _client_type: 4, // prohibit
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

export function signature(payload, isFake = true) {
  if (isFake) {
    payload = makeFakeParams(payload)
  }
  const sortKeys = Object.keys(payload).sort()
  let str = sortKeys.reduce((acc, key) => (acc += `${key}=${payload[key]}`), '')
  str += 'tiebaclient!!!'
  return MD5(str)
}
