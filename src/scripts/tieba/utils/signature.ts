import MD5 from 'crypto-js/md5'

export const FAKE_VERSION = '11.8.8.0'

type Obj = Record<string, unknown>

export function makeFakeParams(obj?: Obj) {
  // 不要动这些字段
  return Object.assign(
    {
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
    },
    obj,
  )
}

export function sign(payload: Obj) {
  const sortKeys = Object.keys(payload).sort()
  let str = sortKeys.reduce((acc, key) => (acc += `${key}=${payload[key]}`), '')
  str += 'tiebaclient!!!'
  return MD5(str).toString()
}

export function signRequestParams(params: Obj, isFake = true) {
  if (isFake) {
    params = makeFakeParams(params)
  }
  const signed = {
    ...params,
    sign: sign(params),
  }
  return signed
}
