import { describe, expect, it } from 'vite-plus/test'
import { parseQQNTUrl } from '../c-pc-qq-com'

describe('parseQQNTUrl', () => {
  it('剥除 QQNT 偶发拼接在 url 末尾的 %2F', () => {
    const search = 'bar=14&url=https://example.com/view?id=123456%2F&foo=293'
    expect(parseQQNTUrl(search)).toBe('https://example.com/view?id=123456')
  })

  it('问题不发生时保留原始 url（无 %2F）', () => {
    const search = 'bar=14&url=https://example.com/view?id=123456&foo=293'
    expect(parseQQNTUrl(search)).toBe('https://example.com/view?id=123456')
  })

  it('链接本就合法以 / 结尾时不被误删', () => {
    const search = 'url=https://example.com/view/'
    expect(parseQQNTUrl(search)).toBe('https://example.com/view/')
  })

  it('合法末尾斜杠叠加 QQNT 的 %2F 时只剥除多余的一个', () => {
    const search = 'url=https://example.com/view/%2F'
    expect(parseQQNTUrl(search)).toBe('https://example.com/view/')
  })

  it('兼容小写 %2f', () => {
    const search = 'url=https://example.com/view?id=123456%2f'
    expect(parseQQNTUrl(search)).toBe('https://example.com/view?id=123456')
  })

  it('URL 自身携带的其它编码字符会被正确解码', () => {
    const search = 'url=https://example.com/a%20b%2Fc'
    expect(parseQQNTUrl(search)).toBe('https://example.com/a b/c')
  })

  it('可处理带前导 ? 的完整 query', () => {
    const search = '?bar=14&url=https://example.com/view?id=123456%2F&foo=293'
    expect(parseQQNTUrl(search)).toBe('https://example.com/view?id=123456')
  })

  it('url 参数缺失时返回 undefined', () => {
    expect(parseQQNTUrl('bar=14&foo=293')).toBeUndefined()
  })

  it('url 参数值为空时返回 undefined', () => {
    expect(parseQQNTUrl('url=')).toBeUndefined()
  })
})
