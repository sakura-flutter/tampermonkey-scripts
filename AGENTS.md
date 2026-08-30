# 项目说明

本仓库是用于开发 Tampermonkey 用户脚本的 pnpm 工作区。主要脚本包位于 `packages/*`，共享运行时代码位于 `shared`，构建相关的包位于 `tools/*`。

## 工作规范

- 当前项目使用 `vite-plugin-monkey`。修改脚本构建相关配置时，优先查阅其 [配置文档](https://github.com/lisonge/vite-plugin-monkey#config) 并确认是否已有对应支持；已有支持时优先采用 `vite-plugin-monkey` 的方式，仅在不支持时自行实现。

## 开发服务下的用户脚本同步与安装

- `defineUserScriptConfig` 传递给 `vite-plugin-monkey` 的 `server.open` 决定 dev 服务启动及用户脚本元数据变化时是否自动打开安装流程，默认值为 `true`。
- 当 `server.open` 为 `true` 或使用默认值时，启动 dev 服务会自动打开服务 URL 并进入用户脚本安装流程；用户脚本元数据变化时，插件也会自动重新打开安装流程。不要再次手动打开本地 URL，否则会触发重复的安装页。此时只需提醒用户点击“重新安装” / `Reinstall`，然后暂停后续工作，等待用户明确确认。
- 当 `server.open` 为 `false` 时，dev 服务不会自动打开服务 URL。首次安装开发脚本，或修改用户脚本元数据时，才需要手动打开 dev 输出的本地 URL；仅修改脚本代码时，已安装的用户脚本会自动同步，无需重新唤起安装页。元数据包括但不限于 `@match`、`@include`、`@name`、`@grant`、`@run-at` 以及由构建配置生成的其他 userscript header。
- 通过 Chrome 打开本地开发 URL 后，Tampermonkey 通常会将其重定向到 `chrome-extension://` 用户脚本安装页。不要操作、读取、监听或检查扩展页；用户点击“重新安装”后安装标签页自动关闭属于正常行为，不要检查关闭状态、关闭原因或安装结果，也不要重复打开安装页。
- 重新安装场景必须等待用户明确确认后才能继续浏览器验证；已安装开发脚本的代码修改场景可直接验证。验证完成后停止临时 dev 服务，除非用户明确要求保留。

## 验证要求

- 修改代码或配置后，在报告工作完成前运行 `pnpm check`；如果检查发现问题，可以运行 `pnpm check:fix`。
- 仅修改文档时无需执行代码检查，除非改动影响命令或项目行为。

<!--VITE PLUS START-->

## Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

### Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

### Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

### Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->
