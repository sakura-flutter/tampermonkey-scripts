import { afterEach, describe, expect, it, vi } from 'vite-plus/test'
import { parse, stringify } from '../query-string'

describe('query string 工具函数', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('解析 URL search 参数并解码参数值', () => {
    expect(parse('https://example.com/path?name=hello%20world&empty=')).toEqual({
      name: 'hello world',
      empty: '',
    })
  })

  it('解析 URL hash 中的 search 参数', () => {
    expect(parse('https://example.com/#/route?tab=details&count=2')).toEqual({ tab: 'details', count: '2' })
  })

  it('支持原始 query string、当前 location 和空输入', () => {
    vi.stubGlobal('location', { href: 'https://example.com/?from=location' })

    expect(parse('foo=bar&count=2')).toEqual({ foo: 'bar', count: '2' })
    expect(parse()).toEqual({ from: 'location' })
    expect(parse(null)).toEqual({})
  })

  it('解析没有协议的路径、问号开头和 hash 后的 query string', () => {
    expect(parse('?from=query')).toEqual({ from: 'query' })
    expect(parse('/foo?from=path')).toEqual({ from: 'path' })
    expect(parse('/foo#bar?from=hash')).toEqual({ from: 'hash' })
  })

  it('URL 同时存在 search 和 hash search 时优先使用 search', () => {
    expect(parse('https://example.com/?from=search#/route?from=hash')).toEqual({ from: 'search' })
  })

  it('处理重复参数、加号和编码后的参数名', () => {
    expect(parse('https://example.com/?tag=one&tag=two&full%20name=Jane+Doe')).toEqual({
      tag: 'two',
      'full name': 'Jane Doe',
    })
  })

  it('没有 query 参数时返回空对象或原始键值', () => {
    expect(parse('https://example.com/path')).toEqual({})
    expect(parse('plain=value')).toEqual({ plain: 'value' })
  })

  it('按插入顺序拼接参数并忽略 undefined 值', () => {
    const value = {
      first: 'one',
      empty: null,
      count: 2,
      skipped: undefined,
    } as unknown as Parameters<typeof stringify>[0]

    expect(stringify(value)).toBe('first=one&empty=&count=2')
  })

  it('stringify 将数字和 null 转成字符串且不编码键和值', () => {
    const value = {
      page: 2,
      filter: 'a b',
      empty: null,
    } as unknown as Parameters<typeof stringify>[0]

    expect(stringify(value)).toBe('page=2&filter=a b&empty=')
  })
})
