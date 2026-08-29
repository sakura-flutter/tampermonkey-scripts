import { fileURLToPath, pathToFileURL } from 'node:url'
import type { Plugin, TransformResult } from 'vite'

const runtimeId = 'virtual:monkey-lazy-css-runtime'
const resolvedRuntimeId = `\0${runtimeId}`

// 该转换用于实现 webpack style-loader 的 injectType: 'lazyStyleTag' 行为：
// 导入 .lazy.scss 后返回带有 use/unuse 方法的样式对象，按需插入或移除 style 标签。
const lazyImportPattern = /import\s+([^'";]+?)\s+from\s+(['"])([^'"]+\.lazy\.scss)\2\s*;?/g

function getBinding(importClause: string) {
  const trimmed = importClause.trim()
  if (/^[A-Za-z_$][\w$]*$/.test(trimmed)) return trimmed

  const namespaceMatch = trimmed.match(/^\*\s+as\s+([A-Za-z_$][\w$]*)$/)
  if (namespaceMatch) return namespaceMatch[1]

  const defaultMatch = trimmed.match(/^([A-Za-z_$][\w$]*)\s*,\s*\{/)
  return defaultMatch?.[1]
}

export default function lazyCss(): Plugin {
  return {
    name: 'monkey:lazy-css',
    enforce: 'pre',
    resolveId(source) {
      if (source === runtimeId) return resolvedRuntimeId
    },
    load(id) {
      if (id === resolvedRuntimeId) {
        // 通过 virtual module 注入运行时，实现 lazyStyleTag 的样式管理逻辑
        const runtimePath = fileURLToPath(new URL('./runtime.ts', import.meta.url))
        return `export { createLazyStyle } from ${JSON.stringify(pathToFileURL(runtimePath).href)}`
      }
    },
    transform(code, id): TransformResult | undefined {
      if (!/\.[cm]?[jt]sx?$/.test(id) || !code.includes('.lazy.scss')) return

      let index = 0
      let changed = false
      const additions: string[] = []
      const transformed = code.replace(
        lazyImportPattern,
        (full, importClause: string, quote: string, source: string) => {
          const binding = getBinding(importClause)
          if (!binding) return full

          changed = true
          const cssBinding = `__lazyCss${index}`
          const factoryBinding = `__createLazyStyle${index}`
          index += 1
          additions.push(
            `import ${cssBinding} from ${quote}${source}?inline${quote};`,
            `import { createLazyStyle as ${factoryBinding} } from ${JSON.stringify(runtimeId)};`,
            `const ${binding} = ${factoryBinding}(${cssBinding});`,
          )
          return ''
        },
      )

      if (!changed) return
      return { code: `${additions.join('\n')}\n${transformed}`, map: null }
    },
  }
}

export { createLazyStyle, type LazyStyle } from './runtime.ts'
