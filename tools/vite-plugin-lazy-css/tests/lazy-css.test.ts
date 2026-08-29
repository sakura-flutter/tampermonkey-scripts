import { afterEach, describe, expect, it } from 'vite-plus/test'
import type { TransformResult } from 'vite'
import lazyCss, { createLazyStyle } from '../src'

describe('lazy CSS transform', () => {
  it('turns a lazy stylesheet import into a counted style module', async () => {
    const plugin = lazyCss()
    const transform = (typeof plugin.transform === 'function'
      ? plugin.transform
      : plugin.transform?.handler) as unknown as (
      code: string,
      id: string,
    ) => string | TransformResult | Promise<string | TransformResult>
    const result = await transform("import styles from './panel.lazy.scss'\nstyles.use()", '/workspace/src/index.ts')
    const code = typeof result === 'string' ? result : result?.code

    expect(code).toContain("import __lazyCss0 from './panel.lazy.scss?inline';")
    expect(code).toContain('import { createLazyStyle as __createLazyStyle0 } from "virtual:monkey-lazy-css-runtime";')
    expect(code).toContain('const styles = __createLazyStyle0(__lazyCss0);')
    expect(code).toContain('styles.use()')
  })
})

describe('lazy CSS runtime', () => {
  const originalDocument = globalThis.document

  afterEach(() => {
    Object.defineProperty(globalThis, 'document', {
      configurable: true,
      value: originalDocument,
    })
  })

  it('inserts on the first use and removes after the last unuse', () => {
    const elements: Array<{ textContent: string | null; remove: () => void }> = []
    const head = {
      appendChild(element: (typeof elements)[number]) {
        elements.push(element)
      },
    }
    Object.defineProperty(globalThis, 'document', {
      configurable: true,
      value: {
        createElement() {
          const element = {
            textContent: null,
            remove() {
              elements.splice(elements.indexOf(element), 1)
            },
          }
          return element
        },
        head,
        documentElement: head,
      },
    })

    const styles = createLazyStyle('body { color: red; }')
    styles.unuse()
    styles.use()
    styles.use()
    expect(elements).toHaveLength(1)
    expect(elements[0].textContent).toBe('body { color: red; }')

    styles.unuse()
    expect(elements).toHaveLength(1)
    styles.unuse()
    expect(elements).toHaveLength(0)
  })
})
