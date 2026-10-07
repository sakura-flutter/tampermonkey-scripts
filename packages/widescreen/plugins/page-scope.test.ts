import postcss from 'postcss'
import { describe, expect, it } from 'vite-plus/test'
import { pageScopePlugin } from './page-scope'

async function processStyles(css: string, from = 'style.lazy.scss') {
  const result = await postcss([pageScopePlugin()]).process(css, { from })
  return result.css
}

describe('宽屏页面作用域插件', () => {
  it('为选择器列表添加作用域，且不拆分函数选择器参数', async () => {
    const css = await processStyles('body .article, :is(.main, .aside), [data-label="a,b"] { color: red }')

    expect(css).toBe(':root body .article, :root :is(.main, .aside), :root [data-label="a,b"] { color: red }')
  })

  it('为根选择器追加一个 :root 以提高特异性', async () => {
    const css = await processStyles(':root:root, html > body { color: red }')

    expect(css).toBe(':root:root:root, html:root > body { color: red }')
  })

  it('为单独的 :root 选择器追加一个 :root', async () => {
    const css = await processStyles(':root { color: red }')

    expect(css).toBe(':root:root { color: red }')
  })

  it('在 html 选择器后追加 :root 以提高特异性', async () => {
    const css = await processStyles('html.main, :root > body { color: red }')

    expect(css).toBe('html:root.main, :root:root > body { color: red }')
  })

  it('保留 html 属性选择器并在 html 后追加 :root', async () => {
    const css = await processStyles('html[data-theme="dark"] .content { color: red }')

    expect(css).toBe('html:root[data-theme="dark"] .content { color: red }')
  })

  it('处理复杂组合选择器时保持各选择器结构', async () => {
    const css = await processStyles('html:is(.light, .dark) > body, :root[data-mode="wide"] { color: red }')

    expect(css).toBe('html:root:is(.light, .dark) > body, :root:root[data-mode="wide"] { color: red }')
  })

  it('不处理关键帧步骤', async () => {
    const css = await processStyles('@keyframes fade { from { opacity: 0 } to { opacity: 1 } } .content { color: red }')

    expect(css).toBe('@keyframes fade { from { opacity: 0 } to { opacity: 1 } } :root .content { color: red }')
  })

  it('忽略非 lazy 样式表', async () => {
    const css = await processStyles('.panel { color: red }', 'control-panel.scss')

    expect(css).toBe('.panel { color: red }')
  })
})
