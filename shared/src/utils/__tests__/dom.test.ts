import { afterEach, describe, expect, it, vi } from 'vite-plus/test'
import { parseToDOM } from '../dom'

describe('parseToDOM', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('创建 div、写入 HTML 并返回子节点', () => {
    const childNodes = [{ nodeName: 'SPAN' }] as unknown as NodeListOf<ChildNode>
    const element = { childNodes, innerHTML: '' }
    const createElement = vi.fn(() => element)
    vi.stubGlobal('document', { createElement })

    const result = parseToDOM('<span>content</span>')

    expect(createElement).toHaveBeenCalledWith('div')
    expect(element.innerHTML).toBe('<span>content</span>')
    expect(result).toBe(childNodes)
  })

  it('传入 null 时保持容器内容不变', () => {
    const element = { childNodes: [], innerHTML: 'unchanged' }
    vi.stubGlobal('document', { createElement: vi.fn(() => element) })

    expect(parseToDOM(null)).toBe(element.childNodes)
    expect(element.innerHTML).toBe('unchanged')
  })
})
