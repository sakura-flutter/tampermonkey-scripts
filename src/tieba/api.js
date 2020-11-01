import { stringifyURL } from '@/utils'
import { FAKE_VERSION, makeFakeParams, signature } from './signature'

/**
 * 跨域请求，依赖GM_xmlhttpRequest
 * @param {string} url
 * @param {object} options
 */
function GMRequest(url, options) {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      timeout: 1000 * 15, // 15s超时，0点高峰期失败概率大，BD是1分钟超时，实际上不必等这么久
      ...options,
      url,
      onload(res) {
        try {
          resolve(JSON.parse(res.response))
        } catch (e) {
          resolve(res.response)
        }
      },
      onerror: reject,
    })
  })
}
GMRequest.post = function(url, data, options) {
  return GMRequest(url, {
    ...options,
    data,
    method: 'POST',
  })
}

/**
 * 页面直接发起请求
 * @param {string} url
 * @param {object} options
 */
function request(url, options) {
  return fetch(url, {
    ...options,
  })
}
request.post = function(url, data, options = {}) {
  options.headers = Object.assign({}, options.headers)
  if (data) {
    let body = data
    if (options.headers['Content-Type'].includes('application/x-www-form-urlencoded') && Object.prototype.toString.call(data) === '[object Object]') {
      body = stringifyURL(data)
    }
    if (options.headers['Content-Type'].includes('application/json') && Object.prototype.toString.call(data) === '[object Object]') {
      body = JSON.stringify(data)
    }
    options.body = body
  }

  return request(url, {
    ...options,
    method: 'POST',
  })
}

/* web接口 */
// 获取关注列表
export function getNewmoindex() {
  return request.post('/mo/q/newmoindex')
}

export function doWebSign(params) {
  return request.post('/sign/add',
    {
      ie: 'utf-8',
      ...params,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    },
  )
}

/* app接口 */
// 获取关注列表
export function getForumLike(params) {
  // 签名处理
  params = makeFakeParams(params)
  const paramsSigned = {
    ...params,
    sign: signature(params),
  }
  return GMRequest.post('http://c.tieba.baidu.com/c/f/forum/like', stringifyURL(paramsSigned), {
    headers: {
      'User-agent': `bdtb for Android ${FAKE_VERSION}`,
      Accept: '',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'gzip',
      Cookie: 'ka=open',
    },
  })
}

export function doSign(params) {
  params = makeFakeParams(params)
  const paramsSigned = {
    ...params,
    sign: signature(params),
  }
  return GMRequest.post('http://c.tieba.baidu.com/c/c/forum/sign', stringifyURL(paramsSigned), {
    headers: {
      'User-agent': `bdtb for Android ${FAKE_VERSION}`,
      Accept: '',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'gzip',
      Cookie: 'ka=open',
    },
  })
}
