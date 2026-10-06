# Widescreen 目录约定

本文件适用于 `packages/widescreen` 目录及其所有子目录。它定义宽屏脚本的目录组织、站点适配器结构和命名规则。

## 顶层目录

```text
packages/widescreen/
├── src/
│   ├── core/   # 路由、匹配、运行时、设置和样式生命周期
│   ├── sites/  # 按站点组织的页面适配器
│   └── ui/     # 控制面板及其样式
```

新增站点适配时，代码应放在 `src/sites` 下对应的站点目录中，并在 `src/sites/index.ts` 注册站点定义。

## `src/sites` 目录规则

每个直接子目录代表一个精确匹配的 hostname，目录名使用 hostname 的文件名形式：

```text
www-bilibili-com/  ->  www.bilibili.com
tieba-baidu-com/   ->  tieba.baidu.com
```

目录名中的点号替换为短横线，保持完整的 hostname 信息。站点识别由 `site.ts` 中的 `host` 字段完成，运行时要求 hostname 完全相等，不支持子域名继承。

标准目录结构如下：

```text
src/sites/<hostname-directory>/
├── site.ts
└── pages/
    └── <page-directory>/
        ├── page.ts
        └── style.lazy.scss
```

### `site.ts`

`site.ts` 导出一个 `SiteDefinition`，负责声明站点级信息和页面集合：

```ts
export const exampleSite: SiteDefinition = {
  id: 'example',
  host: 'example.com',
  name: '示例站点',
  pages: [homePage],
}
```

- `id` 使用简短、稳定的站点英文名称，并作为持久化设置 `settings.sites` 的键名。不要使用 hostname 作为 `id`。
- 同一产品的多个 hostname 可以使用相同的 `id`，从而共享控制面板开关和存储配置。
- `host` 必须填写实际 hostname，且与当前页面 hostname 完全相等。
- `name` 是控制面板和控制台日志中的站点显示名称。
- `pages` 包含该 hostname 支持的全部页面定义。

### `pages` 子目录

每个页面使用一个独立目录，目录名使用简短的英文页面标识，便于从路径直接看出适配对象。

页面目录通常包含：

- `page.ts`：导出 `PageDefinition`，声明页面匹配、宽度策略、样式和必要的生命周期钩子。
- `style.lazy.scss`：当前页面的样式覆盖；没有页面专属样式时可以省略。
- 需要动态处理 DOM 时，可在页面目录中增加职责明确的辅助模块，由 `page.ts` 的钩子调用。

`page.ts` 示例：

```ts
export const articlePage: PageDefinition = {
  id: 'article',
  name: '文章',
  pathPattern: '/article/:id',
  priority: 10,
  widthPolicy: {
    viewportRatio: 0.82,
    maxWidth: 1400,
  },
  styles: [styles],
}
```

- `id` 是页面规则的稳定内部标识，用于路由匹配和运行时状态识别。
- `name` 只描述页面类型，例如 `首页`、`文章`、`视频详情`、`搜索`；不要重复站点名称。
- `pathPattern` 只匹配 pathname，query 和 hash 默认不参与匹配。多个规则冲突时使用更高的 `priority`，数值越大优先级越高。
- `widthPolicy.viewportRatio` 表示目标内容宽度占视口宽度的比例。
- `widthPolicy.maxWidth` 使用数字表示像素值；运行时会自动转换为 `px`。
- 页面启用 `uncapped` 时复用相同的 `viewportRatio`，只取消 `maxWidth` 限制。

## 样式和生命周期

页面样式只负责站点页面自身的布局覆盖，宽度应优先使用运行时提供的 `var(--ws-content-width)`。动态 DOM、图片替换或站点路由特有逻辑放在 `activate` 或 `update` 中，并通过页面上下文注册清理逻辑。

站点新增适配后，需要同时完成两步：

1. 创建 `src/sites/<hostname-directory>/site.ts` 及页面目录。
2. 在 `src/sites/index.ts` 导入并加入站点列表。
