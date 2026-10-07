import type { Node, Plugin, Root, Rule } from 'postcss'

const lazyScssPattern = /\.lazy\.scss(?:$|[?#])/i
const keyframesPattern = /keyframes$/i
const pageScope = ':root'
const htmlSelectorScope = 'html:root'

function splitSelectorList(selectorList: string) {
  const selectors: string[] = []
  let start = 0
  let parentheses = 0
  let brackets = 0
  let quote: string | null = null
  let escaped = false

  for (let index = 0; index < selectorList.length; index += 1) {
    const character = selectorList[index]

    if (escaped) {
      escaped = false
      continue
    }

    if (character === '\\') {
      escaped = true
      continue
    }

    if (quote) {
      if (character === quote) quote = null
      continue
    }

    if (character === '"' || character === "'") {
      quote = character
      continue
    }

    if (character === '(') parentheses += 1
    else if (character === ')' && parentheses > 0) parentheses -= 1
    else if (character === '[') brackets += 1
    else if (character === ']' && brackets > 0) brackets -= 1
    else if (character === ',' && parentheses === 0 && brackets === 0) {
      selectors.push(selectorList.slice(start, index).trim())
      start = index + 1
    }
  }

  selectors.push(selectorList.slice(start).trim())
  return selectors.filter(Boolean)
}

function scopeSelector(selector: string) {
  if (/^:root(?=$|[\s>+~.#:[(])/.test(selector)) {
    return `${pageScope}${selector}`
  }

  if (/^html(?=$|[\s>+~.#:[(])/.test(selector)) {
    return `${htmlSelectorScope}${selector.slice('html'.length)}`
  }

  return `${pageScope} ${selector}`
}

function isInsideKeyframes(rule: Rule) {
  let parent: Node['parent'] = rule.parent
  while (parent) {
    if (
      parent.type === 'atrule' &&
      'name' in parent &&
      typeof parent.name === 'string' &&
      keyframesPattern.test(parent.name)
    ) {
      return true
    }
    parent = parent.parent
  }
  return false
}

/** 为 lazy.scss 选择器添加页面作用域，提升样式特异性。 */
export function pageScopePlugin(): Plugin {
  return {
    postcssPlugin: 'widescreen:page-scope',
    Once(root: Root, { result }) {
      const source = result.opts.from
      if (!source || !lazyScssPattern.test(source)) return

      root.walkRules(rule => {
        if (!rule.selector || isInsideKeyframes(rule)) return
        rule.selector = splitSelectorList(rule.selector).map(scopeSelector).join(', ')
      })
    },
  }
}
