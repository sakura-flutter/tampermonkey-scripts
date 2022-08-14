import * as qs from '@/utils/querystring'

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
        options.onload?.call(this, res)
        try {
          resolve(JSON.parse(res.response))
        } catch (e) {
          resolve(res.response)
        }
      },
      onerror(error) {
        options.onerror?.call(this, error)
        reject(error)
      },
    })
  })
}

GMRequest.post = function<TData = any>(url: string, data: Tampermonkey.Request['data'], options: Omit<Tampermonkey.Request, 'url'>) {
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
}

request.post = function<TData = any>(url: RequestInfo | URL, data?: any, options: RequestInit = {}) {
  const headers = new Headers(options.headers)
  let body = data
  if (data) {
    if (headers.get('Content-Type')?.includes('application/x-www-form-urlencoded') && Object.prototype.toString.call(data) === '[object Object]') {
      body = qs.stringify(data)
    }
    if (headers.get('Content-Type')?.includes('application/json') && Object.prototype.toString.call(data) === '[object Object]') {
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
