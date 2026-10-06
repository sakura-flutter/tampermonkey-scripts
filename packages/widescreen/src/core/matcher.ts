import type { PageDefinition, PathPattern, RouteMatch, RouteSnapshot, SiteDefinition } from './types'

function escapeRegExp(value: string) {
  return value.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&')
}

/** 将路径字符串模式编译为可匹配 pathname 的正则表达式 */
function compilePathPattern(pattern: string) {
  const normalized = pattern.length > 1 ? pattern.replace(/\/+$/, '') : pattern
  const source = normalized
    .split('/')
    .map(segment => {
      if (segment === '*') return '.*'
      if (segment.startsWith(':')) return '[^/]+'
      return escapeRegExp(segment)
    })
    .join('/')

  return new RegExp(`^${source}/?$`)
}

/** 使用字符串模式或正则表达式测试路径是否匹配 */
function matchesPattern(pathname: string, pattern: PathPattern) {
  if (typeof pattern === 'string') return compilePathPattern(pattern).test(pathname)
  pattern.lastIndex = 0
  const matched = pattern.test(pathname)
  pattern.lastIndex = 0
  return matched
}

/** 计算路径规则的具体程度，用于相同优先级下排序 */
function getSpecificity(pattern: PathPattern | PathPattern[]) {
  const patterns = Array.isArray(pattern) ? pattern : [pattern]
  return Math.max(
    ...patterns.map(value => {
      if (value instanceof RegExp) return 0
      return value
        .split('/')
        .filter(Boolean)
        .reduce((score, segment) => score + (segment.startsWith(':') ? 1 : 3), 0)
    }),
  )
}

/** 判断路由是否符合页面定义中的任一路径规则 */
function pageMatches(route: RouteSnapshot, page: PageDefinition) {
  const patterns = Array.isArray(page.pathPattern) ? page.pathPattern : [page.pathPattern]
  return patterns.some(pattern => matchesPattern(route.pathname, pattern))
}

/** 按主机名、路径优先级和规则具体度查找页面 */
export function matchRoute(route: RouteSnapshot, sites: SiteDefinition[]): RouteMatch | null {
  const site = sites.find(candidate => candidate.host === route.host)
  if (!site) return null

  const matchedPages = site.pages
    .filter(page => pageMatches(route, page))
    .sort((left, right) => {
      const priority = (right.priority ?? 0) - (left.priority ?? 0)
      if (priority !== 0) return priority
      return getSpecificity(right.pathPattern) - getSpecificity(left.pathPattern)
    })

  const page = matchedPages[0]
  return page ? { site, page } : null
}
