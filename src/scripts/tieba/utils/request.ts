import * as qs from '@/utils/querystring'
import { error as logError } from '@/utils/log'

export class ResponseError extends Error {
  readonly name = 'ResponseError'
  response
  info
  constructor(msg = '未知错误', response?: Record<string, any>, info?: any) {
    super(msg)
    this.response = response
    this.info = info
  }
}

/**
 * 跨域请求，依赖 GM_xmlhttpRequest
 *
 * 15s 超时，0 点高峰期失败概率大，BD 是 1 分钟超时，实际上不必等这么久
 */
export function GMRequest<TData = any>(url: string, options: Omit<Tampermonkey.Request, 'url'>) {
  return new Promise<TData>((resolve, reject) => {
    GM_xmlhttpRequest({
      timeout: 1000 * 15,
      ...options,
      url,
      onload(res) {
        let error
        let response
        try {
          response = JSON.parse(res.response)
        } catch {
          response = res.response
        }

        if (response == null) {
          error = new ResponseError('无响应', response, { ...options, ...res })
        } else if (response?.error_code !== '0') {
          error = new ResponseError(response.error_msg, response, { ...options, ...res })
        }

        error ? reject(error) : resolve(response)
      },
      onerror(error) {
        logError.force(error)
        reject(error)
      },
    })
  })
}

GMRequest.post = function <TData = any>(
  url: string,
  data: Tampermonkey.Request['data'],
  options: Omit<Tampermonkey.Request, 'url'>,
) {
  return GMRequest<TData>(url, {
    ...options,
    data,
    method: 'POST',
  })
}

/**
 * 普通请求
 */
export function request<TData = any>(url: RequestInfo | URL, options?: RequestInit): Promise<TData> {
  return fetch(url, options)
    .then(response => response.json())
    .then(resJson => {
      if (resJson.no !== 0) {
        throw new ResponseError(resJson.error, resJson, { url, ...options })
      }
      return resJson
    })
}

request.post = function <TData = any>(url: RequestInfo | URL, data?: any, options: RequestInit = {}) {
  const headers = new Headers(options.headers)
  let body = data
  if (data) {
    if (
      headers.get('Content-Type')?.includes('application/x-www-form-urlencoded') &&
      Object.prototype.toString.call(data) === '[object Object]'
    ) {
      body = qs.stringify(data)
    }
    if (
      headers.get('Content-Type')?.includes('application/json') &&
      Object.prototype.toString.call(data) === '[object Object]'
    ) {
      body = JSON.stringify(data)
    }
  }

  return request<TData>(url, {
    ...options,
    method: 'POST',
    headers,
    body,
  })
}
